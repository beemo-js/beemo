import {RequestBody} from './RequestBody'

/**
 * Abstraction of an HTTP request.
 */
export class Request {
    constructor(
        public url: string = '',
        public method: string = 'GET',
        public urlParameters: { [key: string]: string } = {},
        public host: string = '',
        public headers: { [key: string]: string } = {},
        public body: RequestBody = new RequestBody()
    ) {}

    /**
     * Clone a request.
     */
    static clone(request: Request): Request {
        return new Request(
            request.url,
            request.method,
            request.urlParameters,
            request.host,
            request.headers,
            request.body
        )
    }

    /**
     * Merge given requests from left to right.
     * - urls are concatenated
     * - url parameters, bodies and headers are merged
     * - the rest is overridden
     */
    static merge(...requests: Request[]): Request {
        return requests.reduce((base, request) => {
            if (!request) return base

            base.url = Request.mergeUrls(base.url, request.url)
            base.method = request.method || base.method
            Object.assign(base.urlParameters, request.urlParameters)
            base.host = request.host.length ? request.host: base.host
            Object.assign(base.headers, request.headers)
            base.body = RequestBody.merge(base.body, request.body)

            return base
        }, new Request())
    }

    /**
     * Build request url from host, url and url params.
     */
    getFinalUrl(): string {
        let url = Request.mergeUrls(this.host, this.url)

        const urlParams = this.getUrlParams()
        if (urlParams.length > 0) {
            url += `?${urlParams}`
        }

        return url
    }

    /**
     * Builds the params part of the url.
     */
    private getUrlParams(): string {
        const params = []
        for (let key in this.urlParameters) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(this.urlParameters[key])}`)
        }
        return params.join('&')
    }

    /**
     * Concatenate given urls.
     */
    private static mergeUrls(...urls: string[]): string {
        return urls.reduce((base, url) => {
            if (!base) return url
            if (!url) return base

            let result = base

            // if base does not end with a /, add it
            if (base.substr(-1) !== '/') {
                result += '/'
            }

            // if url begins with a /, remove it
            if (url.substr(0, 1) === '/') {
                url = url.length ? url.substr(1): ''
            }

            result += url

            return result
        })
    }
}
