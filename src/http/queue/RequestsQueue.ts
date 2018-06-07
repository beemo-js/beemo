import {Request} from '../abstractions/Request'

export interface RequestsQueue {
    queueRequest(request: Request): void
    queueAndSend(request: Request): Promise<boolean>
    sendRequests(): Promise<boolean>
}
