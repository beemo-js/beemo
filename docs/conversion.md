# Conversion

```ts
class Test {
    @ConvertedParameters()
    foo(@Sorted() bar: number[]): void {
        console.log(bar)
    }
}

const test = new Test()
test.foo([3, 1, 5, 2]) // prints [1, 2, 3, 4, 5]
```
