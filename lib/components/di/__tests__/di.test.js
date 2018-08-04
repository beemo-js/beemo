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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var framework_1 = require("../../../framework");
framework_1.initContainer();
framework_1.container.set('someBean', function () { return 'some value'; });
framework_1.container.get(framework_1.ConfigServiceName.ConfigurationStore).set('example.config.key', 'value from config');
var InjectedService = /** @class */ (function () {
    function InjectedService() {
    }
    InjectedService = __decorate([
        __1.Service()
    ], InjectedService);
    return InjectedService;
}());
var NamedService = /** @class */ (function () {
    function NamedService() {
    }
    NamedService = __decorate([
        __1.Service('randomName')
    ], NamedService);
    return NamedService;
}());
var FooService = /** @class */ (function () {
    function FooService(injectedService, namedService, someBean, configValue, secondInjectedService) {
        this.injectedService = injectedService;
        this.namedService = namedService;
        this.someBean = someBean;
        this.configValue = configValue;
        this.secondInjectedService = secondInjectedService;
    }
    FooService = __decorate([
        __1.Service(),
        __param(1, __1.Inject('randomName')),
        __param(2, __1.Inject('someBean')),
        __param(3, __1.FromConfig('example.config.key')),
        __param(4, __1.Inject(InjectedService)),
        __metadata("design:paramtypes", [InjectedService,
            NamedService, String, String, Object])
    ], FooService);
    return FooService;
}());
test('di', function () {
    var fooService = framework_1.container.get(FooService);
    expect(fooService).toBeInstanceOf(FooService);
    expect(fooService.injectedService).toBeInstanceOf(InjectedService);
    expect(fooService.namedService).toBeInstanceOf(NamedService);
    expect(fooService.someBean).toBe('some value');
    expect(fooService.configValue).toBe('value from config');
    expect(fooService.secondInjectedService).toBeInstanceOf(InjectedService);
});
