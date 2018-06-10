# Validation

## Validate a value

```ts
validator.validate(5, [positive(), max(10)])
```

## Validate a class instance

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

```ts
class TestService {
    // Checks nb is a number > 1
    @ValidatedParameters()
    foo(@Typed(Number) @Min(1) nb: number): number {
        return nb * 2
    }

    // Checks user is a valid one
    @ValidatedParameters()
    bar(@Valid(User) user: User): number {
        return user.id
    }
}
```

## Validators

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
