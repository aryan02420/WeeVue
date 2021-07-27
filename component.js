function toHTML(that, template, styles) {
  template = template.replace(/(\{\{\S+?\}\})/g, ($1) => {
    $1 = $1.slice(2,-2)
    return that.hasAttribute($1) ? that.getAttribute($1) : $1
  })
  styles = styles.replace(/(\{\{\S+?\}\})/g, ($1) => {
    $1 = $1.slice(2,-2)
    return that.hasAttribute($1) ? that.getAttribute($1) : $1.slice(2,-2)
  })
  return `
  <style>
    ${styles}
  </style>
  ${template}
  `
}

function makeComponent(name, attributes, template, styles, functions) {
  customElements.define(
    name,
    class extends HTMLElement {
      static get observedAttributes() {
        return attributes
      }
      constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
      }

      connectedCallback() {
        this.update()
      }

      attributeChangedCallback(name, oldValue, newValue) {
        this.update()
      }
    
      update() {
        let shadow = this.shadowRoot
        shadow.innerHTML = toHTML(this, template, styles)
      }
    }
  )
}
