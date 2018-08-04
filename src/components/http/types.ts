import {Request} from './abstractions/Request'
import {Response} from './abstractions/Response'

/**
 * Map of a route to a controller.
 */
export type route  = {
    // regex to match url
    pattern: string,
    // returns response from request
    controller: (request: Request) => Response
}