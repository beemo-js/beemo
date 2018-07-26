import {container, EventsServiceName} from '../../../framework'
import {EventBus} from '../EventBus'

export function EventListener(eventType: Function): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const eventBus = container.get<EventBus>(EventsServiceName.EventBus)
        eventBus.subscribe(eventType, event => {
            const service = container.get(target.constructor)
            service[propertyKey](event)
        })
    }
}