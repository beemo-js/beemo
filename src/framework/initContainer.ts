import {container} from './globalContainer'
import {
    AnnotationsServiceName,
    ConfigServiceName,
    ConversionServiceName,
    DiServiceName,
    EventsServiceName,
    HttpServiceName,
    LoggingServiceName,
    MetadataServiceName,
    SerializationServiceName,
    ThreadsServiceName,
    TypesServiceName,
    ValidationServiceName
} from './services'
import {ClassAnnotationsStore} from '../components/annotations/ClassAnnotationsStore'
import {InMemoryConfigurationStore} from '../components/config/InMemoryConfigurationStore'
import {Converter} from '../components/conversion/Converter'
import {ReflectionServiceManager} from '../components/di/ReflectionServiceManager'
import {EventBus} from '../components/events/EventBus'
import {CallAnnotationsHandler} from '../components/http/factory/call/CallAnnotationsHandler'
import {CallHttpClient} from '../components/http/call/CallHttpClient'
import {BatchRequestsQueue} from '../components/http/queue/BatchRequestsQueue'
import {CircuitBreaker} from '../components/http/interceptors/CircuitBreaker'
import {ConsoleLogger} from '../components/logging/logger/ConsoleLogger'
import {LoggingBag} from '../components/logging/LoggingBag'
import {LogsOrchestrationWorker} from '../components/logging/orchestration/LogsOrchestrationWorker'
import {HttpLogsOrchestrator} from '../components/logging/orchestration/HttpLogsOrchestrator'
import {RequestBuilder} from '../components/http/abstractions/RequestBuilder'
import {ClassMetadataStore} from '../components/metadata/ClassMetadataStore'
import {ComposableSerializer} from '../components/serialization/serializers/ComposableSerializer'
import {JsonEncoder} from '../components/serialization/encoders/JsonEncoder'
import {ClassMapper} from '../components/serialization/ClassMapper'
import {Normalizer} from '../components/serialization/Normalizer'
import {BackgroundLoop} from '../components/threads/loop/BackgroundLoop'
import {ReflectionClassTypesStore} from '../components/types/ReflectionClassTypesStore'
import {ClassTypesStore} from '../components/types/ClassTypesStore'
import {Validator} from '../components/validation/Validator'

let containerInitialized = false

export function initContainer(): boolean {

    if (containerInitialized) {
        return false
    }

    // Annotations

    container.set(AnnotationsServiceName.ClassAnnotationsStore, () => new ClassAnnotationsStore(container.get(MetadataServiceName.ClassMetadataStore)))

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
        container.get(ConfigServiceName.ConfigurationStore)
    ))

    // Events

    container.set(EventsServiceName.EventBus, () => new EventBus())

    // HTTP

    container.set(HttpServiceName.CallAnnotationsHandler, () => new CallAnnotationsHandler(
        container.get(AnnotationsServiceName.ClassAnnotationsStore),
        container.get(SerializationServiceName.Normalizer)
    ))
    container.set(HttpServiceName.CallHttpClient, () => new CallHttpClient(
        container.get(HttpServiceName.HttpClient),
        container.get(SerializationServiceName.Encoder),
        container.get(SerializationServiceName.Normalizer)
    ))
    container.set(HttpServiceName.RequestsQueue, () => new BatchRequestsQueue(
        container.get(HttpServiceName.HttpClient),
        false
    ))
    container.set(HttpServiceName.CircuitBreaker, () => new CircuitBreaker(4, 2, 1000))

    // Logging

    container.set(LoggingServiceName.Logger, () => new ConsoleLogger(container.get(LoggingServiceName.LogDataFormatter)))
    container.set(LoggingServiceName.LoggingBag, () => new LoggingBag())
    container.set(LoggingServiceName.LogsOrchestrationWorker, () => new LogsOrchestrationWorker(
        container.get(LoggingServiceName.LoggingBag),
        container.get(LoggingServiceName.LogsOrchestrator),
        5
    ))
    container.set(LoggingServiceName.LogsOrchestrator, () => new HttpLogsOrchestrator(
        container.get(HttpServiceName.RequestsQueue),
        log => new RequestBuilder().url('/log').body(log).build()
    ))

    // Metadata

    container.set(MetadataServiceName.ClassMetadataStore, () => new ClassMetadataStore())

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

    // Types

    container.set(TypesServiceName.ReflectionClassTypesStore, () => new ReflectionClassTypesStore(container.get(TypesServiceName.ClassTypesStore)))
    container.set(TypesServiceName.ClassTypesStore, () => new ClassTypesStore(container.get(MetadataServiceName.ClassMetadataStore)))

    // Validation

    container.set(ValidationServiceName.Validator, () => new Validator(container.get(AnnotationsServiceName.ClassAnnotationsStore)))

    containerInitialized = true

    return true
}
