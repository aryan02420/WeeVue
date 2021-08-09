function createComponent({ name, props, data, template, styles, methods, }) {
    let customElementClass = class extends HTMLElement {
        constructor() {
            super();
            this.$el = new Proxy(this, {
                get: function (target, prop, receiver) {
                    console.log('get', target.$data);
                    if (target.hasAttribute(prop))
                        return target.getAttribute(prop);
                    if (prop in props) {
                        return props[prop];
                    }
                    if (prop in target.$data) {
                        return target.$data[prop];
                    }
                    if (prop in methods) {
                        return methods[prop].bind(target.$el);
                    }
                    return Reflect.get(target, prop, receiver);
                },
                set: function (target, prop, value, receiver) {
                    if (prop in target.$data) {
                        target.$data[prop] = value;
                        target.render();
                        return true;
                    }
                    return false;
                },
            });
            this.$data = data === null || data === void 0 ? void 0 : data.bind(this.$el)();
            const shadow = this.attachShadow({ mode: 'open' });
        }
        static get observedAttributes() {
            return Object.keys(props);
        }
        connectedCallback() {
            if ('init' in methods) {
                methods.init.bind(this.$el)();
            }
            this.render();
        }
        attributeChangedCallback() {
            this.render();
        }
        disconnectedCallback() {
            if ('term' in methods) {
                methods.term.bind(this.$el)();
            }
        }
        render() {
            let shadow = this.shadowRoot;
            if (shadow) {
                shadow.innerHTML = `<style>${styles}</style>`;
                shadow.innerHTML += template(this.$el).replace(/\$el/g, 'this.getRootNode().host.$el');
            }
        }
    };
    customElements.define(name, customElementClass);
}
export default createComponent;
