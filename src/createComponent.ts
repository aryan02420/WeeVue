function createComponent({
  elementName,
  props,
  data,
  template,
  styles,
  methods,
}: {
  elementName: string
  props?: string[]
  data?: any
  template: Function
  styles?: string
  methods?: any
}) {
  let customElementClass = class extends HTMLElement {
    data: any
    methods: any
    static get observedAttributes() {
      return props
    }

    constructor() {
      super()
      this.data = data
      this.methods = methods
      const shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
      this.render()
    }
    attributeChangedCallback() {
      this.render()
    }

    $el:any = new Proxy(this, {
      get: function (target, prop: string, receiver) {
        if (target.hasAttribute(prop)) return target.getAttribute(prop)
        if (prop in target.data) {
          return target.data[prop]
        }
        if (prop in target.methods) {
          return target.methods[prop].bind(target.$el)
        }
        return Reflect.get(this, prop, receiver)
      },
      set: function (target, prop, value, receiver) {
        if (prop in target.data) {
          target.data[prop] = value
          target.render()
          return true
        }
        return false
      },
    })

    render() {
      console.log('render')
      let shadow = this.shadowRoot
      if (shadow) {
        shadow.innerHTML = `<style>${styles}</style>`
        shadow.innerHTML += template(this.$el).replace(/\$el/g, 'this.getRootNode().host.$el')
      }
    }
  }

  customElements.define(elementName, customElementClass)
}

export default createComponent
