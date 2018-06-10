import {ValidatorData} from './types'

const build = (id: string, args: Object): ValidatorData => ({id, args})

// Global

export const typed = (type: Function) => build('typed', {type})
export const notNull = () => build('not_null', {})

// Numbers

export const min = (lowerBound: number) => build('min', {lowerBound})
export const max = (upperBound: number) => build('max', {upperBound})
export const between = (lowerBound: number, upperBound: number) => build('between', {lowerBound, upperBound})
export const positive = () => build('positive', {})
export const positiveOrZero = () => build('positive_or_zero', {})
export const negative = () => build('negative', {})
export const negativeOrZero = () => build('negative_or_zero', {})

// Strings

export const pattern = (pattern: RegExp|string) => build('pattern', {pattern: new RegExp(pattern)})
export const email = () => build('email', {})
export const url = () => build('url', {})

// Arrays

export const notEmpty = () => build('not_empty', {})
export const length = (length: number) => build('length', {length})
export const minLength = (length: number) => build('min_length', {length})
export const maxLength = (length: number) => build('max_length', {length})
export const lengthBetween = (minLength: number, maxLength: number) => build('length_between', {minLength, maxLength})

// Dates

export const past = (from?: Date) => build('past', {from})
export const future = (from?: Date) => build('future', {from})

// Classes

export const valid = (classFn: Function) => build('valid', {classFn})
