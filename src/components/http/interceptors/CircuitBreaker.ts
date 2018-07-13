export class CircuitBreaker {
    private state: 'CLOSED' | 'OPEN' | 'HALF-OPEN' = 'CLOSED'
    private nbSuccess: number = 0
    private nbFailures: number = 0
    private timeoutId: number

    constructor(
        public failuresThreshold: number,
        public successThreshold: number,
        public openStateTimeout: number
    ) {}

    attempt(fn: Function): any {
        switch (this.state) {
            case 'CLOSED':
                try {
                    const result = fn()
                    this.nbFailures = 0
                    return result
                } catch (e) {
                    this.nbFailures++
                    if (this.nbFailures >= this.failuresThreshold) {
                        this.open()
                    }
                    throw e
                }
            case 'OPEN':
                throw 'Circuit breaker open.'
            case 'HALF-OPEN':
                try {
                    const result = fn()
                    this.nbSuccess++
                    if (this.nbSuccess >= this.successThreshold) {
                        this.close()
                    }
                    return result
                } catch (e) {
                    this.open()
                    throw e
                }
        }
    }

    close(): void {
        this.state = 'CLOSED'
        this.reinit()
    }

    halfOpen(): void {
        this.state = 'HALF-OPEN'
        this.reinit()
    }

    open(): void {
        this.state = 'OPEN'
        this.reinit()
        this.timeoutId = setTimeout(() => this.halfOpen(), this.openStateTimeout)
    }

    private reinit() {
        if (!!this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
        this.nbSuccess = 0
        this.nbFailures = 0
    }
}
