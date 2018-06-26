import {Request} from '../abstractions/Request'

/**
 * Requests queue; requests are pushed in it, waiting to be sent by a worker.
 */
export interface RequestsQueue {
    /**
     * Queue request.
     */
    queueRequest(request: Request): void

    /**
     * Queue request and send everything.
     */
    queueAndSend(request: Request): Promise<boolean>

    /**
     * Returns true if requests could be sent immediately.
     */
    sendRequests(): Promise<boolean>
}
