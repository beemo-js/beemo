import {aopAnnotation} from '..'

// multiplies the returned value by nb
function MultiplyResponse(nb: number): MethodDecorator {
    return aopAnnotation((next, args) => {
        return next(args) * nb
    })
}


class AopTest {

    constructor(
        private incrementer: number
    ) {}

    @MultiplyResponse(2)
    @MultiplyResponse(2)
    incrementValue(val: number): number {
        return val + this.incrementer
    }
}

test('AOP annotations should handle method returned value', () => {
    const aopTest = new AopTest(2)
    expect(aopTest.incrementValue(2)).toBe(16)
})