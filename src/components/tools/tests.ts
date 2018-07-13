import {Default} from './annotations/Default'
import {Fallback} from './annotations/Fallback'

// Annotations

class Test {
    @Default(() => 'default value')
    foo(param: string): string {
        return param
    }

    @Fallback(() => 'exploded')
    bar(param: string): string {
        if (param === 'boom') {
            throw 'boom'
        }
        return param
    }
}

const test = new Test()
console.log(test.foo('with value'))
console.log(test.foo(null))
console.log(test.bar('do not explode'))
console.log(test.bar('boom'))
