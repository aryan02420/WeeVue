;((global) => {
  let JSWCF: any = {}

  JSWCF.states = new Map()

  JSWCF.createComponent = function ({
    elementName,
    props,
    data,
    template,
    styles,
    methods,
  }: ICreateComponentProps) {
    let customElementClass = class extends HTMLElement {
      $methods: any
      static get observedAttributes() {
        return props
      }

      constructor() {
        super()
        this.$methods = methods
        const shadow = this.attachShadow({ mode: 'open' })
      }

      connectedCallback() {
        JSWCF.states.set(this, {...data})
        if ('init' in this.$methods) {
          this.$methods.init.bind(this.$el)()
        }
        this.render()
      }
      attributeChangedCallback() {
        this.render()
      }
      disconnectedCallback() {
        JSWCF.states.delete(this)
        if ('term' in this.$methods) {
          this.$methods.term.bind(this.$el)()
        }
      }

      $el: any = new Proxy(this, {
        get: function (target, prop: string, receiver) {
          if (target.hasAttribute(prop)) return target.getAttribute(prop)
          if (prop in JSWCF.states.get(target)) {
            return JSWCF.states.get(target)[prop]
          }
          if (prop in target.$methods) {
            return target.$methods[prop].bind(target.$el)
          }
          return Reflect.get(this, prop, receiver)
        },
        set: function (target, prop, value, receiver) {
          if (prop in JSWCF.states.get(target)) {
            JSWCF.states.get(target)[prop] = value
            target.render()
            return true
          }
          return false
        },
      })

      render() {
        let shadow = this.shadowRoot
        if (shadow) {
          shadow.innerHTML = `<style>${styles}</style>`
          shadow.innerHTML += template(this.$el).replace(
            /\$el/g,
            'this.getRootNode().host.$el'
          )
        }
      }
    }

    customElements.define(elementName, customElementClass)
  }

  global.JSWCF = JSWCF
})(window)
