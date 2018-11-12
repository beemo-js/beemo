export function registerQueue(requestsQueue, backgroundLoop, collectionInterval, loopId, syncServiceWorkerEnabled) {
    backgroundLoop.setTask(loopId, () => requestsQueue.sendRequests(), collectionInterval);
    if (navigator && navigator.onLine !== undefined && !syncServiceWorkerEnabled) {
        if (navigator.onLine) {
            backgroundLoop.start(this.loopId);
            document.addEventListener('offline', () => this.stopCollection());
        }
        else {
            document.addEventListener('online', () => this.startCollection());
        }
    }
    else {
        backgroundLoop.start(loopId);
    }
}
