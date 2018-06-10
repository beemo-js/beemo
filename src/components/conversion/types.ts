export type ConverterType = (value: any, ...args) => any

export interface ConverterData {
    id: string
    args: Object
}
