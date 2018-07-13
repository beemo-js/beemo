import {BackgroundTaskManager} from '../../../../../components/threads'

export class WebBackgroundTaskManager implements BackgroundTaskManager {
    executeInBackground(fn: Function): void {
        // @ts-ignore
        if (!!requestIdleCallback) {
            // @ts-ignore
            requestIdleCallback(fn)
        } else {
            setTimeout(fn, 1)
        }
    }
}