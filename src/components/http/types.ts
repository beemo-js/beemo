export type RequestParamsType = {
    method?: string,
    urlParameters?: { [key: string]: string },
    host?: string,
    headers?: { [key: string]: string },
    body?: string
}