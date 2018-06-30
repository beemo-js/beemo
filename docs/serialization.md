# Serialization

The serialization module provides tools to manipulate your data:

- Normalize and denormalize (from class instances to literal objects)
- Encode and decode (e.g. from literal objects to JSON)
- Serialize and deserialize (e.g. from class instance to JSON)
- Map classes to other classes

This module is inspired from [Symfony's Serializer component](http://symfony.com/doc/current/components/serializer.html), so I advise you to take a quick look at the linked page to understand the roles of normalizer, encoder and serializer, and the notion of groups.

## Serializer

The `MappedField` annotation allows you to register a class property as a property to take in account when serializing an instance of the class.

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
const deserializedUser = serializer.deserialize<User>(User, serializedUser)
```

## Groups

You may have different serialization needs for the same class.
For example you may need to map the field `username` of a class `User` to `name` in every situation, excepted when calling your backend API, which requires the field to be called `email`.

In such situations, you can use groups to differentiate these cases.

```ts
class User {
    @MappedField()
    id: number

    @MappedField({
      api: { name: 'email' },
      all: { name: 'name' }
    })
    username: string // 'username' will map to 'mapped-username'
}
```

The `all` group corresponds to the default serialization configuration; its configuration will be used unless overridden by a configuration specified for used group.

To use a group when serializing, simply specify it when calling `serialize` or `deserialize`:

```ts
const serializedUser = serializer.serialize(User, user, 'api')
const deserializedUser = serializer.deserialize<User>(User, serializedUser, 'api')
```

If you have too many different groups and your class becomes to complex to understand, you can instead create a [DTO class](https://en.wikipedia.org/wiki/Data_transfer_object) for each serialization case.
In this case the class mapper tool presented below may help you.

## Class-to-class mapping

You may need to implement several classes to represent a concept.
For example, you may have a `User` class to represent a user in your model, and a `UserDto` for the data to represent the user data to serialize in an HTTP request.

Instead of implementing a class mapper to map data between these two classes, you can use the `ClassMapper`, which will use the serialization annotations to map the two classes.

```ts
class UserDto {
    @MappedField() id: number
    @MappedField('mapped-username') name: string
}

const mappedUser = classMapper.map(user, User, UserDto)
mappedUser.id // -> 1
mappedUser.name // -> 'bob'
```
