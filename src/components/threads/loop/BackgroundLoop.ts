import {BackgroundTaskManager} from '..'

/**
 * Executes a task again and again in background.
 */
export class BackgroundLoop {
    private tasks: Object = {}

    constructor(
        private backgroundTaskManager: BackgroundTaskManager,
        private defaultInterval: number
    ) {}

    setTask(id: string, task: Function, interval: number = this.defaultInterval): void {
        if (!this.tasks[id]) {
            this.tasks[id] = {
                task,
                interval,
                intervalId: null
            }
        }
    }

    start(id: string): void {
        if (!this.tasks[id]) {
            throw 'No task set.'
        }

        this.stop(id)

        this.tasks[id].intervalId = setInterval(
            () => this.backgroundTaskManager.executeInBackground(this.tasks[id].task),
            this.tasks[id].interval
        )
    }

    stop(id: string): void {
        if (!!this.tasks[id] && !!this.tasks[id].intervalId) {
            clearInterval(this.tasks[id].intervalId)
            this.tasks[id].intervalId = null
        }
    }
}