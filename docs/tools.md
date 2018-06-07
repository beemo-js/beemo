# Tools

## Annotations

### `@HandledParameters`

Simply an alias for `ValidatedParameters` + `ConvertedParameters`.

```ts
class Foo {
    @HandledParameters()
    bar(@NotEmpty() @Sorted() nbs: number[]): number[] {
        return nbs
    }
}
```

### `@Default`

If the method returns a null value, returns a default value instead.

```ts
class Test {
    @Default(({param}) => 'default value')
    foo(param: string): string {
        return param
    }
}
```

### `@Fallback`

If the method throws an exception, it is caught and it returns the result of given function.

```ts
class Test {
    @Fallback((exception, {param}) => 'exploded')
    bar(param: string): string {
        if (param === 'boom') {
            throw 'boom'
        }
        return param
    }
}
```

## Monads

### Optional

A nice way to handle null values.

```ts
Optional.of('hello')
    .map(val => val.toUpperCase())
    .getOrDefault('hola')
```

### Attempt

A nice way to handle exceptions.

```ts
Attempt.of<string>(() => doSomethingRisky())
    .map(val => val.toUpperCase())
    .getOrDefault('default value')
```

### Pipe

A nice way to pipe functions on a value.

```ts
Pipe.of('pipe')
    .map(val => val.trim())
    .map(val => val.toUpperCase())
    .map(val => val.substr(0, 2))
    .get()
```
