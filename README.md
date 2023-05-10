# <p align="center"><img src="assets/WeeVue-logo.png" alt="WeeVue" height="120px"/></p>

> A tiny, Vue inspired, native web component utility

## Install
```html
<script src="https://cdn.jsdelivr.net/gh/aryan02420/WeeVue/lib/createComponent.js"></script>
```

## Usage
```html

<!-- https://aryan02420.github.io/WeeVue/demo/counter.html -->

<my-counter></my-counter>

<script>
    createComponent({
        name: 'my-counter',
        props: {},
        data() {
            return {
                count: 0,
            }
        },
        methods: {
            increase() {
                this.count++
            },
        },
        template: ($el) => `
            <p>clicked ${$el.count} times!</p>
            <button onclick="$el.increase()">+1</button>
        `,
        styles: '',
    })
</script>
```

