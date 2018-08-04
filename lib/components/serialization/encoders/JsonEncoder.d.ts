import { Encoder } from './Encoder';
export declare class JsonEncoder implements Encoder {
    decode(text: string): Object | Object[];
    encode(data: Object | Object[]): string;
}
