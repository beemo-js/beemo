"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
