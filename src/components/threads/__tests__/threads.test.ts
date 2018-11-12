import {initContainer} from '../../../framework/initContainer'
import {BackgroundTaskManager} from '../background/BackgroundTaskManager'
import {container} from '../../../framework/globalContainer'
import {ThreadsServiceName} from '../../../framework/services'
import {BackgroundTask} from '../background/annotations/BackgroundTask'
import {BackgroundLoop} from '../loop/BackgroundLoop'

initContainer()

class TestsBackgroundTaskManager implements BackgroundTaskManager {
    executeInBackground(fn: Function): void { setTimeout(fn, 1) }
}

const backgroundTaskManager = new TestsBackgroundTaskManager()
container.set(ThreadsServiceName.BackgroundTaskManager, () => backgroundTaskManager, true)

test('Background task', () => {
    class Service {
        @BackgroundTask()
        foo(): void {
            console.log('foo')
        }
    }

    const service = new Service()
    service.foo()

    // test is needed
    expect(true).toBeTruthy()
})

test('Loop', () => {
    const backgroundLoop = new BackgroundLoop(backgroundTaskManager, 50)
    backgroundLoop.setTask('test', () => { console.log('in loop') })
    backgroundLoop.start('test')
    setTimeout(() => backgroundLoop.stop('test'), 200)

    // test is needed
    expect(true).toBeTruthy()
})
