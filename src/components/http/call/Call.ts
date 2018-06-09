import {Request} from '../abstractions/Request'

export class Call<T> {
    value?: T
    request?: Request
    retrieved: boolean

    constructor(
        public classFn: Function
    ) {
        this.retrieved = false
    }

    static fromRequest<T>(classFn: Function, request: Request): Call<T> {
        const liveData = new Call<T>(classFn)
        liveData.request = request
        liveData.retrieved = false
        return liveData
    }

    static fromValue<T>(classFn: Function, value: T): Call<T> {
        const liveData = new Call<T>(classFn)
        liveData.value = value
        liveData.retrieved = true
        return liveData
    }

    get(): T {
        if (!this.retrieved) {
            throw 'Value not yet retrieved'
        }
        return this.value
    }

    set(value: T): void {
        this.value = value
        this.retrieved = true
        this.request = null
    }
}