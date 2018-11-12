var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { initContainer } from '../../../framework/initContainer';
import { container } from '../../../framework/globalContainer';
import { ThreadsServiceName } from '../../../framework/services';
import { BackgroundTask } from '../background/annotations/BackgroundTask';
import { BackgroundLoop } from '../loop/BackgroundLoop';
initContainer();
class TestsBackgroundTaskManager {
    executeInBackground(fn) { setTimeout(fn, 1); }
}
const backgroundTaskManager = new TestsBackgroundTaskManager();
container.set(ThreadsServiceName.BackgroundTaskManager, () => backgroundTaskManager, true);
test('Background task', () => {
    class Service {
        foo() {
            console.log('foo');
        }
    }
    __decorate([
        BackgroundTask(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Service.prototype, "foo", null);
    const service = new Service();
    service.foo();
    // test is needed
    expect(true).toBeTruthy();
});
test('Loop', () => {
    const backgroundLoop = new BackgroundLoop(backgroundTaskManager, 50);
    backgroundLoop.setTask('test', () => { console.log('in loop'); });
    backgroundLoop.start('test');
    setTimeout(() => backgroundLoop.stop('test'), 200);
    // test is needed
    expect(true).toBeTruthy();
});
