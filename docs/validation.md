# Validation

## Validate a class instance

```ts
class User {
    constructor(
        @HigherThan(4) public id: number
    ) {}
}

const user = new User(5)
validator.validateInstance(user, User)
```

## Validate method parameters

```ts
class TestService {
    // Checks nb is a number > 1
    @ValidatedParameters()
    foo(@Typed(Number) @HigherThan(1) nb: number): number {
        return nb * 2
    }

    // Checks user is a valid one
    @ValidatedParameters()
    bar(@Validated(User) user: User): number {
        return user.id
    }
}
```
