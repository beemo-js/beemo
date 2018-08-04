"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var framework_1 = require("../../../framework");
framework_1.initContainer();
var TestsBackgroundTaskManager = /** @class */ (function () {
    function TestsBackgroundTaskManager() {
    }
    TestsBackgroundTaskManager.prototype.executeInBackground = function (fn) { setTimeout(fn, 1); };
    return TestsBackgroundTaskManager;
}());
var backgroundTaskManager = new TestsBackgroundTaskManager();
framework_1.container.set(framework_1.ThreadsServiceName.BackgroundTaskManager, function () { return backgroundTaskManager; }, true);
test('Background task', function () {
    var Service = /** @class */ (function () {
        function Service() {
        }
        Service.prototype.foo = function () {
            console.log('foo');
        };
        __decorate([
            __1.BackgroundTask(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Service.prototype, "foo", null);
        return Service;
    }());
    var service = new Service();
    service.foo();
    // test is needed
    expect(true).toBeTruthy();
});
test('Loop', function () {
    var backgroundLoop = new __1.BackgroundLoop(backgroundTaskManager, 50);
    backgroundLoop.setTask('test', function () { console.log('in loop'); });
    backgroundLoop.start('test');
    setTimeout(function () { return backgroundLoop.stop('test'); }, 200);
    // test is needed
    expect(true).toBeTruthy();
});
