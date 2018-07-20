import {ClassTypesStore} from '../ClassTypesStore'
import {ReflectionClassTypesStore} from '../ReflectionClassTypesStore'
import {container, TypesServiceName, initContainer} from '../../../framework/index'
import {ReturnType, Type} from '../annotations/annotations'

initContainer()

class User {
    constructor(
        private foo: string
    ) {}
}

namespace TestNamespace {
    export class TestUser {
        id
    }
}

const classTypesStore = container.get<ClassTypesStore>(TypesServiceName.ClassTypesStore)
const reflectionClassTypesStore = container.get<ReflectionClassTypesStore>(TypesServiceName.ReflectionClassTypesStore)

// Types kvstore

test('Types store', () => {
    classTypesStore.setPropertyType(TestNamespace.TestUser, 'id', Number)
    expect(classTypesStore.getPropertyType(TestNamespace.TestUser, 'id')).toBe(Number)
})

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

namespace TestNamespace {
    export class AnnotationsTest {
        @Type(String) username

        @ReturnType(String)
        foo(@Type(Number) bar) {
            return 'ok'
        }
    }
}

test('Annotation types', () => {
    expect(classTypesStore.getPropertyType(TestNamespace.AnnotationsTest, 'username')).toBe(String)
    expect(classTypesStore.getMethodReturnType(TestNamespace.AnnotationsTest, 'foo')).toBe(String)
    expect(classTypesStore.getMethodParametersTypes(TestNamespace.AnnotationsTest, 'foo')).toEqual([Number])
})
