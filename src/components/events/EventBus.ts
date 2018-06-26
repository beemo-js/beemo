import {Event} from './Event'

/**
 * Subscribes event listeners and dispatch events.
 */
export class EventBus {
    /**
     * Store of event listeners.
     */
    private eventListeners = new Map<Function, Function[]>()

    /**
     * Subscribe an event listener.
     */
    subscribe<T extends Event>(eventType: Function, listener: (event: T) => void): void {
        if (!this.eventListeners.has(eventType)) {
            this.eventListeners.set(eventType, [listener])
        } else {
            this.eventListeners.get(eventType).push(listener)
        }
    }

    /**
     * Dispatch an event.
     */
    dispatch(event: Event): void {
        this.eventListeners.get(event.constructor).forEach(listener => listener(event))
    }
}