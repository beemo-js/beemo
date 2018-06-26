import {WebHttpClient} from '../components/http/client/WebHttpClient'
import {
    HttpServiceName,
    LoggingServiceName,
    PermissionsServiceName,
    ThreadsServiceName
} from '../../../framework/services'
import {container} from '../../../framework/globalContainer'
import {WebLogDataFormatter} from '../components/logging/formatter/WebLogDataFormatter'
import {WebPermissionsRequester} from '../components/permissions/requester/WebPermissionsRequester'
import {WebBackgroundTaskManager} from '../components/threads/background/WebBackgroundTaskManager'
import {initContainer} from '../../../framework'

let containerInitialized = false

export function initWebContainer() {

    if (containerInitialized) {
        return false
    }

    initContainer()

    // Http

    container.set(HttpServiceName.HttpClient, () => new WebHttpClient())

    // Logging

    container.set(LoggingServiceName.LogDataFormatter, () => new WebLogDataFormatter())

    // Permissions

    container.set(PermissionsServiceName.PermissionsRequester, () => new WebPermissionsRequester())

    // Threads

    container.set(ThreadsServiceName.BackgroundTaskManager, () => new WebBackgroundTaskManager())

}