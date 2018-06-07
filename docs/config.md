# Configuration

```ts
const config = new InMemoryConfigurationStore({
    a: {
        b: 'c'
    },
    d: 'e'
})

config.get('a.b') // -> 'c'
```

