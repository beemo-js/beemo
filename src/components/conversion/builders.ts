import {ConverterData} from './types'

const build = (id: string, args: Object = {}): ConverterData => ({id, args})

// Global

export const defaultTo = (value: any) => build('default_to', {value})

// Numbers

export const round = () => build('round')
export const floor = () => build('floor')
export const ceil = () => build('ceil')

// Strings

export const lowerCase = () => build('lower_case')
export const upperCase = () => build('upper_case')
export const trim = () => build('trim')
export const replace = (pattern: RegExp|string, replacement: string) => build('replace', {pattern, replacement})
export const encodeUrl = () => build('encode_url')
export const encodeUrlComponent = () => build('encode_url_component')
export const decodeUrl = () => build('decode_url')
export const decodeUrlComponent = () => build('decode_url_component')

// Arrays

export const sort = (reverse: boolean = false) => build('sort', {reverse})
export const reverse = () => build('reverse')
