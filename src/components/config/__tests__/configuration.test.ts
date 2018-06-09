import {InMemoryConfigurationStore} from '../InMemoryConfigurationStore'
import {StackableConfigurationStore} from '../StackableConfigurationStore'

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

    const stackableConfig = new StackableConfigurationStore([
        new InMemoryConfigurationStore({
            a: {
                b: 'b'
            }
        }),
        config
    ])

    expect(stackableConfig.get('a.b')).toBe('b')
    expect(stackableConfig.get('d')).toBe('e')
})
