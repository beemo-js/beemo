import {Container} from './Container'
import {ClassAnnotationsStore} from '../annotations'
import {ReflectionClassTypesStore, primitiveTypes} from '../types'
import {ConfigurationStore} from '../config'
import {FromConfig, Inject, Service} from './annotations/annotations'

/**
 * Handles services registration using its constructor parameters' reflected types.
 */
export class ReflectionServiceManager {

    constructor(
        private reflectionClassTypesStore: ReflectionClassTypesStore,
        private classAnnotationsStore: ClassAnnotationsStore,
        private container: Container,
        private configurationStore: ConfigurationStore
    ) {}

    /**
     * Register a service to the container.
     */
    registerService(classFn: any, id?: string): void {
        const serviceIdentifier: string|Function = id || classFn

        // register the annotation with service name
        this.classAnnotationsStore.addClassAnnotation(classFn, Service, { id: serviceIdentifier })

        // no constructor params
        if (classFn.length === 0) {
            this.container.set(serviceIdentifier, () => new classFn())
            return
        }

        this.container.set(serviceIdentifier, () => {
            // resolve params service ids
            const dependencies = this.reflectionClassTypesStore.getConstructorParametersTypes(classFn)
                .map((paramType, index) => this.resolveDependency(classFn, paramType, index))

            // create instance of service
            return new classFn(...dependencies)
        })
    }

    /**
     * Registers a constructor param dependency.
     */
    addConstructorParameterDependency(target: any, paramIndex: number, id: string|Function): void {
        this.classAnnotationsStore.addConstructorParameterAnnotation(target, paramIndex, Inject, { id })
    }

    /**
     * Registers a constructor param dependency defined from configuration.
     */
    addConstructorParameterConfigDependency(target: any, paramIndex: number, key: string): void {
        this.classAnnotationsStore.addConstructorParameterAnnotation(target, paramIndex, FromConfig, { key })
    }

    /**
     * Resolve the service id of a constructor param.
     */
    private resolveDependency(target: any, paramType: Function, paramIndex: number): string {
        // value defined in configuration
        const configAnnotations = this.classAnnotationsStore.getConstructorParameterAnnotations(target, paramIndex, FromConfig)
        if (configAnnotations.length > 0) {
            return this.configurationStore.get(configAnnotations[0].data['key'])
        }

        // id defined manually
        const injectAnnotations = this.classAnnotationsStore.getConstructorParameterAnnotations(target, paramIndex, Inject)
        if (injectAnnotations.length > 0) {
            return this.container.get(injectAnnotations[0].data['id'])
        }

        // basic type without manual definition
        if (primitiveTypes.indexOf(paramType) !== -1) {
            throw `No definition exists in DI container for param #${paramIndex} of class ${target} constructor`
        }

        // get from arg type
        return this.container.get(paramType)
    }
}
