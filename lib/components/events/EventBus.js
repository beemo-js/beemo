"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Subscribes event listeners and dispatch events.
 */
var EventBus = /** @class */ (function () {
    function EventBus() {
        /**
         * Store of event listeners.
         */
        this.eventListeners = new Map();
    }
    /**
     * Subscribe an event listener.
     */
    EventBus.prototype.subscribe = function (eventType, listener) {
        if (!this.eventListeners.has(eventType)) {
            this.eventListeners.set(eventType, [listener]);
        }
        else {
            this.eventListeners.get(eventType).push(listener);
        }
    };
    /**
     * Dispatch an event.
     */
    EventBus.prototype.dispatch = function (event) {
        this.eventListeners.get(event.constructor).forEach(function (listener) { return listener(event); });
    };
    return EventBus;
}());
exports.EventBus = EventBus;
