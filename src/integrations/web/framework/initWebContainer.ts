import {
    WebBackgroundTaskManager,
    WebHttpRequestSender,
    WebLogDataFormatter
} from '../components'
import {
    container,
    HttpServiceName,
    initContainer,
    LoggingServiceName,
    ThreadsServiceName,
    PersistenceServiceName,
    SerializationServiceName
} from '../../../framework'
import {LocalStorageKVStore} from '../components'
import {InMemoryKVStore} from '../../../components/persistence'

let containerInitialized = false

export function initWebContainer() {

    if (containerInitialized) {
        return false
    }

    initContainer()

    // Http

    container.set(HttpServiceName.HttpClient, () => new WebHttpRequestSender())

    // Logging

    container.set(LoggingServiceName.LogDataFormatter, () => new WebLogDataFormatter())

    // Persistence

    container.set(PersistenceServiceName.KVStore, () => {
        return !!localStorage ?
            new LocalStorageKVStore(container.get(SerializationServiceName.Encoder)):
            new InMemoryKVStore()
    })

    // Threads

    container.set(ThreadsServiceName.BackgroundTaskManager, () => new WebBackgroundTaskManager())

}