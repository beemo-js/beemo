# Configuration

This module provides a configuration store which values can be accessed via configuration keys.
It is for example useful for DI module's `@FromConfig` annotation.

```ts
const config = new InMemoryConfigurationStore({
    a: {
        b: 'c'
    },
    d: 'e'
})

config.get('a.b') // -> 'c'
```
