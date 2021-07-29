# My custom JS library for creating WebComponents

### Usage

```html

<!-- https://aryan02420.github.io/JSWCF/demo/counter.html -->

<my-counter></my-counter>

<script type="module">

    import createComponent from '../lib/createComponent.js'

    createComponent({
        elementName: 'my-counter',
        props: [],
        data: {
            count: 0,
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

