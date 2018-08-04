"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var serialization_1 = require("../../serialization");
var framework_1 = require("../../../framework");
framework_1.initContainer();
// Mock server
var mockServer = new __1.MockServer([
    {
        pattern: 'https://myDomain.com/api/users/[0-9]+',
        controller: function (request) {
            var users = {
                21: {
                    id: 21,
                    name: 'bob'
                }
            };
            var user = users[request.url.split('/').pop()];
            return user ?
                new __1.ResponseBuilder().status(200).body(JSON.stringify(user)).build() :
                new __1.ResponseBuilder().status(404).build();
        }
    }
], 50);
var httpRequestSender = new __1.MockHttpRequestSender(mockServer, new __1.Request('https://myDomain.com/api/'));
var httpClient = new __1.HttpClient(httpRequestSender);
httpClient.useInterceptor(__1.circuitBreakerInterceptor());
httpClient.useInterceptor(__1.retryInterceptor());
httpClient.useInterceptor(__1.timeoutInterceptor(500));
var requestsQueue = new __1.BatchRequestsQueue(httpClient, false);
var callHttpClient = new __1.CallHttpClient(httpClient, new serialization_1.JsonEncoder(), framework_1.container.get(framework_1.SerializationServiceName.Normalizer));
var request = new __1.RequestBuilder()
    .url('/users/21')
    .body({ a: 'b' })
    .headers({ e: 'f' })
    .urlParameters({ c: 'd' })
    .build();
test('http client', function () { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, httpClient.sendRequest(request)];
            case 1:
                response = _a.sent();
                expect(response.body.json()['name']).toBe('bob');
                return [2 /*return*/];
        }
    });
}); });
test('multiple requests', function () { return __awaiter(_this, void 0, void 0, function () {
    var responses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, httpClient.sendRequests([request, request])];
            case 1:
                responses = _a.sent();
                expect(responses[0].body.json()['name']).toBe('bob');
                expect(responses[1].body.json()['name']).toBe('bob');
                return [2 /*return*/];
        }
    });
}); });
test('interceptors', function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var httpClientWithInterceptors, changed, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                httpClientWithInterceptors = new __1.HttpClient(httpRequestSender);
                changed = false;
                httpClientWithInterceptors.useInterceptor(function (next, request) { return __awaiter(_this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                changed = true;
                                return [4 /*yield*/, next(request)];
                            case 1:
                                response = _a.sent();
                                response.status = 202;
                                return [2 /*return*/, response];
                        }
                    });
                }); });
                return [4 /*yield*/, httpClientWithInterceptors.sendRequest(request)];
            case 1:
                response = _a.sent();
                expect(changed).toBe(true);
                expect(response.status).toBe(202);
                return [2 /*return*/];
        }
    });
}); });
test('requests queue', function () { return __awaiter(_this, void 0, void 0, function () {
    var sent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, requestsQueue.queueRequest(request)];
            case 1:
                _a.sent();
                return [4 /*yield*/, requestsQueue.sendRequests()];
            case 2:
                sent = _a.sent();
                expect(sent).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test('Entity Client', function () { return __awaiter(_this, void 0, void 0, function () {
    var User, UserClient, userClient, getFromIdRequest, foundUser, user, registerRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                User = /** @class */ (function () {
                    function User() {
                    }
                    __decorate([
                        serialization_1.MappedField(),
                        __metadata("design:type", Number)
                    ], User.prototype, "id", void 0);
                    __decorate([
                        serialization_1.MappedField(),
                        __metadata("design:type", String)
                    ], User.prototype, "name", void 0);
                    return User;
                }());
                UserClient = /** @class */ (function (_super) {
                    __extends(UserClient, _super);
                    function UserClient() {
                        return _super.call(this, __1.Call.fromRequest(new __1.Request('/users'), User)) || this;
                    }
                    UserClient.prototype.getFromId = function (id, urlParam, headerParam) {
                        return this.get("/" + id);
                    };
                    UserClient.prototype.register = function (user) {
                        return this.post();
                    };
                    __decorate([
                        __1.HandledCall(),
                        __param(1, __1.UrlParam('urlParam')), __param(2, __1.Header('headerParam')),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [Number, String, String]),
                        __metadata("design:returntype", __1.Call)
                    ], UserClient.prototype, "getFromId", null);
                    __decorate([
                        __1.HandledCall(),
                        __param(0, __1.Body(User)),
                        __metadata("design:type", Function),
                        __metadata("design:paramtypes", [User]),
                        __metadata("design:returntype", __1.Call)
                    ], UserClient.prototype, "register", null);
                    return UserClient;
                }(__1.CallFactory));
                userClient = new UserClient();
                getFromIdRequest = userClient.getFromId(21, 'urlParam value', 'header value');
                expect(getFromIdRequest.classFn).toBe(User);
                expect(getFromIdRequest.request.url).toBe('/users/21');
                expect(getFromIdRequest.request.method).toBe('GET');
                expect(getFromIdRequest.request.urlParameters).toHaveProperty('urlParam', 'urlParam value');
                expect(getFromIdRequest.request.headers).toHaveProperty('headerParam', 'header value');
                return [4 /*yield*/, callHttpClient.retrieveData(getFromIdRequest)];
            case 1:
                foundUser = _a.sent();
                expect(foundUser.id).toBe(21);
                expect(foundUser.name).toBe('bob');
                user = new User();
                user.id = 22;
                user.name = 'Tom';
                registerRequest = userClient.register(user);
                expect(registerRequest.request.url).toBe('/users');
                expect(registerRequest.request.method).toBe('POST');
                expect(registerRequest.request.body.build()).toBe(JSON.stringify(user));
                return [2 /*return*/];
        }
    });
}); });
