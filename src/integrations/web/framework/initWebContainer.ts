import {
    WebBackgroundTaskManager,
    WebHttpRequestSender,
    WebLogDataFormatter,
    WebPermissionsRequester
} from '../components'
import {
    container,
    HttpServiceName,
    initContainer,
    LoggingServiceName,
    PermissionsServiceName,
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

    // Permissions

    container.set(PermissionsServiceName.PermissionsRequester, () => new WebPermissionsRequester())

    // Threads

    container.set(ThreadsServiceName.BackgroundTaskManager, () => new WebBackgroundTaskManager())

}