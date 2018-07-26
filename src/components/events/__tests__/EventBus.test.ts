import {EventBus} from '../EventBus'
import {Event} from '../Event'
import {Service} from '../../di'
import {container, EventsServiceName, initContainer} from '../../../framework'
import {EventListener} from '..'

initContainer()

class FooEvent implements Event {
    constructor(
        public incr: number
    ) {}
}

const eventBus = container.get<EventBus>(EventsServiceName.EventBus)

test('Event Bus', () => {
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

test('Event listener annotation', () => {
    let i = 1

    @Service()
    class FooListener {
        @EventListener(FooEvent)
        onFoo(event: FooEvent): void {
            i += event.incr
        }
    }

    eventBus.dispatch(new FooEvent(2))
    expect(i).toBe(3)
})
