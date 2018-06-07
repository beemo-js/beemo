# Threads

## Execute in background

Executes the method in background (in separate thread if possible, otherwise during idle time)

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
