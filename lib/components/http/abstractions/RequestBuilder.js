import { RequestBody } from './RequestBody';
import { Request } from './Request';
/**
 * Request builder.
 */
export class RequestBuilder {
    url(value) {
        this._url = value;
        return this;
    }
    method(value) {
        this._method = value;
        return this;
    }
    urlParameters(value) {
        this._urlParameters = value;
        return this;
    }
    host(value) {
        this._host = value;
        return this;
    }
    headers(value) {
        this._headers = value;
        return this;
    }
    body(value) {
        this._body = value instanceof RequestBody ? value :
            typeof value === 'string' ? RequestBody.fromString(value) :
                RequestBody.fromData(value);
        return this;
    }
    build() {
        return new Request(this._url, this._method, this._urlParameters, this._host, this._headers, this._body);
    }
}
