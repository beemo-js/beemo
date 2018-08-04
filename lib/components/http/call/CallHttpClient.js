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
var Call_1 = require("./Call");
/**
 * Retrieves the value of Call resources.
 */
var CallHttpClient = /** @class */ (function () {
    function CallHttpClient(httpClient, encoder, normalizer) {
        this.httpClient = httpClient;
        this.encoder = encoder;
        this.normalizer = normalizer;
    }
    CallHttpClient.prototype.retrieveData = function (call) {
        return (call instanceof Call_1.Call ? this.retrieveCallData(call) :
            Array.isArray(call) ? this.retrieveDataArray(call) :
                this.retrieveDataObject(call));
    };
    /**
     * Retrieve value of one Call.
     */
    CallHttpClient.prototype.retrieveCallData = function (call) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!call.retrieved) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.httpClient.sendRequest(call.request)];
                    case 1:
                        response = _a.sent();
                        this.parseCallResponseData(call, response);
                        _a.label = 2;
                    case 2: return [2 /*return*/, call.get()];
                }
            });
        });
    };
    /**
     * Retrieve value of a list of Calls.
     */
    CallHttpClient.prototype.retrieveDataArray = function (calls) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var requestsToSend, responses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestsToSend = calls
                            .map(function (rd, index) { return [rd, index]; })
                            .filter(function (_a) {
                            var rd = _a[0];
                            return !rd.retrieved;
                        });
                        return [4 /*yield*/, this.httpClient.sendRequests(requestsToSend.map(function (_a) {
                                var rd = _a[0];
                                return rd.request;
                            }))];
                    case 1:
                        responses = _a.sent();
                        responses.forEach(function (resp, index) { return __awaiter(_this, void 0, void 0, function () {
                            var id;
                            return __generator(this, function (_a) {
                                id = requestsToSend[index][1];
                                this.parseCallResponseData(calls[id], resp);
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/, calls.map(function (rd) { return rd.value; })];
                }
            });
        });
    };
    /**
     * Retrieve value of Calls in a dict of calls.
     */
    CallHttpClient.prototype.retrieveDataObject = function (requestsData) {
        return __awaiter(this, void 0, void 0, function () {
            var result, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = Object.assign({}, requestsData);
                        return [4 /*yield*/, this.retrieveDataArray(Object.values(result))];
                    case 1:
                        _a.sent();
                        for (i in result) {
                            result[i] = result[i].value;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Set the value of given Call from HTTP response.
     */
    CallHttpClient.prototype.parseCallResponseData = function (call, response) {
        var rawResponseData = this.encoder.decode(response.body.content);
        var formattedResponseData = call.responseFormatter(rawResponseData);
        var normalizedResponseData = this.normalizer.denormalize(call.classFn, formattedResponseData);
        call.set(normalizedResponseData);
    };
    return CallHttpClient;
}());
exports.CallHttpClient = CallHttpClient;
