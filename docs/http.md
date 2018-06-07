# HTTP

## Http client

```ts
const request = new Request('/api/books', {
    method: 'POST',
    host: 'myHost.net',
    body: JSON.stringify({
        author: 'Some Author',
    }),
    headers: {
        'some-token': 'xxxx-xxxx-xxxx-xxxx'
    },
    urlParameters: {
        sort: 'title'
    }
})

const response = await httpClient.sendRequest(request)
console.log(response.body)
```

## Batch requests

```ts
const responses = await batchHttpClient.sendRequests([request])
responses.forEach(response => console.log(response.body))
```

## Requests queue

Lets you queue requests that can wait (like logs, post requests in some cases...) and sends them when possible,
preferably during idle time or in a background thread. If the sending is not possible, the requests stay in queue until it becomes possible.

The queued requests can be sent in a batch request.

```ts
// queue a request
requestsQueue.queueRequest(request)

// send all queued requests
requestsQueue.sendRequests()
```

## The `Call` class

The `Call` class represents a resource that can be fetched via a request.

```ts
const userCall = Call.fromRequest<User>(User, new Request('/user/21'))
const user = await callHttpClient.retrieveData(userCall) // the result is parsed and serialized to a User instance
```

## Call factories

Call factories are a fancier way to create calls:

```ts
class User implements Entity<number> {
    @MappedField() id: number
    @MappedField() name: string
}

class UserClient extends CallFactory<User> {
    constructor() {
        // the request represents the base used for every request in this class
        super(User, new Request('/users'))
    }

    @HandledCall()
    getFromId(id: number): Call<User> {
        return this.get(`/${id}`)
    }

    @HandledCall()
    register(@Body(User) user: User): Call<User> {
        return this.post()
    }

    @HandledCall()
    someStrangeCallForDemonstration(@UrlParam('urlParam') urlParam: string, @Header('headerParam') headerParam: string): Call<User> {
        return this.get('/whatever')
    }
}

const user = new User(21, 'bob')
const registerCall = userClient.register(user)
requestsQueue.queueRequest(registerCall.request)

const foundUser = await callHttpClient.retrieveData(userClient.getFromId(40))
```

