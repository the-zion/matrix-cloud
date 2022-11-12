import axios from "axios"
import {loginTimeOut} from "./globalFunc";
import {baseMainStore} from "../store/base";

let endpointUrl = null

function getEndPoint() {
    if (!endpointUrl) {
        endpointUrl = baseMainStore().endpoint
    }
    return endpointUrl
}

export function post(url, params) {
    let token = localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
    const instance = axios.create({
        baseURL: getEndPoint(),
        method: "post",
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    if (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;

    }
    token && (instance.defaults.headers.common.Authorization = `Bearer ${token}`)
    instance.interceptors.response.use((response) => response, (error) => {
        let r = error.response
        if (r) {
            switch (r.data.reason) {
                case "TOKEN_EXPIRED":
                    loginTimeOut()
                    break
                default:

            }
        }
        return Promise.reject(error)
    });
    return instance.post(url, params)
}

export function get(url) {
    let token = localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
    const instance = axios.create({
        baseURL: getEndPoint(),
        method: "get",
        headers: {
            'Cache-Control': 'no-cache'
        },
    });
    if (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    instance.interceptors.response.use((response) => response, (error) => {
        let r = error.response
        if (r) {
            switch (r.data.reason) {
                case "TOKEN_EXPIRED":
                    loginTimeOut()
                    break
                default:
            }
        }
        return Promise.reject(error);
    });
    return instance.get(url)
}

export function axiosGetAll(endpoints, resolve, reject, after) {
    axios.all(endpoints.map((endpoint) => get(endpoint))).then(
        axios.spread((...allData) => {
            resolve(allData)
        })
    ).catch(reject).then(after);
}

export function axiosPostAll(endpoints, resolve, reject, after) {
    axios.all(endpoints.map((endpoint) => post(endpoint))).then(
        axios.spread((...allData) => {
            resolve(allData)
        })
    ).catch(reject).then(after);
}
