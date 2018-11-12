import { RequestsQueue } from './RequestsQueue';
import { Request } from '../abstractions/Request';
import { HttpClient } from '../client/HttpClient';
/**
 * Sends queued requests when network is available in parallel.
 */
export declare class BatchRequestsQueue implements RequestsQueue {
    private httpClient;
    private syncServiceWorkerEnabled;
    private requests;
    constructor(httpClient: HttpClient, syncServiceWorkerEnabled: boolean);
    queueRequest(request: Request): void;
    queueAndSend(request: Request): Promise<boolean>;
    send(request: Request): Promise<boolean>;
    sendRequests(): Promise<boolean>;
}
