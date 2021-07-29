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
    static get observedAttributes() {
      return props
    }

    constructor() {
      super()
      const shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
      this.render()
    }
    attributeChangedCallback() {
      this.render()
    }

    $el = new Proxy(this, {
      get: function (target, prop: string, receiver) {
        if (target.hasAttribute(prop)) return target.getAttribute(prop)
        if (prop in data) {
          return data[prop]
        }
        if (prop in methods) {
          return methods[prop].bind(this)
        }
      },
      set: function (target, prop, value, receiver) {
        if (prop in data) {
          data[prop] = value
          return true
        }
        return false
      },
    })

    render() {
      let shadow = this.shadowRoot
      if (shadow) {
        shadow.innerHTML = `<style>${styles}</style>`
        shadow.innerHTML += template(this.$el)
      }
    }
  }

  customElements.define(elementName, customElementClass)
}

export default createComponent
