"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var framework_1 = require("../../../framework");
framework_1.initContainer();
var Foo = /** @class */ (function () {
    function Foo() {
        this.foo = 'foo';
    }
    __decorate([
        __1.MappedField(),
        __metadata("design:type", String)
    ], Foo.prototype, "foo", void 0);
    return Foo;
}());
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.bar = function () { return 'foo'; };
    __decorate([
        __1.MappedField(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        __1.MappedField({
            test: {}
        }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        __1.MappedField('mapped-username'),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        __1.MappedField({
            all: { mappedClass: Foo }
        }),
        __metadata("design:type", Foo)
    ], User.prototype, "foo", void 0);
    return User;
}());
var normalizer = framework_1.container.get(framework_1.SerializationServiceName.Normalizer);
function userToNormalize() {
    var user = new User();
    user.id = 1;
    user.email = 'email@example.com';
    user.username = 'username';
    user.foo = new Foo();
    user.ignoredProperty = 'ignored value';
    return user;
}
test('Normalize without group', function () {
    var user = userToNormalize();
    expect(normalizer.normalize(User, user)).toMatchObject({
        id: 1,
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    });
});
test('Normalize with group', function () {
    var user = userToNormalize();
    expect(normalizer.normalize(User, user, 'test')).toMatchObject({
        id: 1,
        email: 'email@example.com',
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    });
});
test('Normalize from instance', function () {
    var user = userToNormalize();
    expect(normalizer.normalizeInstance(user)).toMatchObject({
        id: 1,
        'mapped-username': 'username',
        foo: {
            foo: 'foo'
        }
    });
});
test('Normalize object', function () {
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
test('Denormalize without group', function () {
    var parsedData = userToDenormalize();
    var denormalizedUser = normalizer.denormalize(User, parsedData);
    expect(denormalizedUser).toBeInstanceOf(User);
    expect(denormalizedUser.id).toBe(2);
    expect(denormalizedUser.email).toBe(undefined);
    expect(denormalizedUser.username).toBe('user2');
    expect(denormalizedUser.ignoredProperty).toBe(undefined);
    expect(denormalizedUser.foo).toBeInstanceOf(Foo);
});
test('Denormalize with group', function () {
    var parsedData = userToDenormalize();
    var denormalizedUser = normalizer.denormalize(User, parsedData, 'test');
    expect(denormalizedUser).toBeInstanceOf(User);
    expect(denormalizedUser.id).toBe(2);
    expect(denormalizedUser.email).toBe('test@example.com');
    expect(denormalizedUser.username).toBe('user2');
    expect(denormalizedUser.ignoredProperty).toBe(undefined);
    expect(denormalizedUser.foo).toBeInstanceOf(Foo);
});
test('Denormalize object', function () {
    expect(normalizer.denormalize(Object, { a: 'b', c: 'd' })['a']).toBe('b');
});
test('Class-to-class mapping', function () {
    var UserDto = /** @class */ (function () {
        function UserDto() {
        }
        __decorate([
            __1.MappedField(),
            __metadata("design:type", Number)
        ], UserDto.prototype, "id", void 0);
        __decorate([
            __1.MappedField('mapped-username'),
            __metadata("design:type", String)
        ], UserDto.prototype, "name", void 0);
        return UserDto;
    }());
    var classMapper = framework_1.container.get(framework_1.SerializationServiceName.ClassMapper);
    var fromUser = new User();
    fromUser.id = 5;
    fromUser.username = 'test-name';
    fromUser.email = 'test@example.com';
    var mappedUser = classMapper.map(fromUser, User, UserDto);
    expect(mappedUser.id).toBe(5);
    expect(mappedUser.name).toBe('test-name');
});
test('Serializer', function () {
    var serializer = framework_1.container.get(framework_1.SerializationServiceName.Serializer);
    var user = userToNormalize();
    var serialized = serializer.serialize(User, user);
    var deserialized = serializer.deserialize(User, serialized);
    expect(deserialized.id).toBe(1);
});
