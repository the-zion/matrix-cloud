import axios from "axios"
import {baseMainStore} from "../store";

const baseStore = baseMainStore()

export function post(url, params) {
    let token = localStorage.getItem("matrix-token")
    const instance = axios.create({
        baseURL: baseStore.endpoint,
        method: "post",
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    if (token) {
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    return instance.post(url, params)
}

export function get(url) {
    let token = localStorage.getItem("matrix-token")
    const instance = axios.create({
        baseURL: baseStore.endpoint,
        method: "get",
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    if (token) {
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    return instance.get(url)
}
