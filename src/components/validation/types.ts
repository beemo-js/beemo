export type ValidatorType = (value: any, ...args) => boolean

export interface ValidatorData {
    id: string
    args: Object
}

export interface ValidatorError {
    id: string,
    message: string
}
