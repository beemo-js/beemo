"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globalContainer_1 = require("./globalContainer");
var services_1 = require("./services");
var annotations_1 = require("../components/annotations");
var config_1 = require("../components/config");
var conversion_1 = require("../components/conversion");
var di_1 = require("../components/di");
var events_1 = require("../components/events");
var http_1 = require("../components/http");
var logging_1 = require("../components/logging");
var metadata_1 = require("../components/metadata");
var serialization_1 = require("../components/serialization");
var threads_1 = require("../components/threads");
var types_1 = require("../components/types");
var validation_1 = require("../components/validation");
var containerInitialized = false;
function initContainer() {
    if (containerInitialized) {
        return false;
    }
    // Annotations
    globalContainer_1.container.set(services_1.AnnotationsServiceName.ClassAnnotationsStore, function () { return new annotations_1.ClassAnnotationsStore(globalContainer_1.container.get(services_1.MetadataServiceName.ClassMetadataStore)); });
    // Config
    globalContainer_1.container.set(services_1.ConfigServiceName.ConfigurationStore, function () { return new config_1.InMemoryConfigurationStore(); });
    // Conversion
    globalContainer_1.container.set(services_1.ConversionServiceName.Converter, function () { return new conversion_1.Converter(); });
    // DI
    globalContainer_1.container.set(services_1.DiServiceName.Container, function () { return globalContainer_1.container; });
    globalContainer_1.container.set(services_1.DiServiceName.ReflectionServiceManager, function () { return new di_1.ReflectionServiceManager(globalContainer_1.container.get(services_1.TypesServiceName.ReflectionClassTypesStore), globalContainer_1.container.get(services_1.AnnotationsServiceName.ClassAnnotationsStore), globalContainer_1.container.get(services_1.DiServiceName.Container), globalContainer_1.container.get(services_1.ConfigServiceName.ConfigurationStore)); });
    // Events
    globalContainer_1.container.set(services_1.EventsServiceName.EventBus, function () { return new events_1.EventBus(); });
    // HTTP
    globalContainer_1.container.set(services_1.HttpServiceName.CallAnnotationsHandler, function () { return new http_1.CallAnnotationsHandler(globalContainer_1.container.get(services_1.AnnotationsServiceName.ClassAnnotationsStore), globalContainer_1.container.get(services_1.SerializationServiceName.Normalizer)); });
    globalContainer_1.container.set(services_1.HttpServiceName.CallHttpClient, function () { return new http_1.CallHttpClient(globalContainer_1.container.get(services_1.HttpServiceName.HttpClient), globalContainer_1.container.get(services_1.SerializationServiceName.Encoder), globalContainer_1.container.get(services_1.SerializationServiceName.Normalizer)); });
    globalContainer_1.container.set(services_1.HttpServiceName.RequestsQueue, function () { return new http_1.BatchRequestsQueue(globalContainer_1.container.get(services_1.HttpServiceName.HttpClient), false); });
    globalContainer_1.container.set(services_1.HttpServiceName.CircuitBreaker, function () { return new http_1.CircuitBreaker(4, 2, 1000); });
    // Logging
    globalContainer_1.container.set(services_1.LoggingServiceName.Logger, function () { return new logging_1.ConsoleLogger(globalContainer_1.container.get(services_1.LoggingServiceName.LogDataFormatter)); });
    globalContainer_1.container.set(services_1.LoggingServiceName.LoggingBag, function () { return new logging_1.LoggingBag(); });
    globalContainer_1.container.set(services_1.LoggingServiceName.LogsOrchestrationWorker, function () { return new logging_1.LogsOrchestrationWorker(globalContainer_1.container.get(services_1.LoggingServiceName.LoggingBag), globalContainer_1.container.get(services_1.LoggingServiceName.LogsOrchestrator), 5); });
    globalContainer_1.container.set(services_1.LoggingServiceName.LogsOrchestrator, function () { return new logging_1.HttpLogsOrchestrator(globalContainer_1.container.get(services_1.HttpServiceName.RequestsQueue), function (log) { return new http_1.RequestBuilder().url('/log').body(log).build(); }); });
    // Metadata
    globalContainer_1.container.set(services_1.MetadataServiceName.ClassMetadataStore, function () { return new metadata_1.ClassMetadataStore(); });
    // Serialization
    globalContainer_1.container.set(services_1.SerializationServiceName.Serializer, function () { return new serialization_1.ComposableSerializer(globalContainer_1.container.get(services_1.SerializationServiceName.Normalizer), globalContainer_1.container.get(services_1.SerializationServiceName.Encoder)); });
    globalContainer_1.container.set(services_1.SerializationServiceName.Encoder, function () { return new serialization_1.JsonEncoder(); });
    globalContainer_1.container.set(services_1.SerializationServiceName.ClassMapper, function () { return new serialization_1.ClassMapper(globalContainer_1.container.get(services_1.SerializationServiceName.Normalizer)); });
    globalContainer_1.container.set(services_1.SerializationServiceName.Normalizer, function () { return new serialization_1.Normalizer(globalContainer_1.container.get(services_1.MetadataServiceName.ClassMetadataStore)); });
    // Threads
    globalContainer_1.container.set(services_1.ThreadsServiceName.BackgroundLoop, function () { return new threads_1.BackgroundLoop(globalContainer_1.container.get(services_1.ThreadsServiceName.BackgroundTaskManager), 10); });
    // Types
    globalContainer_1.container.set(services_1.TypesServiceName.ReflectionClassTypesStore, function () { return new types_1.ReflectionClassTypesStore(globalContainer_1.container.get(services_1.TypesServiceName.ClassTypesStore)); });
    globalContainer_1.container.set(services_1.TypesServiceName.ClassTypesStore, function () { return new types_1.ClassTypesStore(globalContainer_1.container.get(services_1.MetadataServiceName.ClassMetadataStore)); });
    // Validation
    globalContainer_1.container.set(services_1.ValidationServiceName.Validator, function () { return new validation_1.Validator(globalContainer_1.container.get(services_1.AnnotationsServiceName.ClassAnnotationsStore)); });
    containerInitialized = true;
    return true;
}
exports.initContainer = initContainer;
