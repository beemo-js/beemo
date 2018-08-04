import { Call } from './Call';
import { HttpClient } from '..';
import { Normalizer, Encoder } from "../../serialization";
/**
 * Retrieves the value of Call resources.
 */
export declare class CallHttpClient {
    private httpClient;
    private encoder;
    private normalizer;
    constructor(httpClient: HttpClient, encoder: Encoder, normalizer: Normalizer);
    retrieveData(call: Call<any> | Call<any>[] | Object): Promise<any | any[] | Object>;
    /**
     * Retrieve value of one Call.
     */
    private retrieveCallData(call);
    /**
     * Retrieve value of a list of Calls.
     */
    private retrieveDataArray(calls);
    /**
     * Retrieve value of Calls in a dict of calls.
     */
    private retrieveDataObject(requestsData);
    /**
     * Set the value of given Call from HTTP response.
     */
    private parseCallResponseData<T>(call, response);
}
