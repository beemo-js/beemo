import {MockHttpRequestSender} from '../client/MockHttpRequestSender'
import {Request} from '../abstractions/Request'
import {BatchRequestsQueue} from '../queue/BatchRequestsQueue'
import {MappedField} from '../../serialization/annotations/annotations'
import {Body, HandledCall, Header, UrlParam} from '../annotations/call_factory'
import {Entity} from '../../persistence/entity/Entity'
import {CallFactory} from '../factory/call/CallFactory'
import {Call} from '../call/Call'
import {initContainer} from '../../../framework/initContainer'
import {MockServer} from '../server/MockServer'
import {CallHttpClient} from '../call/CallHttpClient'
import {container} from '../../../framework/globalContainer'
import {JsonEncoder} from '../../serialization/encoders/JsonEncoder'
import {SerializationServiceName} from '../../../framework/services'
import {ResponseBuilder} from '../abstractions/ResponseBuilder'
import {RequestBuilder} from '../abstractions/RequestBuilder'
import {circuitBreakerInterceptor, HttpClient, retryInterceptor, timeoutInterceptor} from '..'

initContainer()

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
            }

            const user = users[request.url.split('/').pop()]
            return user ?
                new ResponseBuilder().status(200).body(JSON.stringify(user)).build():
                new ResponseBuilder().status(404).build()
        }
    }
], 50)

const httpRequestSender = new MockHttpRequestSender(
    mockServer,
    new Request('https://myDomain.com/api/')
)

const httpClient = new HttpClient(httpRequestSender)
httpClient.useInterceptor(circuitBreakerInterceptor())
httpClient.useInterceptor(retryInterceptor())
httpClient.useInterceptor(timeoutInterceptor(500))

const requestsQueue = new BatchRequestsQueue(httpClient, false)
const callHttpClient = new CallHttpClient(httpClient, new JsonEncoder(), container.get(SerializationServiceName.Normalizer))

const request = new RequestBuilder()
    .url('/users/21')
    .body({ a: 'b' })
    .headers({ e: 'f' })
    .urlParameters({ c: 'd' })
    .build()

test('http client', async () => {
    const response = await httpClient.sendRequest(request)
    expect(response.body.json()['name']).toBe('bob')
})

test('multiple requests', async () => {
    const responses = await httpClient.sendRequests([request, request])
    expect(responses[0].body.json()['name']).toBe('bob')
    expect(responses[1].body.json()['name']).toBe('bob')
})

test('interceptors', async () => {
    const httpClientWithInterceptors = new HttpClient(httpRequestSender)
    let changed = false
    httpClientWithInterceptors.useInterceptor(async (next, request) => {
        changed = true
        const response = await next(request)
        response.status = 202
        return response
    })

    const response = await httpClientWithInterceptors.sendRequest(request)
    expect(changed).toBe(true)
    expect(response.status).toBe(202)
})

test('requests queue', async () => {
    await requestsQueue.queueRequest(request)
    const sent = await requestsQueue.sendRequests()
    expect(sent).toBe(true)
})

test('Entity Client', async () => {
    class User implements Entity<number> {
        @MappedField() id: number
        @MappedField() name: string
    }

    class UserClient extends CallFactory {
        constructor() {
            super(Call.fromRequest(new Request('/users'), User))
        }

        @HandledCall()
        getFromId(id: number, @UrlParam('urlParam') urlParam: string, @Header('headerParam') headerParam: string): Call<User> {
            return this.get(`/${id}`)
        }

        @HandledCall()
        register(@Body(User) user: User): Call<User> {
            return this.post()
        }
    }

    const userClient = new UserClient()

    const getFromIdRequest = userClient.getFromId(21, 'urlParam value', 'header value')
    expect(getFromIdRequest.classFn).toBe(User)
    expect(getFromIdRequest.request.url).toBe('/users/21')
    expect(getFromIdRequest.request.method).toBe('GET')
    expect(getFromIdRequest.request.urlParameters).toHaveProperty('urlParam', 'urlParam value')
    expect(getFromIdRequest.request.headers).toHaveProperty('headerParam', 'header value')

    const foundUser: User = await callHttpClient.retrieveData(getFromIdRequest)
    expect(foundUser.id).toBe(21)
    expect(foundUser.name).toBe('bob')

    const user = new User()
    user.id = 22
    user.name = 'Tom'

    const registerRequest = userClient.register(user)
    expect(registerRequest.request.url).toBe('/users')
    expect(registerRequest.request.method).toBe('POST')
    expect(registerRequest.request.body.build()).toBe(JSON.stringify(user))
})
