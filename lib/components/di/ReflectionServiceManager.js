"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var annotations_1 = require("./annotations/annotations");
/**
 * Handles services registration using its constructor parameters' reflected types.
 */
var ReflectionServiceManager = /** @class */ (function () {
    function ReflectionServiceManager(reflectionClassTypesStore, classAnnotationsStore, container, configurationStore) {
        this.reflectionClassTypesStore = reflectionClassTypesStore;
        this.classAnnotationsStore = classAnnotationsStore;
        this.container = container;
        this.configurationStore = configurationStore;
    }
    /**
     * Register a service to the container.
     */
    ReflectionServiceManager.prototype.registerService = function (classFn, id) {
        var _this = this;
        var serviceIdentifier = id || classFn;
        // register the annotation with service name
        this.classAnnotationsStore.addClassAnnotation(classFn, annotations_1.Service, { id: serviceIdentifier });
        // no constructor params
        if (classFn.length === 0) {
            this.container.set(serviceIdentifier, function () { return new classFn(); });
            return;
        }
        this.container.set(serviceIdentifier, function () {
            // resolve params service ids
            var dependencies = _this.reflectionClassTypesStore.getConstructorParametersTypes(classFn)
                .map(function (paramType, index) { return _this.resolveDependency(classFn, paramType, index); });
            // create instance of service
            return new (classFn.bind.apply(classFn, [void 0].concat(dependencies)))();
        });
    };
    /**
     * Registers a constructor param dependency.
     */
    ReflectionServiceManager.prototype.addConstructorParameterDependency = function (target, paramIndex, id) {
        this.classAnnotationsStore.addConstructorParameterAnnotation(target, paramIndex, annotations_1.Inject, { id: id });
    };
    /**
     * Registers a constructor param dependency defined from configuration.
     */
    ReflectionServiceManager.prototype.addConstructorParameterConfigDependency = function (target, paramIndex, key) {
        this.classAnnotationsStore.addConstructorParameterAnnotation(target, paramIndex, annotations_1.FromConfig, { key: key });
    };
    /**
     * Resolve the service id of a constructor param.
     */
    ReflectionServiceManager.prototype.resolveDependency = function (target, paramType, paramIndex) {
        // value defined in configuration
        var configAnnotations = this.classAnnotationsStore.getConstructorParameterAnnotations(target, paramIndex, annotations_1.FromConfig);
        if (configAnnotations.length > 0) {
            return this.configurationStore.get(configAnnotations[0].data['key']);
        }
        // id defined manually
        var injectAnnotations = this.classAnnotationsStore.getConstructorParameterAnnotations(target, paramIndex, annotations_1.Inject);
        if (injectAnnotations.length > 0) {
            return this.container.get(injectAnnotations[0].data['id']);
        }
        // get from arg type
        return this.container.get(paramType);
    };
    return ReflectionServiceManager;
}());
exports.ReflectionServiceManager = ReflectionServiceManager;
