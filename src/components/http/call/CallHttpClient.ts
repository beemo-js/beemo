import {Call} from './Call'
import {BatchHttpClient} from '../batch/BatchHttpClient'
import {HttpClient} from '../client/HttpClient'
import {Normalizer} from "../../serialization/Normalizer";
import {Encoder} from "../../serialization/encoders/Encoder";
import {Response} from "../abstractions/Response";

export class CallHttpClient {
    constructor(
        private httpClient: HttpClient,
        private batchHttpClient: BatchHttpClient,
        private encoder: Encoder,
        private normalizer: Normalizer
    ) {}

    async retrieveData(call: Call<any>|Call<any>[]|Object): Promise<any|any[]|Object> {
        return (
            call instanceof Call ? this.retrieveCallData(call):
            Array.isArray(call) ? await this.retrieveDataArray(call):
            await this.retrieveDataObject(call)
        )
    }

    private async retrieveCallData(call: Call<any>): Promise<any> {
        if (!call.retrieved) {
            const response = await this.httpClient.sendRequest(call.request)
            this.parseCallResponseData(call, response)
        }

        return call.get()
    }

    private async retrieveDataArray(calls: Call<any>[]): Promise<any[]> {
        const requestsToSend = calls
            .map((rd, index) => [rd, index])
            .filter(([rd]) => !(rd as Call<any>).retrieved)

        const responses = await this.batchHttpClient.sendRequests(requestsToSend.map(([rd]) => (rd as Call<any>).request))
        responses.forEach(async (resp, index) => {
            const id = requestsToSend[index][1] as number
            this.parseCallResponseData(calls[id], resp)
        })

        return calls.map(rd => rd.value)
    }

    private async retrieveDataObject(requestsData: Object): Promise<Object> {
        const result = Object.assign({}, requestsData)

        await this.retrieveDataArray(Object.values(result))
        for (let i in result) {
            result[i] = result[i].value
        }

        return result
    }

    private parseCallResponseData<T>(call: Call<any>, response: Response): void {
        const rawResponseData = this.encoder.decode(response.body)
        const formattedResponseData = call.responseFormatter(rawResponseData)
        const normalizedResponseData = this.normalizer.denormalize(call.classFn, formattedResponseData)
        call.set(normalizedResponseData)
    }
}