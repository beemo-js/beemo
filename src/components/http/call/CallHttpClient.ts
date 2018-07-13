import {Call} from './Call'
import {HttpClient, Response} from '..'
import {Normalizer, Encoder} from "../../serialization"

/**
 * Retrieves the value of Call resources.
 */
export class CallHttpClient {
    constructor(
        private httpClient: HttpClient,
        private encoder: Encoder,
        private normalizer: Normalizer
    ) {}

    retrieveData(call: Call<any>|Call<any>[]|Object): Promise<any|any[]|Object> {
        return (
            call instanceof Call ? this.retrieveCallData(call):
            Array.isArray(call) ? this.retrieveDataArray(call):
            this.retrieveDataObject(call)
        )
    }

    /**
     * Retrieve value of one Call.
     */
    private async retrieveCallData(call: Call<any>): Promise<any> {
        if (!call.retrieved) {
            const response = await this.httpClient.sendRequest(call.request)
            this.parseCallResponseData(call, response)
        }

        return call.get()
    }

    /**
     * Retrieve value of a list of Calls.
     */
    private async retrieveDataArray(calls: Call<any>[]): Promise<any[]> {
        const requestsToSend = calls
            .map((rd, index) => [rd, index])
            .filter(([rd]) => !(rd as Call<any>).retrieved)

        const responses = await this.httpClient.sendRequests(requestsToSend.map(([rd]) => (rd as Call<any>).request))
        responses.forEach(async (resp, index) => {
            const id = requestsToSend[index][1] as number
            this.parseCallResponseData(calls[id], resp)
        })

        return calls.map(rd => rd.value)
    }

    /**
     * Retrieve value of Calls in a dict of calls.
     */
    private async retrieveDataObject(requestsData: Object): Promise<Object> {
        const result = Object.assign({}, requestsData)

        await this.retrieveDataArray(Object.values(result))
        for (let i in result) {
            result[i] = result[i].value
        }

        return result
    }

    /**
     * Set the value of given Call from HTTP response.
     */
    private parseCallResponseData<T>(call: Call<any>, response: Response): void {
        const rawResponseData = this.encoder.decode(response.body.content)
        const formattedResponseData = call.responseFormatter(rawResponseData)
        const normalizedResponseData = this.normalizer.denormalize(call.classFn, formattedResponseData)
        call.set(normalizedResponseData)
    }
}