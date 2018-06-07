export class LoggingBag
{
    private logs: Object[] = []

    addLog(log: Object): void {
        this.logs.push(log)
    }

    getLogs(): Object[] {
        return this.logs.splice(0)
    }
}
