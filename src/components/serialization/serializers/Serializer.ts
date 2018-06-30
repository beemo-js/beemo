export interface Serializer {
    serialize<T>(classFn: Function, data: T|T[], group?: string): string
    deserialize<T>(classFn: Function, text: string, group?: string): T|T[]
}