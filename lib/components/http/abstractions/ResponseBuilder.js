import { ResponseBody } from './ResponseBody';
import { Response } from './Response';
/**
 * Response builder.
 */
export class ResponseBuilder {
    status(value) {
        this._status = value;
        return this;
    }
    body(value) {
        this._body = value instanceof ResponseBody ? value : new ResponseBody(value);
        return this;
    }
    statusMessage(value) {
        this._statusMessage = value;
        return this;
    }
    headers(value) {
        this._headers = value;
        return this;
    }
    build() {
        return new Response(this._status, this._body, this._statusMessage, this._headers);
    }
}
