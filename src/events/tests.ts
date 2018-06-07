import {EventBus} from './EventBus'
import {Event} from './Event'

class FooEvent implements Event {
    constructor(
        public foo: string,
        public bar: number
    ) {}
}

const eventBus = new EventBus()
eventBus.subscribe<FooEvent>(FooEvent, event => console.log(event.foo))
eventBus.subscribe<FooEvent>(FooEvent, event => console.log(event.bar))
eventBus.dispatch(new FooEvent('first', 2))
eventBus.dispatch(new FooEvent('third', 4))
