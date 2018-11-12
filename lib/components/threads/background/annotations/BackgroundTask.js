import { aopAnnotation } from '../../../annotations/aop';
import { container } from '../../../../framework/globalContainer';
import { ThreadsServiceName } from '../../../../framework/services';
/**
 * Execute given method in background.
 */
export function BackgroundTask() {
    return aopAnnotation((next, args) => {
        container.get(ThreadsServiceName.BackgroundTaskManager).executeInBackground(() => next(args));
    });
}
