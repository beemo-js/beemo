import {Cached} from '../annotations/Cached'
import {initContainer} from '../../../framework/initContainer'

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

test('Cached', async () => {
    const foo = new Foo()
    const firstVal = await foo.bar('wanted')
    expect(firstVal).toBe('wanted')
    const secondVal = await foo.baz()
    expect(secondVal).toBe('wanted')
})
