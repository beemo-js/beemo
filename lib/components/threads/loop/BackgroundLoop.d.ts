import { BackgroundTaskManager } from '..';
/**
 * Executes a task again and again in background.
 */
export declare class BackgroundLoop {
    private backgroundTaskManager;
    private defaultInterval;
    private tasks;
    constructor(backgroundTaskManager: BackgroundTaskManager, defaultInterval: number);
    setTask(id: string, task: Function, interval?: number): void;
    start(id: string): void;
    stop(id: string): void;
}
