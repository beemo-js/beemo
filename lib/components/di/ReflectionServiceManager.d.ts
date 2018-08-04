import { Container } from './Container';
import { ClassAnnotationsStore } from '../annotations';
import { ReflectionClassTypesStore } from '../types';
import { ConfigurationStore } from '../config';
/**
 * Handles services registration using its constructor parameters' reflected types.
 */
export declare class ReflectionServiceManager {
    private reflectionClassTypesStore;
    private classAnnotationsStore;
    private container;
    private configurationStore;
    constructor(reflectionClassTypesStore: ReflectionClassTypesStore, classAnnotationsStore: ClassAnnotationsStore, container: Container, configurationStore: ConfigurationStore);
    /**
     * Register a service to the container.
     */
    registerService(classFn: any, id?: string): void;
    /**
     * Registers a constructor param dependency.
     */
    addConstructorParameterDependency(target: any, paramIndex: number, id: string | Function): void;
    /**
     * Registers a constructor param dependency defined from configuration.
     */
    addConstructorParameterConfigDependency(target: any, paramIndex: number, key: string): void;
    /**
     * Resolve the service id of a constructor param.
     */
    private resolveDependency(target, paramType, paramIndex);
}
