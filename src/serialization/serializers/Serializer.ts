export interface Serializer {
    serialize<T>(classFn: Function, data: T|T[]): string
    deserialize<T>(classFn: Function, text: string): T|T[]
}