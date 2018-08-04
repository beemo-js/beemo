"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var components_1 = require("../components");
var framework_1 = require("../../../framework");
var components_2 = require("../components");
var persistence_1 = require("../../../components/persistence");
var containerInitialized = false;
function initWebContainer() {
    if (containerInitialized) {
        return false;
    }
    framework_1.initContainer();
    // Http
    framework_1.container.set(framework_1.HttpServiceName.HttpClient, function () { return new components_1.WebHttpRequestSender(); });
    // Logging
    framework_1.container.set(framework_1.LoggingServiceName.LogDataFormatter, function () { return new components_1.WebLogDataFormatter(); });
    // Persistence
    framework_1.container.set(framework_1.PersistenceServiceName.KVStore, function () {
        return !!localStorage ?
            new components_2.LocalStorageKVStore(framework_1.container.get(framework_1.SerializationServiceName.Encoder)) :
            new persistence_1.InMemoryKVStore();
    });
    // Threads
    framework_1.container.set(framework_1.ThreadsServiceName.BackgroundTaskManager, function () { return new components_1.WebBackgroundTaskManager(); });
}
exports.initWebContainer = initWebContainer;
