function createComponent({ elementName, props, data, template, styles, methods, }) {
    let customElementClass = class extends HTMLElement {
        constructor() {
            super();
            this.$el = new Proxy(this, {
                get: function (target, prop, receiver) {
                    if (target.hasAttribute(prop))
                        return target.getAttribute(prop);
                    if (prop in target.data) {
                        return target.data[prop];
                    }
                    if (prop in target.methods) {
                        return target.methods[prop].bind(target.$el);
                    }
                    return Reflect.get(this, prop, receiver);
                },
                set: function (target, prop, value, receiver) {
                    if (prop in target.data) {
                        target.data[prop] = value;
                        target.render();
                        return true;
                    }
                    return false;
                },
            });
            this.data = data;
            this.methods = methods;
            const shadow = this.attachShadow({ mode: 'open' });
        }
        static get observedAttributes() {
            return props;
        }
        connectedCallback() {
            if ('init' in this.methods) {
                this.methods.init.bind(this.$el)();
            }
            this.render();
        }
        attributeChangedCallback() {
            this.render();
        }
        render() {
            console.log('render');
            let shadow = this.shadowRoot;
            if (shadow) {
                shadow.innerHTML = `<style>${styles}</style>`;
                shadow.innerHTML += template(this.$el).replace(/\$el/g, 'this.getRootNode().host.$el');
            }
        }
    };
    customElements.define(elementName, customElementClass);
}
export default createComponent;
