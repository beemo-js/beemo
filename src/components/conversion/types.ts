export type ConverterType = (value: any, ...args) => boolean

export interface ConverterData {
    id: string
    args: Object
}
