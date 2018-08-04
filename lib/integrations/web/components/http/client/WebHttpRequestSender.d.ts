import { HttpRequestSender, Request as AbstractRequest, Response as AbstractResponse } from '../../../../../components/http';
export declare class WebHttpRequestSender implements HttpRequestSender {
    private baseRequest;
    constructor(baseRequest?: AbstractRequest);
    sendRequest(request: AbstractRequest): Promise<AbstractResponse>;
    private mapRequest(request);
    private mapResponse(response);
}
