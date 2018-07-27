# Configuration

This module provides a configuration store which values can be accessed via configuration keys.
It is for example useful for DI module's `@FromConfig` annotation ([see here](./di.md#inject-values-from-configuration)).

```ts
const config = new InMemoryConfigurationStore({
    a: {
        b: 'c'
    },
    d: 'e'
})

config.get('a.b') // -> 'c'
```
