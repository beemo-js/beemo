# Annotations

This module provides tools to play with annotations.

## AOP

A `aopAnnotation` function is provided to allow you to use Aspect-Oriented Programming with Javascript decorators.
Its interface is designed to make its use familiar for those used to [Express](http://expressjs.com/en/guide/using-middleware.html) or Go's HTTP middleware.

The goal of this helper is to help remove logic from a method body when it can make it more readable.

Here is a simple example:

```ts
// Log method input and output
function Log(title: string): Function {
    return aopAnnotation((next, args) => {
        console.log(`${title} - Input: `, ...args)
        const result = next(args)
        console.log(`${title} - Output: `, result)
        return result
    })
}

class AopTest {
    @Log('LOG')
    foo(nb: int): string {
        console.log('Computing...')
        return nb * 2
    }
}

const aopTest = new AopTest()
aopTest.foo(2)
```

Console output:

```
LOG - Input: 2
Computing...
LOG - Output: 4
```

Other example uses of this helper are Beemo's [conversion](./conversion) and [validation](./validation) annotations.
