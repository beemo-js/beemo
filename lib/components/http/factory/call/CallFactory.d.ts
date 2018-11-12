import { Call } from '../../call/Call';
/**
 * Builds Call instances.
 */
export declare abstract class CallFactory {
    protected baseCall: Call<any>;
    constructor(baseCall?: Call<any>);
    private buildRequestCall<T>(url, method);
    protected get<T>(url?: string): Call<T>;
    protected post<T>(url?: string): Call<T>;
    protected put<T>(url?: string): Call<T>;
    protected patch<T>(url?: string): Call<T>;
    protected delete<T>(url?: string): Call<T>;
}
