import {BatchLogger, LogDataFormatter, LoggingBag} from '..'

export class WebLogDataFormatter implements LogDataFormatter {
    format(log: Object): Object {
        return {
            date: new Date(),
            data: log
        }
    }
}

test('Logger', () => {
    const webLogDataFormatter = new WebLogDataFormatter()
    const loggingBag = new LoggingBag()

    const batchLogger = new BatchLogger(webLogDataFormatter, loggingBag)
    batchLogger.log({
        a: 'b'
    })
    expect(loggingBag.getLogs()[0]['data']['a']).toBe('b')
    expect(loggingBag.getLogs()).toHaveLength(0)
})
