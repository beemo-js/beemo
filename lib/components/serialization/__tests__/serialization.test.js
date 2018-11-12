var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { initContainer } from '../../../framework/initContainer';
import { MappedField } from '../annotations/annotations';
import { container } from '../../../framework/globalContainer';
import { SerializationServiceName } from '../../../framework/services';
initContainer();
class Foo {
    constructor() {
        this.foo = 'foo';
    }
}
__decorate([
    MappedField(),
    __metadata("design:type", String)
], Foo.prototype, "foo", void 0);
class User {
    bar() { return 'foo'; }
}
__decorate([
    MappedField(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    MappedField({
        test: {}
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    MappedField('mapped-username'),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    MappedField({
        all: { mappedClass: Foo }
    }),
    __metadata("design:type", Foo)
], User.prototype, "foo", void 0);
const normalizer = container.get(SerializationServiceName.Normalizer);
function userToNormalize() {
    const user = new User();
    user.id = 1;
    user.email = 'email@example.com';
    user.username = 'username';
    user.foo = new Foo();
    user.ignoredProperty = 'ignored value';
    return user;
}
test('Normalize without group', () => {
    const user = userToNormalize();
    expect(normalizer.normalize(User, user)).toMatchObject({
        id: 1,
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    });
});
test('Normalize with group', () => {
    const user = userToNormalize();
    expect(normalizer.normalize(User, user, 'test')).toMatchObject({
        id: 1,
        email: 'email@example.com',
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    });
});
test('Normalize from instance', () => {
    const user = userToNormalize();
    expect(normalizer.normalizeInstance(user)).toMatchObject({
        id: 1,
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    });
});
test('Normalize object', () => {
    expect(normalizer.normalize(Object, { a: 'b', c: 'd' })['a']).toBe('b');
});
function userToDenormalize() {
    return {
        id: 2,
        email: 'test@example.com',
        'mapped-username': 'user2',
        ignoredProperty: 'ignoredValue',
        foo: { foo: 'foo' },
        shouldNotBeIncluded: 'shouldNotBeIncluded'
    };
}
test('Denormalize without group', () => {
    const parsedData = userToDenormalize();
    const denormalizedUser = normalizer.denormalize(User, parsedData);
    expect(denormalizedUser).toBeInstanceOf(User);
    expect(denormalizedUser.id).toBe(2);
    expect(denormalizedUser.email).toBe(undefined);
    expect(denormalizedUser.username).toBe('user2');
    expect(denormalizedUser.ignoredProperty).toBe(undefined);
    expect(denormalizedUser.foo).toBeInstanceOf(Foo);
});
test('Denormalize with group', () => {
    const parsedData = userToDenormalize();
    const denormalizedUser = normalizer.denormalize(User, parsedData, 'test');
    expect(denormalizedUser).toBeInstanceOf(User);
    expect(denormalizedUser.id).toBe(2);
    expect(denormalizedUser.email).toBe('test@example.com');
    expect(denormalizedUser.username).toBe('user2');
    expect(denormalizedUser.ignoredProperty).toBe(undefined);
    expect(denormalizedUser.foo).toBeInstanceOf(Foo);
});
test('Denormalize object', () => {
    expect(normalizer.denormalize(Object, { a: 'b', c: 'd' })['a']).toBe('b');
});
test('Class-to-class mapping', () => {
    class UserDto {
    }
    __decorate([
        MappedField(),
        __metadata("design:type", Number)
    ], UserDto.prototype, "id", void 0);
    __decorate([
        MappedField('mapped-username'),
        __metadata("design:type", String)
    ], UserDto.prototype, "name", void 0);
    const classMapper = container.get(SerializationServiceName.ClassMapper);
    const fromUser = new User();
    fromUser.id = 5;
    fromUser.username = 'test-name';
    fromUser.email = 'test@example.com';
    const mappedUser = classMapper.map(fromUser, User, UserDto);
    expect(mappedUser.id).toBe(5);
    expect(mappedUser.name).toBe('test-name');
});
test('Serializer', () => {
    const serializer = container.get(SerializationServiceName.Serializer);
    const user = userToNormalize();
    const serialized = serializer.serialize(User, user);
    const deserialized = serializer.deserialize(User, serialized);
    expect(deserialized.id).toBe(1);
});
