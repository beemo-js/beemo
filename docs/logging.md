# Logging

Beemo provides tools to do logging in a flexible enough way to fit with your backend logging solution.

## Console logger

This logger logs directly to console. It's useful for local development.

```ts
const logger = new ConsoleLogger(new WebLogDataFormatter())

logger.log({
    key: 'value'
})
```

```
{
    "date": "2018-01-01T01:00:00.000Z",
    "data": {
        "key": value
    }
}
```

## Batch logger

In production, batch logger should be used instead. It aggregates logs into a logs bag; these logs are then handled by batches by a worker.

```ts
const loggingBag = new LoggingBag()
const logger = new BatchLogger(new WebLogDataFormatter(), loggingBag)
const logsOrchestrationWorker = new LogsOrchestrationWorker(loggingBag, httpLogsOrchestrator, 5000) // send logs to server via HTTP every 5 seconds
logsOrchestrationWorker.start()

logger.log({
    key: 'value'
})
```
