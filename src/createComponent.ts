function toHTML(that: any, template: string, styles: string = '') {
  template = template.replace(/(\{\{\S+?\}\})/g, ($1) => {
    $1 = $1.slice(2, -2)
    let value = that.hasAttribute($1) ? that.getAttribute($1) : $1
    return value
  })
  styles = styles.replace(/(\{\{\S+?\}\})/g, ($1) => {
    $1 = $1.slice(2, -2)
    let value = that.hasAttribute($1) ? that.getAttribute($1) : $1
    return value
  })
  return `
  <style>
    ${styles}
  </style>
  ${template}
  `
}

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
  template: string
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

    render() {
      let shadow = this.shadowRoot
      if (shadow) {
        shadow.innerHTML = toHTML(this, template, styles)
      }
    }
  }

  customElements.define(elementName, customElementClass)
}

export default createComponent
