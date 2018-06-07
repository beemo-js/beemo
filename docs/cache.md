# Cache

```ts
class Foo {
    @Cached(({id}) => `user-request:${id}`)
    async requestUserFromId(id: number): Promise<Response> {
        return await fetch(`/user/${id}`)
    }
}
```
