// Executes action for each resource yielded by source
export async function withResource<T>(source: AsyncIterator<T>, action: (resource: T) => void) {
    let resource
    while(resource = await source.next()) {
        action(resource)
    }
}
