import {InMemoryConfigurationStore} from '..'

test('StackableConfiguration', () => {
    const config = new InMemoryConfigurationStore({
        a: {
            b: 'c'
        },
        d: 'e'
    })

    expect(config.get('a.b')).toBe('c')
    expect(config.get('c.c')).toBe(undefined)

    config.set('a.f', 'g')
    expect(config.get('a.f')).toBe('g')
})
