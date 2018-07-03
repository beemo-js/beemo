import {MockHttpClient} from '../client/MockHttpClient'
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
import {NoBatchHttpClient} from '..'

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
])

// mockServer.routes.push({
//     pattern: 'https://myDomain.com/api/batch',
//     controller: request => {
//         const requests = request.body.objectData['requests'] as {method: string, url: string, headers: {[key: string]: string}, body: string}[]
//         const responses = requests.map(req => mockServer.request(
//             new RequestBuilder()
//                 .url(req.url)
//                 .method(req.method)
//                 .headers(req.headers)
//                 .body(req.body)
//                 .build()
//         ))
//
//         return new ResponseBuilder().status(200).body(JSON.stringify({ responses })).build()
//     }
// })

const httpClient = new MockHttpClient(
    mockServer,
    new Request('https://myDomain.com/api/')
)

const batchHttpClient = new NoBatchHttpClient(httpClient)
const requestsQueue = new BatchRequestsQueue(batchHttpClient, false)
const callHttpClient = new CallHttpClient(httpClient, batchHttpClient, new JsonEncoder(), container.get(SerializationServiceName.Normalizer))

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

// test('batch http client', async () => {
//     const responses = await batchHttpClient.sendRequests([request, request])
//     expect(responses).toHaveLength(2)
// })

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
    expect(registerRequest.request.body.build()).toBe(JSON.stringify(user))
})
