import {Normalizer} from './Normalizer'
import {ClassMapper} from './ClassMapper'
import {ComposableSerializer} from './serializers/ComposableSerializer'
import {JsonEncoder} from './encoders/JsonEncoder'
import {container} from '../../framework/globalContainer'
import {MappedField} from './annotations/annotations'
import {SerializationServiceName} from '../../framework/services'
import {initContainer} from '../../framework/initContainer'

initContainer()

class Foo {
    @MappedField() foo: string = 'foo'
}

class User {
    @MappedField()
    id: number

    @MappedField({
        test: {}
    })
    email: string

    @MappedField('mapped-username')
    username: string

    @MappedField({
        all: { mappedClass: Foo }
    })
    foo: Foo

    ignoredProperty: string

    bar(): string { return 'foo' }
}

class UserDto {
    @MappedField() id: number
    @MappedField('mapped-username') name: string
}

const normalizer = container.get<Normalizer>(SerializationServiceName.Normalizer)

// Normalize

const user = new User()
user.id = 1
user.email = 'email@example.com'
user.username = 'username'
user.foo = new Foo()
user.ignoredProperty = 'ignored value'

console.log('Normalize:')
console.log('No option', normalizer.normalize(User, user))
console.log('With group', normalizer.normalize(User, user, 'test'))
console.log('From instance', normalizer.normalizeInstance(user))

console.log()

// Denormalize

const parsedData = {
    id: 2,
    email: 'test@example.com',
    'mapped-username': 'user2',
    ignoredProperty: 'ignoredValue',
    foo: { foo: 'foo' },
    shouldNotBeIncluded: 'shouldNotBeIncluded'
}

console.log('Denormalize:')
console.log('By default:', normalizer.denormalize<User>(User, parsedData))
console.log('With groups:', normalizer.denormalize<User>(User, parsedData, 'test'))

// console.log(annotationsStore.getPropertyAnnotations('User', 'ignoredProperty')[0].data)
console.log()

// Class-to-class mapping

const classMapper = new ClassMapper(normalizer)
const fromUser = new User()
fromUser.id = 5
fromUser.username = 'test-name'
fromUser.email = 'test@example.com'

console.log('Class mapping:')
console.log('Without group:', classMapper.map(fromUser, User, UserDto))
console.log()

// Serializer

const serializer = new ComposableSerializer(normalizer, new JsonEncoder())
console.log('Serializer:')
console.log(serializer.serialize(User, user))
console.log(serializer.deserialize(User, serializer.serialize(User, user)))
