import {CircuitBreaker} from './patterns/CircuitBreaker'
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

// Circuit breaker

const circuitBreaker = new CircuitBreaker(2, 2, 500)

try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
setTimeout(() => {
    console.log('After 1 second')
    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
}, 1000)
setTimeout(() => {
    console.log('After 1 second')
    circuitBreaker.attempt(() => { console.log('no exception') })
    circuitBreaker.attempt(() => { console.log('no exception') })
    circuitBreaker.attempt(() => { console.log('no exception') })
    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { console.log(e) }
}, 2000)
