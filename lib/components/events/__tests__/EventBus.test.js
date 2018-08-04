"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var di_1 = require("../../di");
var framework_1 = require("../../../framework");
var __1 = require("..");
framework_1.initContainer();
var FooEvent = /** @class */ (function () {
    function FooEvent(incr) {
        this.incr = incr;
    }
    return FooEvent;
}());
var eventBus = framework_1.container.get(framework_1.EventsServiceName.EventBus);
test('Event Bus', function () {
    var first = 0;
    eventBus.subscribe(FooEvent, function (event) { return first += event.incr; });
    var second = 0;
    eventBus.subscribe(FooEvent, function (event) { return second += event.incr; });
    eventBus.dispatch(new FooEvent(1));
    expect(first).toBe(1);
    expect(second).toBe(1);
    eventBus.dispatch(new FooEvent(2));
    expect(first).toBe(3);
    expect(second).toBe(3);
});
test('Event listener annotation', function () {
    var i = 1;
    var FooListener = /** @class */ (function () {
        function FooListener() {
        }
        FooListener.prototype.onFoo = function (event) {
            i += event.incr;
        };
        __decorate([
            __1.EventListener(FooEvent),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [FooEvent]),
            __metadata("design:returntype", void 0)
        ], FooListener.prototype, "onFoo", null);
        FooListener = __decorate([
            di_1.Service()
        ], FooListener);
        return FooListener;
    }());
    eventBus.dispatch(new FooEvent(2));
    expect(i).toBe(3);
});
