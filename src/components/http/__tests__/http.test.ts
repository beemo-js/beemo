import {MockHttpClient} from '../client/MockHttpClient'
import {Request} from '../abstractions/Request'
import {BatchRequestsQueue} from '../queue/BatchRequestsQueue'
import {JsonBatchHttpClient} from '../batch/JsonBatchHttpClient'
import {MappedField} from '../../serialization/annotations/annotations'
import {Body, HandledCall, Header, UrlParam} from '../annotations/call_factory'
import {Entity} from '../../persistence/entity/Entity'
import {CallFactory} from '../factory/call/CallFactory'
import {Call} from '../call/Call'
import {initContainer} from '../../../framework/initContainer'
import {Response} from '../abstractions/Response'
import {MockServer} from '../server/MockServer'
import {CallHttpClient} from '../call/CallHttpClient'
import {container} from '../../../framework/globalContainer'
import {JsonEncoder} from '../../serialization/encoders/JsonEncoder'
import {SerializationServiceName} from '../../../framework/services'

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
                new Response(200, JSON.stringify(user)):
                new Response(404, JSON.stringify({}))
        }
    }
])

mockServer.routes.push({
    pattern: 'https://myDomain.com/api/batch',
    controller: request => {
        const requests = JSON.parse(request.body) as {method: string, url: string, headers: {[key: string]: string}, body: string}[]
        const responses = requests.map(req => mockServer.request(new Request(req.url, {
            method: req.method,
            headers: req.headers,
            body: req.body
        })))

        return new Response(200, JSON.stringify(responses))
    }
})

const httpClient = new MockHttpClient(
    mockServer,
    new Request('https://myDomain.com/api/')
)

const batchHttpClient = new JsonBatchHttpClient(httpClient, new Request('/batch'))
const requestsQueue = new BatchRequestsQueue(batchHttpClient, false)
const callHttpClient = new CallHttpClient(httpClient, batchHttpClient, new JsonEncoder(), container.get(SerializationServiceName.Normalizer))

const request = new Request('/users/21', {
    body: JSON.stringify({
        a: 'b',
    }),
    headers: {
        e: 'f'
    },
    urlParameters: {
        c: 'd'
    },
})

test('http client', async () => {
    const response = await httpClient.sendRequest(request)
    expect(JSON.parse(response.body)['name']).toBe('bob')
})

test('batch http client', async () => {
    const responses = await batchHttpClient.sendRequests([request, request])
    expect(responses).toHaveLength(2)
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
    expect(registerRequest.request.body).toBe(JSON.stringify(user))
})
