import {ClassTypesStore} from './ClassTypesStore'
import {ReflectionClassTypesStore} from './ReflectionClassTypesStore'
import {NameResolver} from '../metadata/NameResolver'
import {container} from '../../framework/globalContainer'
import {ReturnType, Type} from './annotations/annotations'
import {TypesServiceName} from '../../framework/services'
import {initContainer} from '../../framework/initContainer'

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

const nameResolver = new NameResolver({ User })
nameResolver.registerNamespaces({ TestNamespace })

const classTypesStore = container.get<ClassTypesStore>(TypesServiceName.ClassTypesStore)
const reflectionClassTypesStore = container.get<ReflectionClassTypesStore>(TypesServiceName.ReflectionClassTypesStore)

// Types kvstore

classTypesStore.setPropertyType(TestNamespace.TestUser, 'id', Number)
console.log('Set prop type:', classTypesStore.getPropertyType(TestNamespace.TestUser, 'id'))

// Type reflection

function LogClass(): any {
    return (target, key, descriptor) => {
        console.log(nameResolver.findName(target))
        console.log('Constructor first params type:', reflectionClassTypesStore.getConstructorParameterType(target, 0))
        console.log('Constructor params types:', reflectionClassTypesStore.getConstructorParametersTypes(target))
    }
}

function LogProperty(): any {
    return (target, key, descriptor) => {
        console.log('Property type:', reflectionClassTypesStore.getPropertyType(target.constructor, key))
    }
}

function LogMethod(): any {
    return (target, key, descriptor) => {
        console.log('Method params types:', reflectionClassTypesStore.getMethodParametersTypes(target.constructor, key))
        console.log('Method return type:', reflectionClassTypesStore.getMethodType(target.constructor, key))
    }
}

namespace TestNamespace {

    @LogClass()
    export class Test {
        @LogProperty()
        private someProperty: string = 'someProperty'

        constructor(
            private foo: string,
            bar: User[],
            baz: TestNamespace.TestUser
        ) {}

        @LogMethod()
        test(foo: string, bar: any): string {
            return foo
        }
    }
}

// Annotation types

console.log('Annotations')

namespace TestNamespace {
    export class AnnotationsTest {
        @Type(String) username

        @ReturnType(String)
        foo(@Type(Number) bar) {
            return 'ok'
        }
    }
}

console.log(classTypesStore.getPropertyType(TestNamespace.AnnotationsTest, 'username'))
console.log(classTypesStore.getMethodReturnType(TestNamespace.AnnotationsTest, 'foo'))
console.log(classTypesStore.getMethodParametersTypes(TestNamespace.AnnotationsTest, 'foo'))
