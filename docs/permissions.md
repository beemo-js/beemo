# Permissions

This module provides abstractions for permissions. It should allow you ask user for permissions in a unique way across targeted platforms.

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
