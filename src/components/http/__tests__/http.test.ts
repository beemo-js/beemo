import {TestHttpClient} from '../client/TestHttpClient'
import {Request} from '../abstractions/Request'
import {BatchRequestsQueue} from '../queue/BatchRequestsQueue'
import {JsonBatchHttpClient} from '../batch/JsonBatchHttpClient'
import {MappedField} from '../../serialization/annotations/annotations'
import {Body, HandledCall, Header, UrlParam} from '../annotations/call_factory'
import {Entity} from '../../persistence/entity/Entity'
import {CallFactory} from '../factory/call/CallFactory'
import {Call} from '../call/Call'
import {initContainer} from '../../../framework/initContainer'

initContainer()

const httpClient = new TestHttpClient()
const batchRequest = new Request('/batch', {
    host: 'myHost.com'
})
const batchHttpClient = new JsonBatchHttpClient(httpClient, batchRequest)
const requestsQueue = new BatchRequestsQueue(batchHttpClient, false)

const request = new Request('/api/url', {
    host: 'myHost.net',
    body: JSON.stringify({
        a: 'b',
    }),
    headers: {
        e: 'f'
    },
    urlParameters: {
        c: 'd'
    },
    method: 'POST'
})

test('http client', async () => {
    const response = await httpClient.sendRequest(request)
    expect(JSON.parse(response.body)['url']).toBe(request.getFinalUrl())
})

// test('batch http client', async () => {
//     const responses = await batchHttpClient.sendRequests([request])
//     expect(responses).toHaveLength(1)
// })

test('requests queue', async () => {
    await requestsQueue.queueRequest(request)
    const sent = await requestsQueue.sendRequests()
    expect(sent)
})

test('Entity Client', () => {
    class User implements Entity<number> {
        @MappedField() id: number
        @MappedField() name: string
    }

    class UserClient extends CallFactory<User> {
        constructor() {
            super(User, new Request('/users'))
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

    const user = new User()
    user.id = 21
    user.name = 'Tom'

    const userClient = new UserClient()

    const getFromIdRequest = userClient.getFromId(21, 'urlParam value', 'header value')
    expect(getFromIdRequest.classFn).toBe(User)
    expect(getFromIdRequest.request.url).toBe('/users/21')
    expect(getFromIdRequest.request.method).toBe('GET')
    expect(getFromIdRequest.request.urlParameters).toHaveProperty('urlParam', 'urlParam value')
    expect(getFromIdRequest.request.headers).toHaveProperty('headerParam', 'header value')

    const registerRequest = userClient.register(user)
    expect(registerRequest.request.url).toBe('/users')
    expect(registerRequest.request.method).toBe('POST')
    expect(registerRequest.request.body).toBe(JSON.stringify(user))
})
