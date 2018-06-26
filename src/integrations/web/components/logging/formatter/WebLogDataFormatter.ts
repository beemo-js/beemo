import {LogDataFormatter} from '../../../../../components/logging/formatter/LogDataFormatter'

export class WebLogDataFormatter implements LogDataFormatter {
    format(log: Object): Object {
        return {
            date: new Date(),
            data: log
        }
    }
}