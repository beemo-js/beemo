# Conversion

## Manually

```ts
converter.convert([3, 1, 5, 2], [sort(), reverse()]) // -> [5, 4, 3, 2, 1]
```

## For method parameters:

```ts
class Test {
    @ConvertedParameters()
    foo(@Sort() bar: number[]): void {
        console.log(bar)
    }
}

const test = new Test()
test.foo([3, 1, 5, 2]) // prints [1, 2, 3, 4, 5]
```

## Converters

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
