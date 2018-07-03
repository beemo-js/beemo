import {ResponseBody} from './ResponseBody'
import {Response} from './Response'

/**
 * Response builder.
 */
export class ResponseBuilder {
    private _status: number
    private _body: ResponseBody
    private _statusMessage: string
    private _headers: { [key: string]: string }

    status(value: number): this {
        this._status = value
        return this
    }

    body(value: ResponseBody|string): this {
        this._body = value instanceof ResponseBody ? value: new ResponseBody(value)
        return this
    }

    statusMessage(value: string): this {
        this._statusMessage = value
        return this
    }

    headers(value: { [p: string]: string }): this {
        this._headers = value
        return this
    }

    build(): Response {
        return new Response(
            this._status,
            this._body,
            this._statusMessage,
            this._headers
        )
    }
}