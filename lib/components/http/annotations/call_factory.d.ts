/**
 * Fills the call returned from method with data in parameters.
 */
export declare function HandledCall(): MethodDecorator;
/**
 * Maps given parameter to call request's body.
 *
 * @param classFn class to refer to when serializing the parameter.
 */
export declare function Body(classFn: Function): ParameterDecorator;
/**
 * Maps given parameter to call request's url parameters.
 */
export declare function UrlParam(name: string): ParameterDecorator;
/**
 * Maps given parameter to call request's headers.
 */
export declare function Header(name: string): ParameterDecorator;
