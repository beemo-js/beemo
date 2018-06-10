import {addAnnotation} from './helpers'
import {ValidatorData} from '../types'
import {
    between,
    email,
    future,
    length,
    lengthBetween,
    max,
    maxLength,
    min,
    minLength,
    negative,
    negativeOrZero,
    notEmpty,
    notNull,
    past,
    pattern,
    positive,
    positiveOrZero,
    typed,
    url,
    valid
} from '../builders'
import {container} from '../../../framework/globalContainer'
import {AnnotationsServiceName, TypesServiceName} from '../../../framework/services'
import {ReflectionClassTypesStore} from '../../types/ReflectionClassTypesStore'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'

// Annotation to property or method
function addAnnotation(target: any, key: string, index: number, data: ValidatorData): void {
    const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)

    if (index === undefined) {
        // property
        classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Constraints, data)
    } else {
        // method parameter
        classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Constraints, data)
    }
}

// Returns a validator annotation
export const Constraints = (data: ValidatorData) => (target: any, key: string, index?: number) => addAnnotation(target, key, index, data)

// Global

export const Typed = (type: Function) => Constraints(typed(type))
export const NotNull = () => Constraints(notNull())

// Numbers

export const Min = (lowerBound: number) => Constraints(min(lowerBound))
export const Max = (upperBound: number) => Constraints(max(upperBound))
export const Between = (lowerBound: number, upperBound: number) => Constraints(between(lowerBound, upperBound))
export const Positive = () => Constraints(positive())
export const PositiveOrZero = () => Constraints(positiveOrZero())
export const Negative = () => Constraints(negative())
export const NegativeOrZero = () => Constraints(negativeOrZero())

// Strings

export const Pattern = (p: string|RegExp) => Constraints(pattern(p))
export const Email = () => Constraints(email())
export const Url = () => Constraints(url())

// Arrays

export const NotEmpty = () => Constraints(notEmpty())
export const Length = (l: number) => Constraints(length(l))
export const MinLength = (length: number) => Constraints(minLength(length))
export const MaxLength = (length: number) => Constraints(maxLength(length))
export const LengthBetween = (minLength: number, maxLength: number) => Constraints(lengthBetween(minLength, maxLength))

// Dates

export const Past = (from?: Date) => Constraints(past(from))
export const Future = (from?: Date) => Constraints(future(from))

// Classes

export const Valid = (classFn: Function) => (target: any, key: string, index?: number) => {
    const reflectionClassTypesStore = container.get<ReflectionClassTypesStore>(TypesServiceName.ReflectionClassTypesStore)

    classFn = classFn || (index === undefined ?
            reflectionClassTypesStore.getPropertyType(target.constructor, key):
            reflectionClassTypesStore.getMethodParameterType(target.constructor, key, index)
    )

    if (!classFn) {
        throw `@Validated annotation must be used on variable with known type.`
    }

    addAnnotation(target, key, index, valid(classFn))
}
