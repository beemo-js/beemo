import {Validator} from '../Validator'
import {registerValidators} from '../validators'
import {NameResolver} from '../../metadata/NameResolver'
import {container} from '../../../framework/globalContainer'
import {HigherThan} from '../annotations/HigherThan'
import {ValidatedParameters} from '../annotations/ValidatedParameters'
import {Validated} from '../annotations/Validated'
import {Typed} from '../annotations/Typed'
import {MetadataServiceName, ValidationServiceName} from '../../../framework/services'
import {initContainer} from '../../../framework/initContainer'

initContainer()

const validator = container.get<Validator>(ValidationServiceName.Validator)
registerValidators(validator, container.get<NameResolver>(MetadataServiceName.NameResolver))

class User {
    @HigherThan(4)
    id: number
}

class TestService {
    @ValidatedParameters()
    foo(@Typed(Number) @HigherThan(1) nb: number): number {
        return nb * 2
    }

    @ValidatedParameters()
    bar(@Validated(User) user: User): number {
        return user.id
    }
}

const testService = new TestService()

test('Validator', () => {
    const validatorValue = {
        id: 'higher_than',
        args: {
            lowerBound: 1
        }
    }
    expect(validator.validate(2, [validatorValue])).toHaveLength(0)
    expect(validator.validate(0, [validatorValue])).toHaveLength(1)
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
