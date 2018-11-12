/**
 * Subscribes event listeners and dispatch events.
 */
export class EventBus {
    constructor() {
        /**
         * Store of event listeners.
         */
        this.eventListeners = new Map();
    }
    /**
     * Subscribe an event listener.
     */
    subscribe(eventType, listener) {
        if (!this.eventListeners.has(eventType)) {
            this.eventListeners.set(eventType, [listener]);
        }
        else {
            this.eventListeners.get(eventType).push(listener);
        }
    }
    /**
     * Dispatch an event.
     */
    dispatch(event) {
        this.eventListeners.get(event.constructor).forEach(listener => listener(event));
    }
}
