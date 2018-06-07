# Serialization

## Serializer

```ts
class Foo {
    @MappedField() bar: string = 'baz'
}

class User {
    @MappedField()
    id: number

    @MappedField('mapped-username')
    username: string // 'username' will map to 'mapped-username'

    @MappedField({
        test: {} // configuration can be defined per group (see below the explanation for groups)
    })
    email: string // this field will only be mapped in group 'test'

    @MappedField({
        all: { mappedClass: Foo } // this configuration will be the default configuration (applied whatever the group)
    })
    foo: Foo // thanks to 'mappedClass' this field will be serialized recursively
}

const user = new User()
user.id = 1
user.username = 'bob'
user.email = 'bob@example.com'
user.foo = new Foo()

const serializedUser = serializer.serialize(User, user)
```

Here is the value of `serializedUser`:

```ts
'{
    "id": 1,
    "mapped-username": "bob",
    "foo": {
        "bar": "baz"
    }
}'
```

We can get back a User instance by deserializing it:

```ts
const deserializedUser = serializer.deserialize(User, serializedUser)
```

## Groups

Todo.

## Class-to-class mapping

```ts
class UserDto {
    @MappedField() id: number
    @MappedField('mapped-username') name: string
}

const mappedUser = classMapper.map(user, User, UserDto)
mappedUser.id // -> 1
mappedUser.name // -> 'bob'
```
