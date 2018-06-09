import {addAnnotation} from './helpers'

// Returns a validator annotation
export function Validator(id: string, args: Object): any {
    return (target: any, key: string, index?: number) => {
        addAnnotation(target, key, index, { id, args })
    }
}
