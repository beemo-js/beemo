import {applyMiddleware} from '../../annotations/aop'
import {container} from '../../framework/globalContainer'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'
import {CallAnnotationsHandler} from '../factory/call/CallAnnotationsHandler'
import {AnnotationsServiceName, HttpServiceName} from '../../framework/services'

export function HandledCall(): MethodDecorator {
    return (target: Function, propertyKey: string, descriptor: any) => {
        applyMiddleware(descriptor, (next, args) => {
            const call = next(args)
            container.get<CallAnnotationsHandler>(HttpServiceName.CallAnnotationsHandler)
                .handle(call, target.constructor, propertyKey, args)
            return call
        })
    }
}

export function Body(classFn: Function): ParameterDecorator {
    return (target: Function, propertyKey: string, parameterIndex: number) => {
        container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, Body, {classFn})
    }
}

export function UrlParam(name: string): ParameterDecorator {
    return (target: Function, propertyKey: string, parameterIndex: number) => {
        container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, UrlParam, {name})
    }
}

export function Header(name: string): ParameterDecorator {
    return (target: Function, propertyKey: string, parameterIndex: number) => {
        container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, Header, {name})
    }
}
