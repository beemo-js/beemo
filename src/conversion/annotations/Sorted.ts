import {Converter} from './Converter'

// Registers a constructor param dependency
export function Sorted(): any {
    return Converter({
        id: 'sorted',
        args: {}
    })
}