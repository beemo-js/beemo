var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { initContainer } from '../../../framework/initContainer';
import { container } from '../../../framework/globalContainer';
import { ConfigServiceName } from '../../../framework/services';
import { FromConfig, Inject, Service } from '../annotations/annotations';
initContainer();
container.set('someBean', () => 'some value');
container.get(ConfigServiceName.ConfigurationStore).set('example.config.key', 'value from config');
let InjectedService = class InjectedService {
};
InjectedService = __decorate([
    Service()
], InjectedService);
let NamedService = class NamedService {
};
NamedService = __decorate([
    Service('randomName')
], NamedService);
let FooService = class FooService {
    constructor(injectedService, namedService, someBean, configValue, secondInjectedService) {
        this.injectedService = injectedService;
        this.namedService = namedService;
        this.someBean = someBean;
        this.configValue = configValue;
        this.secondInjectedService = secondInjectedService;
    }
};
FooService = __decorate([
    Service(),
    __param(1, Inject('randomName')),
    __param(2, Inject('someBean')),
    __param(3, FromConfig('example.config.key')),
    __param(4, Inject(InjectedService)),
    __metadata("design:paramtypes", [InjectedService,
        NamedService, String, String, Object])
], FooService);
test('di', () => {
    const fooService = container.get(FooService);
    expect(fooService).toBeInstanceOf(FooService);
    expect(fooService.injectedService).toBeInstanceOf(InjectedService);
    expect(fooService.namedService).toBeInstanceOf(NamedService);
    expect(fooService.someBean).toBe('some value');
    expect(fooService.configValue).toBe('value from config');
    expect(fooService.secondInjectedService).toBeInstanceOf(InjectedService);
});
