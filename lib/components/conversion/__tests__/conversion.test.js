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
var __1 = require("..");
var framework_1 = require("../../../framework");
framework_1.initContainer();
__1.registerConverters(framework_1.container.get(framework_1.ConversionServiceName.Converter));
test('ConvertedParameters', function () {
    var Test = /** @class */ (function () {
        function Test() {
        }
        Test.prototype.foo = function (bar) {
            return bar;
        };
        __decorate([
            __1.ConvertedParameters(),
            __param(0, __1.DefaultTo([1, 2])), __param(0, __1.Sort()), __param(0, __1.Reverse()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Array]),
            __metadata("design:returntype", Array)
        ], Test.prototype, "foo", null);
        return Test;
    }());
    var test = new Test();
    expect(test.foo([3, 1, 5, 2])).toEqual([5, 3, 2, 1]);
    expect(test.foo(null)).toEqual([2, 1]);
});
