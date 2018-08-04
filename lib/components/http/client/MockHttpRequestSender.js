"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * Mock HTTP client.
 * Requests will go to an embedded mock server.
 * Useful for quick prototyping.
 */
var MockHttpRequestSender = /** @class */ (function () {
    function MockHttpRequestSender(mockServer, baseRequest) {
        if (baseRequest === void 0) { baseRequest = new __1.Request(); }
        this.mockServer = mockServer;
        this.baseRequest = baseRequest;
    }
    MockHttpRequestSender.prototype.sendRequest = function (request) {
        var finalRequest = __1.Request.merge(this.baseRequest, request);
        return this.mockServer.request(finalRequest);
    };
    return MockHttpRequestSender;
}());
exports.MockHttpRequestSender = MockHttpRequestSender;
