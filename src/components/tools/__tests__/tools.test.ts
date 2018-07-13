import {Default} from '../annotations/Default'
import {Fallback} from '../annotations/Fallback'

// Annotations

class Baz {
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

const baz = new Baz()

test('Default annotation', () => {
    expect(baz.foo('with value')).toBe('with value')
    expect(baz.foo(null)).toBe('default value')
})


test('Fallback annotation', () => {
    expect(baz.bar('do not explode')).toBe('do not explode')
    expect(baz.bar('boom')).toBe('exploded')
})
