var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { initContainer } from '../../../framework/initContainer';
import { container } from '../../../framework/globalContainer';
import { EventsServiceName } from '../../../framework/services';
import { Service } from '../../di/annotations/annotations';
import { EventListener } from '../annotations/annotations';
initContainer();
class FooEvent {
    constructor(incr) {
        this.incr = incr;
    }
}
const eventBus = container.get(EventsServiceName.EventBus);
test('Event Bus', () => {
    let first = 0;
    eventBus.subscribe(FooEvent, event => first += event.incr);
    let second = 0;
    eventBus.subscribe(FooEvent, event => second += event.incr);
    eventBus.dispatch(new FooEvent(1));
    expect(first).toBe(1);
    expect(second).toBe(1);
    eventBus.dispatch(new FooEvent(2));
    expect(first).toBe(3);
    expect(second).toBe(3);
});
test('Event listener annotation', () => {
    let i = 1;
    let FooListener = class FooListener {
        onFoo(event) {
            i += event.incr;
        }
    };
    __decorate([
        EventListener(FooEvent),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [FooEvent]),
        __metadata("design:returntype", void 0)
    ], FooListener.prototype, "onFoo", null);
    FooListener = __decorate([
        Service()
    ], FooListener);
    eventBus.dispatch(new FooEvent(2));
    expect(i).toBe(3);
});
