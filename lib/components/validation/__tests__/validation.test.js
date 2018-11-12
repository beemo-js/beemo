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
import { registerValidators } from '../validators';
import { min } from '../builders';
import { initContainer } from '../../../framework/initContainer';
import { container } from '../../../framework/globalContainer';
import { ValidationServiceName } from '../../../framework/services';
import { Min, Typed, Valid } from '../annotations/constraints';
import { ValidatedParameters } from '../annotations/ValidatedParameters';
initContainer();
const validator = container.get(ValidationServiceName.Validator);
registerValidators(validator);
class User {
}
__decorate([
    Min(4),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
class TestService {
    foo(nb) {
        return nb * 2;
    }
    bar(user) {
        return user.id;
    }
}
__decorate([
    ValidatedParameters(),
    __param(0, Typed(Number)), __param(0, Min(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], TestService.prototype, "foo", null);
__decorate([
    ValidatedParameters(),
    __param(0, Valid(User)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Number)
], TestService.prototype, "bar", null);
const testService = new TestService();
test('Validator', () => {
    expect(validator.validate(2, [min(1)])).toHaveLength(0);
    expect(validator.validate(0, [min(1)])).toHaveLength(1);
});
test('Parameter validation decorator', () => {
    expect(testService.foo(2)).toBe(4);
    try {
        testService.foo(0);
        expect(true).toBe(false);
    }
    catch (_) { }
});
test('Class validation', () => {
    const user = new User();
    user.id = 5;
    expect(validator.validateClassInstance(user, User)).toHaveLength(0);
    user.id = 0;
    expect(validator.validateClassInstance(user, User)).toHaveLength(1);
});
test('Class validation fail', () => {
    const paramUser = new User();
    paramUser.id = 5;
    expect(testService.bar(paramUser)).toBe(5);
    paramUser.id = 1;
    try {
        testService.bar(paramUser);
        expect(true).toBe(false);
    }
    catch (_) { }
});
