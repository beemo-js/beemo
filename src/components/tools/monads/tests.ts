import {Optional} from './Optional'
import {Pipe} from './Pipe'
import {Attempt} from './Attempt'

// Optional

console.log(
    Optional.of('hello')
        .map(val => val.toUpperCase())
        .getOrDefault('hola')
)
console.log(
    Optional.of(null)
        .map(val => val.toUpperCase())
        .getOrDefault('hola')
)

// Pipe

console.log(
    Pipe.of('pipe')
        .map(val => val.toUpperCase())
        .get()
)

// Attempt

console.log(
    Attempt.of(() => 'ok')
        .map(val => val.toUpperCase())
        .getOrDefault('not ok')
)

console.log(
    Attempt.of<string>(() => { throw 'blablabla' })
        .map(val => val.toUpperCase())
        .getOrDefault('not ok')
)
