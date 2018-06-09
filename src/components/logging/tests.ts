import {LoggingBag} from './LoggingBag'
import {ConsoleLogger} from './logger/ConsoleLogger'
import {WebLogDataFormatter} from './formatter/WebLogDataFormatter'
import {BatchLogger} from './logger/BatchLogger'

const webLogDataFormatter = new WebLogDataFormatter()
const loggingBag = new LoggingBag()

// ConsoleLogger

const consoleLogger = new ConsoleLogger(webLogDataFormatter)
consoleLogger.log({
    c: 'd'
})

// BatchLogger

const batchLogger = new BatchLogger(webLogDataFormatter, loggingBag)
batchLogger.log({
    a: 'b'
})
console.log(loggingBag.getLogs())
console.log(loggingBag.getLogs())
