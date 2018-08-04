"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebBackgroundTaskManager = /** @class */ (function () {
    function WebBackgroundTaskManager() {
    }
    WebBackgroundTaskManager.prototype.executeInBackground = function (fn) {
        // @ts-ignore
        if (!!requestIdleCallback) {
            // @ts-ignore
            requestIdleCallback(fn);
        }
        else {
            setTimeout(fn, 1);
        }
    };
    return WebBackgroundTaskManager;
}());
exports.WebBackgroundTaskManager = WebBackgroundTaskManager;
