export type MappedFieldConfiguration = {
    [group: string]: {
        name?: string,
        mappedClass?: Function,
        include?: boolean
    }
}
