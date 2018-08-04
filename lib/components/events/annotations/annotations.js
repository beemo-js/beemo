"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../../../framework");
function EventListener(eventType) {
    return function (target, propertyKey, descriptor) {
        var eventBus = framework_1.container.get(framework_1.EventsServiceName.EventBus);
        eventBus.subscribe(eventType, function (event) {
            var service = framework_1.container.get(target.constructor);
            service[propertyKey](event);
        });
    };
}
exports.EventListener = EventListener;
