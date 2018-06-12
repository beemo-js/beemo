export abstract class Repository {

    protected async *getFromCacheAndRequest<T>(fromCache: () => Promise<T>, fromRequest: () => Promise<T>, save: (resource: T) => Promise<any>): AsyncIterator<T> {
        const entityFromCache = await fromCache()
        if (entityFromCache) {
            yield entityFromCache
        }

        const entityFromRequest: T = await fromRequest()
        await save(entityFromRequest)
        yield entityFromRequest
    }
}
