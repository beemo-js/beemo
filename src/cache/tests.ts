import {Cached} from './annotations/Cached'
import {initContainer} from '../framework/initContainer'

initContainer()

class Foo {
    @Cached(() => 'test')
    async bar(bar: string): Promise<string> {
        return await bar
    }

    @Cached(() => 'test')
    async baz(): Promise<string> {
        return await 'not wanted'
    }
}

const foo = new Foo()
foo.bar('wanted')
    .then(val => console.log(val))
    .then(() => foo.baz())
    .then(val => console.log(val))
