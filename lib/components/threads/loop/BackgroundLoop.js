/**
 * Executes a task again and again in background.
 */
export class BackgroundLoop {
    constructor(backgroundTaskManager, defaultInterval) {
        this.backgroundTaskManager = backgroundTaskManager;
        this.defaultInterval = defaultInterval;
        this.tasks = {};
    }
    setTask(id, task, interval = this.defaultInterval) {
        if (!this.tasks[id]) {
            this.tasks[id] = {
                task,
                interval,
                intervalId: null
            };
        }
    }
    start(id) {
        if (!this.tasks[id]) {
            throw 'No task set.';
        }
        this.stop(id);
        this.tasks[id].intervalId = setInterval(() => this.backgroundTaskManager.executeInBackground(this.tasks[id].task), this.tasks[id].interval);
    }
    stop(id) {
        if (!!this.tasks[id] && !!this.tasks[id].intervalId) {
            clearInterval(this.tasks[id].intervalId);
            this.tasks[id].intervalId = null;
        }
    }
}
