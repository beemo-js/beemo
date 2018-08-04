/**
 * Declares annotated class as a service (i.e. registers it in services container).
 * @param id Name of the service; if not provided it will be accessed via its constructor.
 */
export declare function Service(id?: string): ClassDecorator;
/**
 * Registers a constructor param dependency.
 */
export declare function Inject(id: string | Function): ParameterDecorator;
/**
 * Registers a constructor param value configuration key.
 * The value will be retrieved from configuration.
 */
export declare function FromConfig(key: string): ParameterDecorator;
