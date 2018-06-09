import {BackgroundTaskManager} from './background/BackgroundTaskManager'
import {BackgroundLoop} from './loop/BackgroundLoop'
import {BackgroundTask} from './background/annotations/BackgroundTask'
import {container} from '../../framework/globalContainer'
import {ThreadsServiceName} from '../../framework/services'
import {initContainer} from '../../framework/initContainer'

initContainer()

class TestsBackgroundTaskManager implements BackgroundTaskManager {
    executeInBackground(fn: Function): void { setTimeout(fn, 1) }
}

// Background tasks

const backgroundTaskManager = new TestsBackgroundTaskManager()
container.set(ThreadsServiceName.BackgroundTaskManager, () => backgroundTaskManager, true)

class Service {
    @BackgroundTask()
    foo(): void {
        console.log('foo')
    }
}

const service = new Service()
service.foo()
console.log('foo called')

// Loop

const backgroundLoop = new BackgroundLoop(backgroundTaskManager, 50)
backgroundLoop.setTask('test', () => { console.log('in loop') })
backgroundLoop.start('test')
setTimeout(() => backgroundLoop.stop('test'), 200)
