import {Normalizer, ClassMapper, MappedField, Serializer} from '..'
import {container, SerializationServiceName, initContainer} from '../../../framework'

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

const normalizer = container.get<Normalizer>(SerializationServiceName.Normalizer)

function userToNormalize(): User {
    const user = new User()
    user.id = 1
    user.email = 'email@example.com'
    user.username = 'username'
    user.foo = new Foo()
    user.ignoredProperty = 'ignored value'
    return user
}

test('Normalize without group', () => {
    const user = userToNormalize()

    expect(normalizer.normalize(User, user)).toMatchObject({
        id: 1,
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    })
})

test('Normalize with group', () => {
    const user = userToNormalize()

    expect(normalizer.normalize(User, user, 'test')).toMatchObject({
        id: 1,
        email: 'email@example.com',
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    })
})

test('Normalize from instance', () => {
    const user = userToNormalize()

    expect(normalizer.normalizeInstance(user)).toMatchObject({
        id: 1,
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    })
})

test('Normalize object', () => {
    expect(normalizer.normalize(Object, {a: 'b', c: 'd'})['a']).toBe('b')
})

function userToDenormalize(): Object {
    return {
        id: 2,
        email: 'test@example.com',
        'mapped-username': 'user2',
        ignoredProperty: 'ignoredValue',
        foo: { foo: 'foo' },
        shouldNotBeIncluded: 'shouldNotBeIncluded'
    }
}

test('Denormalize without group', () => {
    const parsedData = userToDenormalize()
    const denormalizedUser = normalizer.denormalize<User>(User, parsedData) as User
    expect(denormalizedUser).toBeInstanceOf(User)
    expect(denormalizedUser.id).toBe(2)
    expect(denormalizedUser.email).toBe(undefined)
    expect(denormalizedUser.username).toBe('user2')
    expect(denormalizedUser.ignoredProperty).toBe(undefined)
    expect(denormalizedUser.foo).toBeInstanceOf(Foo)
})

test('Denormalize with group', () => {
    const parsedData = userToDenormalize()
    const denormalizedUser = normalizer.denormalize<User>(User, parsedData, 'test') as User
    expect(denormalizedUser).toBeInstanceOf(User)
    expect(denormalizedUser.id).toBe(2)
    expect(denormalizedUser.email).toBe('test@example.com')
    expect(denormalizedUser.username).toBe('user2')
    expect(denormalizedUser.ignoredProperty).toBe(undefined)
    expect(denormalizedUser.foo).toBeInstanceOf(Foo)
})

test('Denormalize object', () => {
    expect(normalizer.denormalize(Object, {a: 'b', c: 'd'})['a']).toBe('b')
})

test('Class-to-class mapping', () => {
    class UserDto {
        @MappedField() id: number
        @MappedField('mapped-username') name: string
    }

    const classMapper = container.get<ClassMapper>(SerializationServiceName.ClassMapper)
    const fromUser = new User()
    fromUser.id = 5
    fromUser.username = 'test-name'
    fromUser.email = 'test@example.com'

    const mappedUser = classMapper.map<User, UserDto>(fromUser, User, UserDto)
    expect(mappedUser.id).toBe(5)
    expect(mappedUser.name).toBe('test-name')
})


test('Serializer', () => {
    const serializer = container.get<Serializer>(SerializationServiceName.Serializer)
    const user = userToNormalize()
    const serialized = serializer.serialize(User, user)
    const deserialized = serializer.deserialize(User, serialized) as User
    expect(deserialized.id).toBe(1)
})
