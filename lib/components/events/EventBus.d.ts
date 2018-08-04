import { Event } from './Event';
/**
 * Subscribes event listeners and dispatch events.
 */
export declare class EventBus {
    /**
     * Store of event listeners.
     */
    private eventListeners;
    /**
     * Subscribe an event listener.
     */
    subscribe<T extends Event>(eventType: Function, listener: (event: T) => void): void;
    /**
     * Dispatch an event.
     */
    dispatch(event: Event): void;
}
