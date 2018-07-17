export enum AnnotationsServiceName {
    ClassAnnotationsStore = 'annotations/ClassAnnotationsStore'
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
    CallHttpClient = 'http/CallHttpClient',
    HttpClient = 'http/HttpClient',
    CallAnnotationsHandler = 'http/CallAnnotationsHandler',
    RequestsQueue = 'http/RequestsQueue',
    CircuitBreaker = 'http/CircuitBreaker'
}

export enum LoggingServiceName {
    LogDataFormatter = 'logging/LogDataFormatter',
    Logger = 'logging/Logger',
    LogsOrchestrationWorker = 'logging/LogsOrchestrationWorker',
    LogsOrchestrator = 'logging/LogsOrchestrator',
    LoggingBag = 'logging/LoggingBag'
}

export enum MetadataServiceName {
    ClassMetadataStore = 'metadata/ClassMetadataStore'
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
