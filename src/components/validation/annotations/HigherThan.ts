import {Validator} from './Validator'

export function HigherThan(lowerBound: number): any {
    return Validator('higher_than', {lowerBound})
}