export declare function withResource<T>(source: AsyncIterator<T>, action: (resource: T) => void): Promise<void>;
