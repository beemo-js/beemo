# Validation

This module provides tools to validate values using existing or custom validators.

## Validate a value

This example validates the value `5` using a list of validators (`positive` and `max`). The second one will fail.

```ts
validator.validate(5, [positive(), max(4)])
```

`validate` returns a list of errors, empty if validation succeeded, with the validator id and a message for each error:

```ts
[
  {
    id: 'max',
    message: 'Value should be lower than or equal to 4 (value given: 5)'
  }
]
```

## Validate a class instance

Class instances can also be validated using `validateInstance` and annotations on class properties.

```ts
class User {
    constructor(
        @Min(4) public id: number
    ) {}
}

const user = new User(5)
validator.validateInstance(user, User)
```

## Validate method parameters

Validators can also be applied to method parameters by applying the `@HandledParameters` annotation on the method.
This way the parameters value will be validated when passed to a method call, throwing an exception if invalid.

```ts
class TestService {
    // Checks nb is a number > 1
    @HandledParameters()
    foo(@Typed(Number) @Min(1) nb: number): number {
        return nb * 2
    }

    // Checks user is a valid one
    @HandledParameters()
    bar(@Valid(User) user: User): number {
        return user.id
    }
}
```

## Validators

Here is the list of validators integrated into Beemo.

Global:

- `typed(type: Function)` / `@Typed(type: Function)`
- `notNull()` / `@NotNull()`

Numbers:

- `min(lowerBound: number)` / `@Min(lowerBound: number)`
- `max(upperBound: number)` / `@Max(upperBound: number)`
- `between(lowerBound: number, upperBound: number)` / `@Between(lowerBound: number, upperBound: number)`
- `positive()` / `@Positive()`
- `positiveOrZero()` / `@PositiveOrZero()`
- `negative()` / `@Negative()`
- `negativeOrZero()` / `@NegativeOrZero()`

Strings:

- `pattern(pattern: RegExp|string)` / `@Pattern(pattern: RegExp|string)`
- `email()` / `@Email()`
- `url()` / `@Url()`

Arrays:

- `notEmpty()` / `@NotEmpty()` (works also with strings)
- `length(length: number)` / `@Length(length: number)`
- `minLength(length: number)` / `@MinLength(length: number)`
- `maxLength(length: number)` / `@MaxLength(length: number)`
- `lengthBetween(minLength: number, maxLength: number)` / `@LengthBetween(minLength: number, maxLength: number)`

Dates:

- `past(from?: Date)` / `@Past(from?: Date)`
- `future(from?: Date)` / `@Future(from?: Date)`

Classes:

- `valid(classFn: Function)` / `@Valid(classFn: Function)`
