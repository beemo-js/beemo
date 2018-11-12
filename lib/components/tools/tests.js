var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Default } from './annotations/Default';
import { Fallback } from './annotations/Fallback';
// Annotations
class Test {
    foo(param) {
        return param;
    }
    bar(param) {
        if (param === 'boom') {
            throw 'boom';
        }
        return param;
    }
}
__decorate([
    Default(() => 'default value'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], Test.prototype, "foo", null);
__decorate([
    Fallback(() => 'exploded'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], Test.prototype, "bar", null);
const test = new Test();
console.log(test.foo('with value'));
console.log(test.foo(null));
console.log(test.bar('do not explode'));
console.log(test.bar('boom'));
