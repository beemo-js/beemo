export class CircuitBreaker {
    constructor(failuresThreshold, successThreshold, openStateTimeout) {
        this.failuresThreshold = failuresThreshold;
        this.successThreshold = successThreshold;
        this.openStateTimeout = openStateTimeout;
        this.state = 'CLOSED';
        this.nbSuccess = 0;
        this.nbFailures = 0;
    }
    attempt(fn) {
        switch (this.state) {
            case 'CLOSED':
                try {
                    const result = fn();
                    this.nbFailures = 0;
                    return result;
                }
                catch (e) {
                    this.nbFailures++;
                    if (this.nbFailures >= this.failuresThreshold) {
                        this.open();
                    }
                    throw e;
                }
            case 'OPEN':
                throw 'Circuit breaker open.';
            case 'HALF-OPEN':
                try {
                    const result = fn();
                    this.nbSuccess++;
                    if (this.nbSuccess >= this.successThreshold) {
                        this.close();
                    }
                    return result;
                }
                catch (e) {
                    this.open();
                    throw e;
                }
        }
    }
    close() {
        this.state = 'CLOSED';
        this.reinit();
    }
    halfOpen() {
        this.state = 'HALF-OPEN';
        this.reinit();
    }
    open() {
        this.state = 'OPEN';
        this.reinit();
        this.timeoutId = setTimeout(() => this.halfOpen(), this.openStateTimeout);
    }
    reinit() {
        if (!!this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.nbSuccess = 0;
        this.nbFailures = 0;
    }
}
