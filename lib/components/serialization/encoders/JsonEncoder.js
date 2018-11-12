export class JsonEncoder {
    decode(text) {
        return JSON.parse(text);
    }
    encode(data) {
        return JSON.stringify(data);
    }
}
