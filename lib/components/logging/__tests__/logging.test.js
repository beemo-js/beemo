"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingBag_1 = require("../LoggingBag");
var components_1 = require("../../../integrations/web/components");
var __1 = require("..");
test('Logger', function () {
    var webLogDataFormatter = new components_1.WebLogDataFormatter();
    var loggingBag = new LoggingBag_1.LoggingBag();
    var batchLogger = new __1.BatchLogger(webLogDataFormatter, loggingBag);
    batchLogger.log({
        a: 'b'
    });
    expect(loggingBag.getLogs()[0]['data']['a']).toBe('b');
    expect(loggingBag.getLogs()).toHaveLength(0);
});
