import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { resolveErrors } from "./error";
import { Error } from "./types";

let _client: AxiosInstance;
let _message: string;

/**
 * create new axios instance
 *
 * @param config axios config
 * @param string default error message
 */
export function createAxiosInstance(
    message: string,
    config?: AxiosRequestConfig
) {
    _client = axios.create(config);
    _message = message;
    _client.interceptors.response.use(
        (resp) => resp,
        (err) => {
            const e = createError();
            if (err.response) {
                e.raw = err.response;
                e.type = "response";
                e.body = err.response.data;
                e.status = err.response.status;
            } else if (err.request) {
                e.raw = err.request;
                e.type = "request";
            } else {
                e.raw = err;
                e.type = undefined;
            }
            e.canceled = axios.isCancel(err);
            resolveErrors(e);
            return Promise.reject(e);
        }
    );
}

/**
 * get axios instance
 */
export function client(): AxiosInstance {
    _client || createAxiosInstance("");
    return _client;
}

/**
 * create empty error with default message
 */
export function createError(): Error {
    const e: Error = {};
    e.message = _message;
    return e;
}
