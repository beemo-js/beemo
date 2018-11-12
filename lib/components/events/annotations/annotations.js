import { container } from '../../../framework/globalContainer';
import { EventsServiceName } from '../../../framework/services';
export function EventListener(eventType) {
    return (target, propertyKey, descriptor) => {
        const eventBus = container.get(EventsServiceName.EventBus);
        eventBus.subscribe(eventType, event => {
            const service = container.get(target.constructor);
            service[propertyKey](event);
        });
    };
}
