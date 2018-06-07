# Logging

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

Batch logger is used like other loggers, but logs are aggregated into a logs bag and handled by batches by a worker.

```ts
const logger = new BatchLogger(new WebLogDataFormatter(), new LoggingBag())

logger.log({
    key: 'value'
})
```