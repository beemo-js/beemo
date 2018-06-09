import {Validator} from './Validator'

export function Typed(type: Function): any {
    return Validator('typed', {type})
}