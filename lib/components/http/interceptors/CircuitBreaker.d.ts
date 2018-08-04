export declare class CircuitBreaker {
    failuresThreshold: number;
    successThreshold: number;
    openStateTimeout: number;
    private state;
    private nbSuccess;
    private nbFailures;
    private timeoutId;
    constructor(failuresThreshold: number, successThreshold: number, openStateTimeout: number);
    attempt(fn: Function): any;
    close(): void;
    halfOpen(): void;
    open(): void;
    private reinit();
}
