import {Request, Response} from '..'

export interface HttpRequestSender {
    sendRequest(request: Request): Promise<Response>
}