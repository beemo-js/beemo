# Cache

## The `@Cached` annotation

This annotation allows you to cache the returned value of a method in order to avoid it being recomputed later.
It takes as parameter a lambda taking the method arguments as arguments and returning the cache key.

```ts
class Foo {
    @Cached(([id]) => `user-request:${id}`)
    async requestUserFromId(id: number): Promise<Response> {
        return await fetch(`/user/${id}`)
    }
}
```
