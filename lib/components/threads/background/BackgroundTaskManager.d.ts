export interface BackgroundTaskManager {
    executeInBackground(fn: Function): void;
}
