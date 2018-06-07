import {TestHttpClient} from './client/TestHttpClient'
import {JsonBatchHttpClient} from './batch/JsonBatchHttpClient'
import {Request} from './abstractions/Request'
import {BatchRequestsQueue} from './queue/BatchRequestsQueue'
import {CallFactory} from './factory/call/CallFactory'
import {Entity} from '../persistence/entity/Entity'
import {Call} from './call/Call'
import {Body, HandledCall, Header, UrlParam} from './annotations/call_factory'
import {MappedField} from '../serialization/annotations/annotations'
import {initContainer} from '../framework/initContainer'

initContainer()

const httpClient = new TestHttpClient()
const batchRequest = new Request('/batch', {
    host: 'myHost.com'
})
const batchHttpClient = new JsonBatchHttpClient(httpClient, batchRequest)
const requestsQueue = new BatchRequestsQueue(batchHttpClient, false)

// Http Client

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

httpClient.sendRequest(request).then(response => console.log(response))

// Batch Http Client

setTimeout(() => {
    console.log("\nBatch\n")
    batchHttpClient.sendRequests([request])
        .then(responses => console.log('Received responses:', responses))
        .catch(e => console.log('Response not retrieved'))
}, 500)

// Requests queue

setTimeout(() => {
    console.log("\nQueue\n")
    requestsQueue.queueRequest(request)
    requestsQueue.sendRequests().then(sent => console.log(sent))
}, 1000)

// Entity client

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
console.log('CALL:', userClient.getFromId(21, 'urlParam value', 'header value'))
console.log('CALL:', userClient.register(user))
