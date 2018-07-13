import {CircuitBreaker} from '../interceptors/CircuitBreaker'

test('Circuit Breaker', () => {
    const circuitBreaker = new CircuitBreaker(2, 2, 500)

    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).toBe('ok') }
    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).toBe('ok') }
    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).not.toBe('ok') }
    try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).not.toBe('ok') }
    setTimeout(() => {
        console.log('After 1 second')
        try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).toBe('ok') }
        try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).not.toBe('ok') }
    }, 1000)
    setTimeout(() => {
        console.log('After 2 seconds')
        circuitBreaker.attempt(() => { console.log('no exception') })
        circuitBreaker.attempt(() => { console.log('no exception') })
        circuitBreaker.attempt(() => { console.log('no exception') })
        try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).toBe('ok') }
        try { circuitBreaker.attempt(() => { throw 'ok' }) } catch (e) { expect(e).toBe('ok') }
    }, 2000)
})
