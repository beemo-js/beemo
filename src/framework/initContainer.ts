import {container} from './globalContainer'
import {
    AnnotationsServiceName,
    CacheServiceName,
    ConfigServiceName, ConversionServiceName, DiServiceName, EventsServiceName, HttpServiceName, LoggingServiceName,
    MetadataServiceName, PermissionsServiceName,
    PersistenceServiceName, SerializationServiceName, ThreadsServiceName, TypesServiceName, ValidationServiceName
} from './services'
import {ClassAnnotationsStore} from '../annotations/ClassAnnotationsStore'
import {Cache} from '../cache/Cache'
import {InMemoryConfigurationStore} from '../config/InMemoryConfigurationStore'
import {Converter} from '../conversion/Converter'
import {ReflectionServiceManager} from '../di/ReflectionServiceManager'
import {EventBus} from '../events/EventBus'
import {CallAnnotationsHandler} from '../http/factory/call/CallAnnotationsHandler'
import {CallHttpClient} from '../http/call/CallHttpClient'
import {WebHttpClient} from '../http/client/WebHttpClient'
import {JsonBatchHttpClient} from '../http/batch/JsonBatchHttpClient'
import {BatchRequestsQueue} from '../http/queue/BatchRequestsQueue'
import {WebLogDataFormatter} from '../logging/formatter/WebLogDataFormatter'
import {ConsoleLogger} from '../logging/logger/ConsoleLogger'
import {LoggingBag} from '../logging/LoggingBag'
import {LogsOrchestrationWorker} from '../logging/orchestration/LogsOrchestrationWorker'
import {HttpLogsOrchestrator} from '../logging/orchestration/HttpLogsOrchestrator'
import {Request} from '../http/abstractions/Request'
import {NameResolver} from '../metadata/NameResolver'
import {ClassMetadataStore} from '../metadata/ClassMetadataStore'
import {WebPermissionsRequester} from '../permissions/requester/WebPermissionsRequester'
import {InMemoryKVStore} from '../persistence/kvstore/InMemoryKVStore'
import {ComposableSerializer} from '../serialization/serializers/ComposableSerializer'
import {JsonEncoder} from '../serialization/encoders/JsonEncoder'
import {ClassMapper} from '../serialization/ClassMapper'
import {Normalizer} from '../serialization/Normalizer'
import {BackgroundLoop} from '../threads/loop/BackgroundLoop'
import {WebBackgroundTaskManager} from '../threads/background/WebBackgroundTaskManager'
import {ReflectionClassTypesStore} from '../types/ReflectionClassTypesStore'
import {ClassTypesStore} from '../types/ClassTypesStore'
import {Validator} from '../validation/Validator'

export function initContainer() {

    // Annotations

    container.set(AnnotationsServiceName.ClassAnnotationsStore, () => new ClassAnnotationsStore(container.get(MetadataServiceName.ClassMetadataStore)))

    // Cache

    container.set(CacheServiceName.Cache, () => new Cache(container.get(PersistenceServiceName.KVStore)))

    // Config

    container.set(ConfigServiceName.ConfigurationStore, () => new InMemoryConfigurationStore())

    // Conversion

    container.set(ConversionServiceName.Converter, () => new Converter())

    // DI

    container.set(DiServiceName.Container, () => container)
    container.set(DiServiceName.ReflectionServiceManager, () => new ReflectionServiceManager(
        container.get(TypesServiceName.ReflectionClassTypesStore),
        container.get(AnnotationsServiceName.ClassAnnotationsStore),
        container.get(DiServiceName.Container),
        container.get(ConfigServiceName.ConfigurationStore),
        container.get(MetadataServiceName.NameResolver)
    ))

    // Events

    container.set(EventsServiceName.EventBus, () => new EventBus())

    // HTTP

    container.set(HttpServiceName.CallAnnotationsHandler, () => new CallAnnotationsHandler(
        container.get(AnnotationsServiceName.ClassAnnotationsStore),
        container.get(SerializationServiceName.Serializer)
    ))
    container.set(HttpServiceName.CallHttpClient, () => new CallHttpClient(
        container.get(HttpServiceName.HttpClient),
        container.get(HttpServiceName.BatchHttpClient),
        container.get(SerializationServiceName.Serializer)
    ))
    container.set(HttpServiceName.HttpClient, () => new WebHttpClient())
    container.set(HttpServiceName.BatchHttpClient, () => new JsonBatchHttpClient(container.get(HttpServiceName.HttpClient)))
    container.set(HttpServiceName.RequestsQueue, () => new BatchRequestsQueue(
        container.get(HttpServiceName.BatchHttpClient),
        false
    ))

    // Logging

    container.set(LoggingServiceName.LogDataFormatter, () => new WebLogDataFormatter())
    container.set(LoggingServiceName.Logger, () => new ConsoleLogger(container.get(LoggingServiceName.LogDataFormatter)))
    container.set(LoggingServiceName.LoggingBag, () => new LoggingBag())
    container.set(LoggingServiceName.LogsOrchestrationWorker, () => new LogsOrchestrationWorker(
        container.get(LoggingServiceName.LoggingBag),
        container.get(LoggingServiceName.LogsOrchestrator),
        5
    ))
    container.set(LoggingServiceName.LogsOrchestrator, () => new HttpLogsOrchestrator(
        container.get(HttpServiceName.RequestsQueue),
        log => new Request('/log', {body: JSON.stringify(log)})
    ))

    // Metadata

    container.set(MetadataServiceName.NameResolver, () => new NameResolver({}))
    container.set(MetadataServiceName.ClassMetadataStore, () => new ClassMetadataStore())

    // Permissions

    container.set(PermissionsServiceName.PermissionsRequester, () => new WebPermissionsRequester())

    // Persistence

    container.set(PersistenceServiceName.KVStore, () => new InMemoryKVStore())

    // Serialization

    container.set(SerializationServiceName.Serializer, () => new ComposableSerializer(
        container.get(SerializationServiceName.Normalizer),
        container.get(SerializationServiceName.Encoder)
    ))
    container.set(SerializationServiceName.Encoder, () => new JsonEncoder())
    container.set(SerializationServiceName.ClassMapper, () => new ClassMapper(container.get(SerializationServiceName.Normalizer)))
    container.set(SerializationServiceName.Normalizer, () => new Normalizer(container.get(MetadataServiceName.ClassMetadataStore)))

    // Threads

    container.set(ThreadsServiceName.BackgroundLoop, () => new BackgroundLoop(
        container.get(ThreadsServiceName.BackgroundTaskManager),
        10
    ))
    container.set(ThreadsServiceName.BackgroundTaskManager, () => new WebBackgroundTaskManager())

    // Types

    container.set(TypesServiceName.ReflectionClassTypesStore, () => new ReflectionClassTypesStore(container.get(TypesServiceName.ClassTypesStore)))
    container.set(TypesServiceName.ClassTypesStore, () => new ClassTypesStore(container.get(MetadataServiceName.ClassMetadataStore)))

    // Validation

    container.set(ValidationServiceName.Validator, () => new Validator(container.get(AnnotationsServiceName.ClassAnnotationsStore)))
}
