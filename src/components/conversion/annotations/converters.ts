import {ConverterData} from '../types'
import {container} from '../../../framework/globalContainer'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'
import {AnnotationsServiceName} from '../../../framework/services'
import {
    ceil,
    defaultTo,
    floor,
    lowerCase,
    replace,
    reverse,
    round,
    sort,
    trim,
    upperCase,
    encodeUrl,
    encodeUrlComponent,
    decodeUrlComponent,
    decodeUrl
} from '../builders'

// Returns a converter annotation
export const Converter = (data: ConverterData) => (target: any, key: string, index?: number) => {
    const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)

    if (index === undefined) {
        // property
        classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Converter, data)
    } else {
        // method parameter
        classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Converter, data)
    }
}

// Global

export const DefaultTo = (value: any) => Converter(defaultTo(value))

// Numbers

export const Round = () => Converter(round())
export const Floor = () => Converter(floor())
export const Ceil = () => Converter(ceil())

// Strings

export const LowerCase = () => Converter(lowerCase())
export const UpperCase = () => Converter(upperCase())
export const Trim = () => Converter(trim())
export const Replace = (pattern: RegExp|string, replacement: string) => Converter(replace(pattern, replacement))
export const UrlEncode = () => Converter(encodeUrl())
export const UrlEncodeComponent = () => Converter(encodeUrlComponent())
export const UrlDecode = () => Converter(decodeUrl())
export const UrlDecodeComponent = () => Converter(decodeUrlComponent())

// Arrays

export const Sort = (reverse: boolean = false) => Converter(sort(reverse))
export const Reverse = () => Converter(reverse())
