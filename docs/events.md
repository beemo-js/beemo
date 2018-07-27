# Events

This module provides a simple way to structure your code around events, using an event bus.

## Event bus

First declare event types:

```ts
class FooEvent implements Event {
    constructor(
        public foo: string,
        public bar: number
    ) {}
}
```

Then subscribe event listeners:

```ts
eventBus.subscribe<FooEvent>(FooEvent, event => console.log(event.foo))
```

Then dispatch events:

```ts
eventBus.dispatch(new FooEvent('first', 2))
eventBus.dispatch(new FooEvent('third', 4))
```

## Event listener annotations

You can register listeners by using the `@EventListener` annotation on services:

```ts
@Service()
class FooListener {

  @EventListener(FooEvent)
  onFoo(event: FooEvent): void {
    console.log(event.foo)
  }
}
```
