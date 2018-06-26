import {aopAnnotation} from '../../../annotations/aop'
import {container} from '../../../../framework/globalContainer'
import {BackgroundTaskManager} from '../BackgroundTaskManager'
import {ThreadsServiceName} from '../../../../framework/services'

/**
 * Execute given method in background.
 */
export function BackgroundTask(): MethodDecorator {
    return aopAnnotation((next, args) => {
        container.get<BackgroundTaskManager>(ThreadsServiceName.BackgroundTaskManager).executeInBackground(() => next(args))
    })
}