import {RequestsQueue} from './RequestsQueue'
import {BackgroundLoop} from '../../threads'

export function registerQueue(
    requestsQueue: RequestsQueue,
    backgroundLoop: BackgroundLoop,
    collectionInterval: number,
    loopId: string,
    syncServiceWorkerEnabled: boolean
): void {
    backgroundLoop.setTask(loopId, () => requestsQueue.sendRequests(), collectionInterval)

    if (navigator && navigator.onLine !== undefined && !syncServiceWorkerEnabled) {
        if (navigator.onLine) {
            backgroundLoop.start(this.loopId)
            document.addEventListener('offline', () => this.stopCollection())
        } else {
            document.addEventListener('online', () => this.startCollection())
        }
    } else {
        backgroundLoop.start(loopId)
    }
}
