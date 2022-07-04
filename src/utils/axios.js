import axios from "axios"
import {baseMainStore} from "../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

const baseStore = baseMainStore()
const {endpoint} = storeToRefs(baseStore)

export function post(url, params) {
    let token = localStorage.getItem("matrix-token")
    const instance = axios.create({
        baseURL: endpoint.value,
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
        baseURL: endpoint.value,
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
