export enum AnnotationsServiceName {
    ClassAnnotationsStore = 'annotations/ClassAnnotationsStore'
}

export enum CacheServiceName {
    Cache = 'cache/Cache'
}

export enum ConfigServiceName {
    ConfigurationStore = 'config/ConfigurationStore'
}

export enum ConversionServiceName {
    Converter = 'conversion/Convert'
}

export enum DiServiceName {
    Container = 'di/Container',
    ReflectionServiceManager = 'di/ReflectionServiceManager'
}

export enum EventsServiceName {
    EventBus = 'events/EventBus'
}

export enum HttpServiceName {
    BatchHttpClient = 'http/BatchHttpClient',
    CallHttpClient = 'http/CallHttpClient',
    HttpClient = 'http/HttpClient',
    CallAnnotationsHandler = 'http/CallAnnotationsHandler',
    RequestsQueue = 'http/RequestsQueue'
}

export enum LoggingServiceName {
    LogDataFormatter = 'logging/LogDataFormatter',
    Logger = 'logging/Logger',
    LogsOrchestrationWorker = 'logging/LogsOrchestrationWorker',
    LogsOrchestrator = 'logging/LogsOrchestrator',
    LoggingBag = 'logging/LoggingBag'
}

export enum MetadataServiceName {
    ClassMetadataStore = 'metadata/ClassMetadataStore',
    NameResolver = 'metadata/NameResolver'
}

export enum MonadsServiceName {

}

export enum PatternsServiceName {

}

export enum PermissionsServiceName {
    PermissionsRequester = 'permissions/PermissionsRequester'
}

export enum PersistenceServiceName {
    KVStore = 'persistence/KVStore'
}

export enum SerializationServiceName {
    Encoder = 'serialization/Encoder',
    Serializer = 'serialization/Serializer',
    ClassMapper = 'serialization/ClassMapper',
    Normalizer = 'serialization/Normalizer'
}

export enum ThreadsServiceName {
    BackgroundTaskManager = 'threads/BackgroundTaskManager',
    BackgroundLoop = 'threads/BackgroundLoop'
}

export enum TypesServiceName {
    ClassTypesStore = 'types/ClassTypesStore',
    ReflectionClassTypesStore = 'types/ReflectionClassTypesStore'
}

export enum ValidationServiceName {
    Validator = 'validation/Constraints'
}
