# Threads

The threads module provides abstractions for thread manipulations. The execution may differ between targeted platforms to take advantage of their capabilities.

## Execute in background

Executes the method in background. Here are the execution differences between platforms:

- React Native: executes in separate thread
- Web: executes during idle time if the browser supports this feature, otherwise as soon as possible using `setTimeout`

```ts
class Service {
    @BackgroundTask()
    doSomeExpensiveStuff(): void {
        // ...
    }
}

const service = new Service()
service.doSomeExpensiveStuff()
```

## Background loop

The `BackgroundLoop` class will take tasks and execute them repeatedly in background:

```ts
const backgroundLoop = new BackgroundLoop(backgroundTaskManager, 1000) // default execution interval is set to 1 second
backgroundLoop.setTask('test', () => { console.log('in loop') }) // add a task called 'test'
backgroundLoop.start('test') // start the task
```

This loop will print `in loop` in console every second.
