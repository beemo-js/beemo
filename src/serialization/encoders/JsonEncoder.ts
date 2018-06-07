import {Encoder} from './Encoder'

export class JsonEncoder implements Encoder {
    decode(text: string): Object | Object[] {
        return JSON.parse(text)
    }

    encode(data: Object | Object[]): string {
        return JSON.stringify(data)
    }
}