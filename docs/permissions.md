# Permissions

## `@RequiresPermission`

When using `@RequiresPermission`, the method will ask for given permission before executing if needed.

```ts
class Foo {
    @RequiresPermission(Permission.NOTIFICATIONS)
    bar(): void {
        // ...
    }
}
```
