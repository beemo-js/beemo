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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
var framework_1 = require("../../../framework");
var __1 = require("..");
var builders_1 = require("../builders");
framework_1.initContainer();
var validator = framework_1.container.get(framework_1.ValidationServiceName.Validator);
validators_1.registerValidators(validator);
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        __1.Min(4),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    return User;
}());
var TestService = /** @class */ (function () {
    function TestService() {
    }
    TestService.prototype.foo = function (nb) {
        return nb * 2;
    };
    TestService.prototype.bar = function (user) {
        return user.id;
    };
    __decorate([
        __1.ValidatedParameters(),
        __param(0, __1.Typed(Number)), __param(0, __1.Min(1)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Number)
    ], TestService.prototype, "foo", null);
    __decorate([
        __1.ValidatedParameters(),
        __param(0, __1.Valid(User)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User]),
        __metadata("design:returntype", Number)
    ], TestService.prototype, "bar", null);
    return TestService;
}());
var testService = new TestService();
test('Validator', function () {
    expect(validator.validate(2, [builders_1.min(1)])).toHaveLength(0);
    expect(validator.validate(0, [builders_1.min(1)])).toHaveLength(1);
});
test('Parameter validation decorator', function () {
    expect(testService.foo(2)).toBe(4);
    try {
        testService.foo(0);
        expect(true).toBe(false);
    }
    catch (_) { }
});
test('Class validation', function () {
    var user = new User();
    user.id = 5;
    expect(validator.validateClassInstance(user, User)).toHaveLength(0);
    user.id = 0;
    expect(validator.validateClassInstance(user, User)).toHaveLength(1);
});
test('Class validation fail', function () {
    var paramUser = new User();
    paramUser.id = 5;
    expect(testService.bar(paramUser)).toBe(5);
    paramUser.id = 1;
    try {
        testService.bar(paramUser);
        expect(true).toBe(false);
    }
    catch (_) { }
});
