import {aopAnnotation} from './aop'

function Log(id: string): Function {
    return aopAnnotation((next, args) => {
        console.log(`${id} - Input: `, ...args)
        const result = next(args)
        console.log(`${id} - Output: `, result)
        return result
    })
}


class AopTest {

    constructor(
        private baz: string
    ) {}

    @Log('First')
    @Log('Second')
    bar(message: string): string {
        console.log(`${this.baz}: `, message)
        return message
    }
}

const foo = new AopTest('Message')
foo.bar('hello')

console.log('')

const bar = new AopTest('Hola')
bar.bar('hello')
