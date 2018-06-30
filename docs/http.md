# HTTP

This module provides tools to handle HTTP requests.

## Request and Response abstractions

Beemo provides abstractions for HTTP requests and responses.

A useful feature of requests is that they can be merged into one request.
A possible use of this feature is to define a base request with common configuration for all your requests to your API, and merge it with the actual requests to your API.

```ts
const baseRequest = new Request('/api', {
  host: 'myHost.net',
  headers: {
    'app-token': 'xxxx-xxxx-xxxx-xxxx'
  }
})

// ...

const registerUserRequest = Request.merge(baseRequest, new Request('/user', {
  method: 'POST',
  body: '...'
}))

// -> POST myHost.net/api/user
```

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

Requests can be grouped into a batch request that will be sent to the server.

```ts
const responses = await batchHttpClient.sendRequests([request])
responses.forEach(response => console.log(response.body))
```

## Requests queue

Lets you queue requests that can wait (like logs, post requests in some cases...) and sends them when possible,
preferably during idle time or in a background thread. If the sending is not possible, the requests stay in queue until it becomes possible.

The queued requests can be sent in a batch request or one by one.

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

Call factories are a fancier way to create calls.
They help gathering the different possible requests to server in one class.

It is inspired from [Retrofit](http://square.github.io/retrofit/) and [Feign](https://cloud.spring.io/spring-cloud-netflix/multi/multi_spring-cloud-feign.html).

In the following example a factory is used to create user-related requests.

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

// register a new user
const user = new User(21, 'bob')
const registerCall = userClient.register(user)
requestsQueue.queueRequest(registerCall.request)

// find the user with id 40
const foundUser = await callHttpClient.retrieveData(userClient.getFromId(40))
```
