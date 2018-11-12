import {Validator} from '../Validator'
import {registerValidators} from '../validators'
import {min} from '../builders'
import {initContainer} from '../../../framework/initContainer'
import {container} from '../../../framework/globalContainer'
import {ValidationServiceName} from '../../../framework/services'
import {Min, Typed, Valid} from '../annotations/constraints'
import {ValidatedParameters} from '../annotations/ValidatedParameters'

initContainer()

const validator = container.get<Validator>(ValidationServiceName.Validator)
registerValidators(validator)

class User {
    @Min(4)
    id: number
}

class TestService {
    @ValidatedParameters()
    foo(@Typed(Number) @Min(1) nb: number): number {
        return nb * 2
    }

    @ValidatedParameters()
    bar(@Valid(User) user: User): number {
        return user.id
    }
}

const testService = new TestService()

test('Validator', () => {
    expect(validator.validate(2, [min(1)])).toHaveLength(0)
    expect(validator.validate(0, [min(1)])).toHaveLength(1)
})

test('Parameter validation decorator', () => {
    expect(testService.foo(2)).toBe(4)
    try {
        testService.foo(0)
        expect(true).toBe(false)
    } catch (_) {}
})

test('Class validation', () => {
    const user = new User()

    user.id = 5
    expect(validator.validateClassInstance(user, User)).toHaveLength(0)

    user.id = 0
    expect(validator.validateClassInstance(user, User)).toHaveLength(1)
})

test('Class validation fail', () => {
    const paramUser = new User()
    paramUser.id = 5
    expect(testService.bar(paramUser)).toBe(5)

    paramUser.id = 1
    try {
        testService.bar(paramUser)
        expect(true).toBe(false)
    }
    catch (_) {}
})
