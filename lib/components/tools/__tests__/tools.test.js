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
// Annotations
var Baz = /** @class */ (function () {
    function Baz() {
    }
    Baz.prototype.foo = function (param) {
        return param;
    };
    Baz.prototype.bar = function (param) {
        if (param === 'boom') {
            throw 'boom';
        }
        return param;
    };
    __decorate([
        __1.Default(function () { return 'default value'; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", String)
    ], Baz.prototype, "foo", null);
    __decorate([
        __1.Fallback(function () { return 'exploded'; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", String)
    ], Baz.prototype, "bar", null);
    return Baz;
}());
var baz = new Baz();
test('Default annotation', function () {
    expect(baz.foo('with value')).toBe('with value');
    expect(baz.foo(null)).toBe('default value');
});
test('Fallback annotation', function () {
    expect(baz.bar('do not explode')).toBe('do not explode');
    expect(baz.bar('boom')).toBe('exploded');
});
