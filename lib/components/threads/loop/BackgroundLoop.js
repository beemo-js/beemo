"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Executes a task again and again in background.
 */
var BackgroundLoop = /** @class */ (function () {
    function BackgroundLoop(backgroundTaskManager, defaultInterval) {
        this.backgroundTaskManager = backgroundTaskManager;
        this.defaultInterval = defaultInterval;
        this.tasks = {};
    }
    BackgroundLoop.prototype.setTask = function (id, task, interval) {
        if (interval === void 0) { interval = this.defaultInterval; }
        if (!this.tasks[id]) {
            this.tasks[id] = {
                task: task,
                interval: interval,
                intervalId: null
            };
        }
    };
    BackgroundLoop.prototype.start = function (id) {
        var _this = this;
        if (!this.tasks[id]) {
            throw 'No task set.';
        }
        this.stop(id);
        this.tasks[id].intervalId = setInterval(function () { return _this.backgroundTaskManager.executeInBackground(_this.tasks[id].task); }, this.tasks[id].interval);
    };
    BackgroundLoop.prototype.stop = function (id) {
        if (!!this.tasks[id] && !!this.tasks[id].intervalId) {
            clearInterval(this.tasks[id].intervalId);
            this.tasks[id].intervalId = null;
        }
    };
    return BackgroundLoop;
}());
exports.BackgroundLoop = BackgroundLoop;
