import { RequestsQueue } from './RequestsQueue';
import { BackgroundLoop } from '../../threads/loop/BackgroundLoop';
export declare function registerQueue(requestsQueue: RequestsQueue, backgroundLoop: BackgroundLoop, collectionInterval: number, loopId: string, syncServiceWorkerEnabled: boolean): void;
