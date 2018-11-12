import {Request} from '../../abstractions/Request'
import {Call} from '../../call/Call'

/**
 * Builds Call instances.
 */
export abstract class CallFactory {
    constructor(
        protected baseCall: Call<any> = new Call<any>()
    ) {}

    private buildRequestCall<T>(url: string, method: string): Call<T> {
        const call = Call.clone(this.baseCall)
        call.request = Request.merge(this.baseCall.request, new Request(url, method))
        return call
    }

    protected get<T>(url: string = ''): Call<T> {
        return this.buildRequestCall<T>(url, 'GET')
    }

    protected post<T>(url: string = ''): Call<T> {
        return this.buildRequestCall<T>(url, 'POST')
    }

    protected put<T>(url: string = ''): Call<T> {
        return this.buildRequestCall<T>(url, 'PUT')
    }

    protected patch<T>(url: string = ''): Call<T> {
        return this.buildRequestCall<T>(url, 'PATCH')
    }

    protected delete<T>(url: string = ''): Call<T> {
        return this.buildRequestCall<T>(url, 'DELETE')
    }
}
