# My custom JS library for creating WebComponents

### Install
```html
<script src="https://cdn.jsdelivr.net/gh/aryan02420/JSWCF/lib/createComponent.js"></script>
```

### Usage
```html

<!-- https://aryan02420.github.io/JSWCF/demo/counter.html -->

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

