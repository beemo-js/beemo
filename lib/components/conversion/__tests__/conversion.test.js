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
import { initContainer } from '../../../framework/initContainer';
import { registerConverters } from '../converters';
import { container } from '../../../framework/globalContainer';
import { DefaultTo, Reverse, Sort } from '../annotations/converters';
import { ConvertedParameters } from '../annotations/ConvertedParameters';
import { ConversionServiceName } from '../../../framework/services';
initContainer();
registerConverters(container.get(ConversionServiceName.Converter));
test('ConvertedParameters', () => {
    class Test {
        foo(bar) {
            return bar;
        }
    }
    __decorate([
        ConvertedParameters(),
        __param(0, DefaultTo([1, 2])), __param(0, Sort()), __param(0, Reverse()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Array)
    ], Test.prototype, "foo", null);
    const test = new Test();
    expect(test.foo([3, 1, 5, 2])).toEqual([5, 3, 2, 1]);
    expect(test.foo(null)).toEqual([2, 1]);
});
