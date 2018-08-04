"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonEncoder = /** @class */ (function () {
    function JsonEncoder() {
    }
    JsonEncoder.prototype.decode = function (text) {
        return JSON.parse(text);
    };
    JsonEncoder.prototype.encode = function (data) {
        return JSON.stringify(data);
    };
    return JsonEncoder;
}());
exports.JsonEncoder = JsonEncoder;
