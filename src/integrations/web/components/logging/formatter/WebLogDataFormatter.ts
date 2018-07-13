import {LogDataFormatter} from '../../../../../components/logging'

export class WebLogDataFormatter implements LogDataFormatter {
    format(log: Object): Object {
        return {
            date: new Date(),
            data: log
        }
    }
}