import {EventBus} from '../EventBus'
import {Event} from '../Event'

class FooEvent implements Event {
    constructor(
        public incr: number
    ) {}
}

test('Event Bus', () => {
    const eventBus = new EventBus()

    let first = 0
    eventBus.subscribe<FooEvent>(FooEvent, event => first += event.incr)

    let second = 0
    eventBus.subscribe<FooEvent>(FooEvent, event => second += event.incr)

    eventBus.dispatch(new FooEvent(1))
    expect(first).toBe(1)
    expect(second).toBe(1)

    eventBus.dispatch(new FooEvent(2))
    expect(first).toBe(3)
    expect(second).toBe(3)
})
