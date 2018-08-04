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
var index_1 = require("../../../framework/index");
var annotations_1 = require("../annotations/annotations");
index_1.initContainer();
var User = /** @class */ (function () {
    function User(foo) {
        this.foo = foo;
    }
    return User;
}());
var TestNamespace;
(function (TestNamespace) {
    var TestUser = /** @class */ (function () {
        function TestUser() {
        }
        return TestUser;
    }());
    TestNamespace.TestUser = TestUser;
})(TestNamespace || (TestNamespace = {}));
var classTypesStore = index_1.container.get(index_1.TypesServiceName.ClassTypesStore);
var reflectionClassTypesStore = index_1.container.get(index_1.TypesServiceName.ReflectionClassTypesStore);
// Types kvstore
test('Types store', function () {
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
    var AnnotationsTest = /** @class */ (function () {
        function AnnotationsTest() {
        }
        AnnotationsTest.prototype.foo = function (bar) {
            return 'ok';
        };
        __decorate([
            annotations_1.Type(String),
            __metadata("design:type", Object)
        ], AnnotationsTest.prototype, "username", void 0);
        __decorate([
            annotations_1.ReturnType(String),
            __param(0, annotations_1.Type(Number)),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], AnnotationsTest.prototype, "foo", null);
        return AnnotationsTest;
    }());
    TestNamespace.AnnotationsTest = AnnotationsTest;
})(TestNamespace || (TestNamespace = {}));
test('Annotation types', function () {
    expect(classTypesStore.getPropertyType(TestNamespace.AnnotationsTest, 'username')).toBe(String);
    expect(classTypesStore.getMethodReturnType(TestNamespace.AnnotationsTest, 'foo')).toBe(String);
    expect(classTypesStore.getMethodParametersTypes(TestNamespace.AnnotationsTest, 'foo')).toEqual([Number]);
});
