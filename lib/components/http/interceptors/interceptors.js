"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../../../framework");
/**
 * Retry calling the request nbRetries times if it failed.
 */
function retryInterceptor(nbRetries) {
    var _this = this;
    if (nbRetries === void 0) { nbRetries = 1; }
    return function (next, request) { return __awaiter(_this, void 0, void 0, function () {
        var exception, i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i <= nbRetries)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, next(request)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    e_1 = _a.sent();
                    exception = e_1;
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: throw exception;
            }
        });
    }); };
}
exports.retryInterceptor = retryInterceptor;
/**
 * Set a timeout for HTTP request.
 */
function timeoutInterceptor(timeout) {
    var _this = this;
    if (timeout === void 0) { timeout = 5000; }
    return function (next, request) { return __awaiter(_this, void 0, void 0, function () {
        var requestPromise, timeoutPromise, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestPromise = next(request);
                    timeoutPromise = new Promise(function (resolve) { return setTimeout(resolve, timeout, false); });
                    return [4 /*yield*/, Promise.race([requestPromise, timeoutPromise])];
                case 1:
                    response = _a.sent();
                    if (response === false) {
                        throw 'Timeout - response could not be received in time';
                    }
                    return [2 /*return*/, response];
            }
        });
    }); };
}
exports.timeoutInterceptor = timeoutInterceptor;
/**
 * Apply the circuit breaker pattern when making an HTTP request.
 */
function circuitBreakerInterceptor() {
    return function (next, request) {
        var circuitBreaker = framework_1.container.get(framework_1.HttpServiceName.CircuitBreaker);
        return circuitBreaker.attempt(function () { return next(request); });
    };
}
exports.circuitBreakerInterceptor = circuitBreakerInterceptor;
