"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var annotations_1 = require("../../../annotations");
var framework_1 = require("../../../../framework");
/**
 * Execute given method in background.
 */
function BackgroundTask() {
    return annotations_1.aopAnnotation(function (next, args) {
        framework_1.container.get(framework_1.ThreadsServiceName.BackgroundTaskManager).executeInBackground(function () { return next(args); });
    });
}
exports.BackgroundTask = BackgroundTask;
