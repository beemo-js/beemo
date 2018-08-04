export interface Encoder {
    encode(data: Object | Object[]): string;
    decode(text: string): Object | Object[];
}
