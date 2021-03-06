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
import { initContainer } from '../../../framework/initContainer';
import { MockServer } from '../server/MockServer';
import { ResponseBuilder } from '../abstractions/ResponseBuilder';
import { MockHttpRequestSender } from '../client/MockHttpRequestSender';
import { HttpClient } from '../client/HttpClient';
import { circuitBreakerInterceptor, retryInterceptor, timeoutInterceptor } from '../interceptors/interceptors';
import { BatchRequestsQueue } from '../queue/BatchRequestsQueue';
import { CallHttpClient } from '../call/CallHttpClient';
import { JsonEncoder } from '../../serialization/encoders/JsonEncoder';
import { container } from '../../../framework/globalContainer';
import { SerializationServiceName } from '../../../framework/services';
import { RequestBuilder } from '../abstractions/RequestBuilder';
import { MappedField } from '../../serialization/annotations/annotations';
import { CallFactory } from '../factory/call/CallFactory';
import { Call } from '../call/Call';
import { Body, HandledCall, Header, UrlParam } from '../annotations/call_factory';
import { Request } from '../abstractions/Request';
initContainer();
// Mock server
const mockServer = new MockServer([
    {
        pattern: 'https://myDomain.com/api/users/[0-9]+',
        controller: request => {
            const users = {
                21: {
                    id: 21,
                    name: 'bob'
                }
            };
            const user = users[request.url.split('/').pop()];
            return user ?
                new ResponseBuilder().status(200).body(JSON.stringify(user)).build() :
                new ResponseBuilder().status(404).build();
        }
    }
], 50);
const httpRequestSender = new MockHttpRequestSender(mockServer, new Request('https://myDomain.com/api/'));
const httpClient = new HttpClient(httpRequestSender);
httpClient.useInterceptor(circuitBreakerInterceptor());
httpClient.useInterceptor(retryInterceptor());
httpClient.useInterceptor(timeoutInterceptor(500));
const requestsQueue = new BatchRequestsQueue(httpClient, false);
const callHttpClient = new CallHttpClient(httpClient, new JsonEncoder(), container.get(SerializationServiceName.Normalizer));
const request = new RequestBuilder()
    .url('/users/21')
    .body({ a: 'b' })
    .headers({ e: 'f' })
    .urlParameters({ c: 'd' })
    .build();
test('http client', () => __awaiter(this, void 0, void 0, function* () {
    const response = yield httpClient.sendRequest(request);
    expect(response.body.json()['name']).toBe('bob');
}));
test('multiple requests', () => __awaiter(this, void 0, void 0, function* () {
    const responses = yield httpClient.sendRequests([request, request]);
    expect(responses[0].body.json()['name']).toBe('bob');
    expect(responses[1].body.json()['name']).toBe('bob');
}));
test('interceptors', () => __awaiter(this, void 0, void 0, function* () {
    const httpClientWithInterceptors = new HttpClient(httpRequestSender);
    let changed = false;
    httpClientWithInterceptors.useInterceptor((next, request) => __awaiter(this, void 0, void 0, function* () {
        changed = true;
        const response = yield next(request);
        response.status = 202;
        return response;
    }));
    const response = yield httpClientWithInterceptors.sendRequest(request);
    expect(changed).toBe(true);
    expect(response.status).toBe(202);
}));
test('requests queue', () => __awaiter(this, void 0, void 0, function* () {
    yield requestsQueue.queueRequest(request);
    const sent = yield requestsQueue.sendRequests();
    expect(sent).toBe(true);
}));
test('Entity Client', () => __awaiter(this, void 0, void 0, function* () {
    class User {
    }
    __decorate([
        MappedField(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        MappedField(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    class UserClient extends CallFactory {
        constructor() {
            super(Call.fromRequest(new Request('/users'), User));
        }
        getFromId(id, urlParam, headerParam) {
            return this.get(`/${id}`);
        }
        register(user) {
            return this.post();
        }
    }
    __decorate([
        HandledCall(),
        __param(1, UrlParam('urlParam')), __param(2, Header('headerParam')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String, String]),
        __metadata("design:returntype", Call)
    ], UserClient.prototype, "getFromId", null);
    __decorate([
        HandledCall(),
        __param(0, Body(User)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User]),
        __metadata("design:returntype", Call)
    ], UserClient.prototype, "register", null);
    const userClient = new UserClient();
    const getFromIdRequest = userClient.getFromId(21, 'urlParam value', 'header value');
    expect(getFromIdRequest.classFn).toBe(User);
    expect(getFromIdRequest.request.url).toBe('/users/21');
    expect(getFromIdRequest.request.method).toBe('GET');
    expect(getFromIdRequest.request.urlParameters).toHaveProperty('urlParam', 'urlParam value');
    expect(getFromIdRequest.request.headers).toHaveProperty('headerParam', 'header value');
    const foundUser = yield callHttpClient.retrieveData(getFromIdRequest);
    expect(foundUser.id).toBe(21);
    expect(foundUser.name).toBe('bob');
    const user = new User();
    user.id = 22;
    user.name = 'Tom';
    const registerRequest = userClient.register(user);
    expect(registerRequest.request.url).toBe('/users');
    expect(registerRequest.request.method).toBe('POST');
    expect(registerRequest.request.body.build()).toBe(JSON.stringify(user));
}));
