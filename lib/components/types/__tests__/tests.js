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
import { ReturnType, Type } from '../annotations/annotations';
import { initContainer } from '../../../framework/initContainer';
import { container } from '../../../framework/globalContainer';
import { TypesServiceName } from '../../../framework/services';
initContainer();
class User {
    constructor(foo) {
        this.foo = foo;
    }
}
var TestNamespace;
(function (TestNamespace) {
    class TestUser {
    }
    TestNamespace.TestUser = TestUser;
})(TestNamespace || (TestNamespace = {}));
const classTypesStore = container.get(TypesServiceName.ClassTypesStore);
const reflectionClassTypesStore = container.get(TypesServiceName.ReflectionClassTypesStore);
// Types kvstore
test('Types store', () => {
    classTypesStore.setPropertyType(TestNamespace.TestUser, 'id', Number);
    expect(classTypesStore.getPropertyType(TestNamespace.TestUser, 'id')).toBe(Number);
});
// Type reflection
// function LogClass(): any {
//     return (target, key, descriptor) => {
//         console.log('Constructor first params type:', reflectionClassTypesStore.getConstructorParameterType(target, 0))
//         console.log('Constructor params types:', reflectionClassTypesStore.getConstructorParametersTypes(target))
//     }
// }
//
// function LogProperty(): any {
//     return (target, key, descriptor) => {
//         console.log('Property type:', reflectionClassTypesStore.getPropertyType(target.constructor, key))
//     }
// }
//
// function LogMethod(): any {
//     return (target, key, descriptor) => {
//         console.log('Method params types:', reflectionClassTypesStore.getMethodParametersTypes(target.constructor, key))
//         console.log('Method return type:', reflectionClassTypesStore.getMethodType(target.constructor, key))
//     }
// }
//
// namespace TestNamespace {
//
//     @LogClass()
//     export class Test {
//         @LogProperty()
//         private someProperty: string = 'someProperty'
//
//         constructor(
//             private foo: string,
//             bar: User[],
//             baz: TestNamespace.TestUser
//         ) {}
//
//         @LogMethod()
//         test(foo: string, bar: any): string {
//             return foo
//         }
//     }
// }
// Annotation types
(function (TestNamespace) {
    class AnnotationsTest {
        foo(bar) {
            return 'ok';
        }
    }
    __decorate([
        Type(String),
        __metadata("design:type", Object)
    ], AnnotationsTest.prototype, "username", void 0);
    __decorate([
        ReturnType(String),
        __param(0, Type(Number)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AnnotationsTest.prototype, "foo", null);
    TestNamespace.AnnotationsTest = AnnotationsTest;
})(TestNamespace || (TestNamespace = {}));
test('Annotation types', () => {
    expect(classTypesStore.getPropertyType(TestNamespace.AnnotationsTest, 'username')).toBe(String);
    expect(classTypesStore.getMethodReturnType(TestNamespace.AnnotationsTest, 'foo')).toBe(String);
    expect(classTypesStore.getMethodParametersTypes(TestNamespace.AnnotationsTest, 'foo')).toEqual([Number]);
});
