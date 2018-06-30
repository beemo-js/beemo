# Tools

The tools provided here a helpers to handle some common cases in an elegant way.
You can use them to make your code easier to read and understand.

## Annotations

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

This tiny set of monads may help you handle common cases in a more readable way.

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
Attempt.of<string>(() => doSomethingRisky()) // doSomethingRisky may return a string or throw an exception
    .map(val => val.toUpperCase())
    .getOrDefault('default value') // if an exception was thrown, 'default value' is returned
```

### Pipe

A nice way to pipe functions on a value.

```ts
Pipe.of(' pipe')
    .map(val => val.trim())
    .map(val => val.toUpperCase())
    .map(val => val.substr(0, 2))
    .get() // 'PI'
```
