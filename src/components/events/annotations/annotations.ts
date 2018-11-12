import {EventBus} from '../EventBus'
import {container} from '../../../framework/globalContainer'
import {EventsServiceName} from '../../../framework/services'

export function EventListener(eventType: Function): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const eventBus = container.get<EventBus>(EventsServiceName.EventBus)
        eventBus.subscribe(eventType, event => {
            const service = container.get(target.constructor)
            service[propertyKey](event)
        })
    }
}