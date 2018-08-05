"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var WebLogDataFormatter = /** @class */ (function () {
    function WebLogDataFormatter() {
    }
    WebLogDataFormatter.prototype.format = function (log) {
        return {
            date: new Date(),
            data: log
        };
    };
    return WebLogDataFormatter;
}());
exports.WebLogDataFormatter = WebLogDataFormatter;
test('Logger', function () {
    var webLogDataFormatter = new WebLogDataFormatter();
    var loggingBag = new __1.LoggingBag();
    var batchLogger = new __1.BatchLogger(webLogDataFormatter, loggingBag);
    batchLogger.log({
        a: 'b'
    });
    expect(loggingBag.getLogs()[0]['data']['a']).toBe('b');
    expect(loggingBag.getLogs()).toHaveLength(0);
});
