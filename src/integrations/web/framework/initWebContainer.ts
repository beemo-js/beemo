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
    ThreadsServiceName
} from '../../../framework'

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

    // Threads

    container.set(ThreadsServiceName.BackgroundTaskManager, () => new WebBackgroundTaskManager())

}