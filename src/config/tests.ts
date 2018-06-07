import {InMemoryConfigurationStore} from './InMemoryConfigurationStore'
import {StackableConfigurationStore} from './StackableConfigurationStore'

const config = new InMemoryConfigurationStore({
    a: {
        b: 'c'
    },
    d: 'e'
})

const stackableConfig = new StackableConfigurationStore([
    new InMemoryConfigurationStore({
        a: {
            b: 'b'
        }
    }),
    config
])

console.log(config.get('a.b'))
console.log(config.get('c.c'))

config.set('a.f', 'g')
console.log(config.get('a.f'))

console.log(stackableConfig.get('a.b'))
console.log(stackableConfig.get('d'))
