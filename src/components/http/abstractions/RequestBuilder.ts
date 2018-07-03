import {RequestBody} from './RequestBody'
import {Request} from './Request'

/**
 * Request builder.
 */
export class RequestBuilder {
    private _url: string
    private _method: string
    private _urlParameters: { [key: string]: string }
    private _host: string
    private _headers: { [key: string]: string }
    private _body: RequestBody

    url(value: string): this {
        this._url = value
        return this
    }

    method(value: string): this {
        this._method = value
        return this
    }

    urlParameters(value: { [p: string]: string }): this {
        this._urlParameters = value
        return this
    }

    host(value: string): this {
        this._host = value
        return this
    }

    headers(value: { [p: string]: string }): this {
        this._headers = value
        return this
    }

    body(value: RequestBody|string|Object): this {
        this._body = value instanceof RequestBody ? value:
                     typeof value === 'string' ? RequestBody.fromString(value):
                     RequestBody.fromData(value)
        return this
    }

    build(): Request {
        return new Request(
            this._url,
            this._method,
            this._urlParameters,
            this._host,
            this._headers,
            this._body
        )
    }
}