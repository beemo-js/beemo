import {aopAnnotation} from '../../../annotations'
import {container, ThreadsServiceName} from '../../../../framework'
import {BackgroundTaskManager} from '../BackgroundTaskManager'

/**
 * Execute given method in background.
 */
export function BackgroundTask(): MethodDecorator {
    return aopAnnotation((next, args) => {
        container.get<BackgroundTaskManager>(ThreadsServiceName.BackgroundTaskManager).executeInBackground(() => next(args))
    })
}