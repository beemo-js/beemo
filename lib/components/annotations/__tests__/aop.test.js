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
// multiplies the returned value by nb
function MultiplyResponse(nb) {
    return __1.aopAnnotation(function (next, args) {
        return next(args) * nb;
    });
}
var AopTest = /** @class */ (function () {
    function AopTest(incrementer) {
        this.incrementer = incrementer;
    }
    AopTest.prototype.incrementValue = function (val) {
        return val + this.incrementer;
    };
    __decorate([
        MultiplyResponse(2),
        MultiplyResponse(2),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Number)
    ], AopTest.prototype, "incrementValue", null);
    return AopTest;
}());
test('AOP annotations should handle method returned value', function () {
    var aopTest = new AopTest(2);
    expect(aopTest.incrementValue(2)).toBe(16);
});
