import { Request } from './abstractions/Request';
import { Response } from './abstractions/Response';
/**
 * Map of a route to a controller.
 */
export declare type route = {
    pattern: string;
    controller: (request: Request) => Response;
};
