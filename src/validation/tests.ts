import {Validator} from './Validator'
import {registerValidators} from './validators'
import {NameResolver} from '../metadata/NameResolver'
import {container} from '../framework/globalContainer'
import {HigherThan} from './annotations/HigherThan'
import {ValidatedParameters} from './annotations/ValidatedParameters'
import {Validated} from './annotations/Validated'
import {Typed} from './annotations/Typed'
import {MetadataServiceName, ValidationServiceName} from '../framework/services'
import {initContainer} from '../framework/initContainer'

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

// Test validator
const validatorValue = {
    id: 'higher_than',
    args: {
        lowerBound: 1
    }
}
console.log('should be ok', validator.validate(2, [validatorValue]))
console.log('should fail', validator.validate(0, [validatorValue]))

// Test parameter validation decorator
const testService = new TestService()
console.log(testService.foo(2))
try {
    console.log(testService.foo(0))
} catch (e) {
    console.log(e)
}

// Test class validation
const user = new User()
user.id = 5
console.log('should be empty', validator.validateClassInstance(user, User))
user.id = 0
console.log('should not be empty', validator.validateClassInstance(user, User))

const paramUser = new User()
paramUser.id = 5
console.log(testService.bar(paramUser))
paramUser.id = 1
try { console.log(testService.bar(paramUser)) }
catch (e) { console.log(e) }