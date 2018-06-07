# Annotations

## AOP

```ts
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

Result:

```
LOG - Input: 2
Computing...
LOG - Output: 4
```


