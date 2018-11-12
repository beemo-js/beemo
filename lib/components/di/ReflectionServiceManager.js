import { FromConfig, Inject, Service } from './annotations/annotations';
/**
 * Handles services registration using its constructor parameters' reflected types.
 */
export class ReflectionServiceManager {
    constructor(reflectionClassTypesStore, classAnnotationsStore, container, configurationStore) {
        this.reflectionClassTypesStore = reflectionClassTypesStore;
        this.classAnnotationsStore = classAnnotationsStore;
        this.container = container;
        this.configurationStore = configurationStore;
    }
    /**
     * Register a service to the container.
     */
    registerService(classFn, id) {
        const serviceIdentifier = id || classFn;
        // register the annotation with service name
        this.classAnnotationsStore.addClassAnnotation(classFn, Service, { id: serviceIdentifier });
        // no constructor params
        if (classFn.length === 0) {
            this.container.set(serviceIdentifier, () => new classFn());
            return;
        }
        this.container.set(serviceIdentifier, () => {
            // resolve params service ids
            const dependencies = this.reflectionClassTypesStore.getConstructorParametersTypes(classFn)
                .map((paramType, index) => this.resolveDependency(classFn, paramType, index));
            // create instance of service
            return new classFn(...dependencies);
        });
    }
    /**
     * Registers a constructor param dependency.
     */
    addConstructorParameterDependency(target, paramIndex, id) {
        this.classAnnotationsStore.addConstructorParameterAnnotation(target, paramIndex, Inject, { id });
    }
    /**
     * Registers a constructor param dependency defined from configuration.
     */
    addConstructorParameterConfigDependency(target, paramIndex, key) {
        this.classAnnotationsStore.addConstructorParameterAnnotation(target, paramIndex, FromConfig, { key });
    }
    /**
     * Resolve the service id of a constructor param.
     */
    resolveDependency(target, paramType, paramIndex) {
        // value defined in configuration
        const configAnnotations = this.classAnnotationsStore.getConstructorParameterAnnotations(target, paramIndex, FromConfig);
        if (configAnnotations.length > 0) {
            return this.configurationStore.get(configAnnotations[0].data['key']);
        }
        // id defined manually
        const injectAnnotations = this.classAnnotationsStore.getConstructorParameterAnnotations(target, paramIndex, Inject);
        if (injectAnnotations.length > 0) {
            return this.container.get(injectAnnotations[0].data['id']);
        }
        // get from arg type
        return this.container.get(paramType);
    }
}
