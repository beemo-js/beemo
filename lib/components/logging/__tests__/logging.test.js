import { LoggingBag } from '../LoggingBag';
import { BatchLogger } from '../logger/BatchLogger';
export class WebLogDataFormatter {
    format(log) {
        return {
            date: new Date(),
            data: log
        };
    }
}
test('Logger', () => {
    const webLogDataFormatter = new WebLogDataFormatter();
    const loggingBag = new LoggingBag();
    const batchLogger = new BatchLogger(webLogDataFormatter, loggingBag);
    batchLogger.log({
        a: 'b'
    });
    expect(loggingBag.getLogs()[0]['data']['a']).toBe('b');
    expect(loggingBag.getLogs()).toHaveLength(0);
});
