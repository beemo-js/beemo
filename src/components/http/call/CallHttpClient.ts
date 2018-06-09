import {Call} from './Call'
import {BatchHttpClient} from '../batch/BatchHttpClient'
import {Serializer} from '../../serialization/serializers/Serializer'
import {HttpClient} from '../client/HttpClient'

export class CallHttpClient {
    constructor(
        private httpClient: HttpClient,
        private batchHttpClient: BatchHttpClient,
        private serializer: Serializer
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
            const responseData = this.serializer.deserialize(call.classFn, response.body)
            call.set(responseData)
        }

        return call.get()
    }

    private async retrieveDataArray(requestsData: Call<any>[]): Promise<any[]> {
        const requestsToSend = requestsData
            .map((rd, index) => [rd, index])
            .filter(([rd]) => !(rd as Call<any>).retrieved)

        const responses = await this.batchHttpClient.sendRequests(requestsToSend.map(([rd]) => (rd as Call<any>).request))
        responses.forEach(async (resp, index) => {
            const id = requestsToSend[index][1] as number
            const responseData = this.serializer.deserialize(requestsData[id].classFn, resp.body)
            requestsData[id].set(responseData)
        })

        return requestsData.map(rd => rd.value)
    }

    private async retrieveDataObject(requestsData: Object): Promise<Object> {
        const result = Object.assign({}, requestsData)

        // @ts-ignore
        await this.retrieveDataArray(Object.values(result))
        for (let i in result) {
            result[i] = result[i].value
        }

        return result
    }
}