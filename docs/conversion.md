# Conversion

This module provides tools to convert values using existing or custom converters.

## Manually

This example shows how to convert a value (`[3, 1, 5, 2]`) using a list of converters (`sort` and `reverse`).

```ts
converter.convert([3, 1, 5, 2], [sort(), reverse()]) // -> [5, 4, 3, 2, 1]
```

## For method parameters:

Converters can also be applied to method parameters by applying the `@HandledParameters` annotation on the method.
This way the parameters value will be converted when passed to a method call.

```ts
class Test {
    @HandledParameters()
    foo(@Sort() bar: number[]): void {
        console.log(bar)
    }
}

const test = new Test()
test.foo([3, 1, 5, 2]) // prints [1, 2, 3, 4, 5]
```

## Converters

Here is the list of converters integrated into Beemo.

Global:

- `defaultTo(value: any)` / `@DefaultTo(value: any)`

Numbers:

- `round()` / `@Round()`
- `floor()` / `@Floor()`
- `ceil()` / `@Ceil()`

Strings:

- `lowerCase()` / `@LowerCase()`
- `upperCase()` / `@UpperCase()`
- `trim()` / `@Trim()`
- `replace(pattern: RegExp|string, replacement: string)` / `@Replace(pattern: RegExp|string, replacement: string)`
- `encodeUrl()` / `@EncodeUrl()`
- `encodeUrlComponent()` / `@EncodeUrlComponent()`
- `decodeUrl()` / `@DecodeUrl()`
- `decodeUrlComponent()` / `@DecodeUrlComponent()`

Arrays:

- `sort(reverse: boolean = false)` / `@Sort(reverse: boolean = false)`
- `reverse()` / `@Reverse()`
