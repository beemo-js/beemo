export type ConverterType = (value: any, ...args: any[]) => any

/**
 * Represents a converter to apply to a value.
 */
export interface ConverterData {
    id: string // Id of the converter (e.g. "sort")
    args: Object // Args of the converter, if needed
}
