import {Event} from './Event'

export class EventBus {
    private eventListeners = new Map<Function, Function[]>()

    subscribe<T extends Event>(eventType: Function, listener: (event: T) => void): void {
        if (!this.eventListeners.has(eventType)) {
            this.eventListeners.set(eventType, [listener])
        } else {
            this.eventListeners.get(eventType).push(listener)
        }
    }

    dispatch(event: Event): void {
        this.eventListeners.get(event.constructor).forEach(listener => listener(event))
    }
}