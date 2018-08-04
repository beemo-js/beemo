export interface LogDataFormatter {
    /**
     * Format a log.
     */
    format(log: Object): Object;
}
