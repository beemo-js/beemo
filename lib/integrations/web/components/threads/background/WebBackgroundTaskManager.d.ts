import { BackgroundTaskManager } from '../../../../../components/threads';
export declare class WebBackgroundTaskManager implements BackgroundTaskManager {
    executeInBackground(fn: Function): void;
}
