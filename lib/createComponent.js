function createComponent({ elementName, props, data, template, styles, methods, }) {
    let customElementClass = class extends HTMLElement {
        constructor() {
            super();
            this.$el = new Proxy(this, {
                get: function (target, prop, receiver) {
                    if (target.hasAttribute(prop))
                        return target.getAttribute(prop);
                    if (prop in data) {
                        return data[prop];
                    }
                    if (prop in methods) {
                        return methods[prop].bind(this);
                    }
                },
                set: function (target, prop, value, receiver) {
                    if (prop in data) {
                        data[prop] = value;
                        return true;
                    }
                    return false;
                },
            });
            const shadow = this.attachShadow({ mode: 'open' });
        }
        static get observedAttributes() {
            return props;
        }
        connectedCallback() {
            this.render();
        }
        attributeChangedCallback() {
            this.render();
        }
        render() {
            let shadow = this.shadowRoot;
            if (shadow) {
                shadow.innerHTML = `<style>${styles}</style>`;
                shadow.innerHTML += template(this.$el);
            }
        }
    };
    customElements.define(elementName, customElementClass);
}
export default createComponent;
