import {LoggingBag} from '../LoggingBag'
import {LogsOrchestrator} from './LogsOrchestrator'

export class LogsOrchestrationWorker {
    private intervalId: number

    constructor(
        private loggingBag: LoggingBag,
        private logsOrchestrator: LogsOrchestrator,
        private collectionInterval: number
    ) {}

    start(): void {
        // First stop to avoid having multiple intervals
        this.stop()

        this.intervalId = setInterval(() => {
            this.logsOrchestrator.handleLogs(this.loggingBag.getLogs())
        }, this.collectionInterval)
    }

    stop(): void {
        if (!!this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }
}