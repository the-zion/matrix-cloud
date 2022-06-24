import axios from "axios"
import {baseMainStore} from "../store";

const baseStore = baseMainStore()
console.log(123)
export function post(url, params) {
    let token = localStorage.getItem("matrix-token")
    const instance = axios.create({
        baseURL: baseStore.endpoint,
        method: "post"
    });
    if(token){
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    return instance.post(url, params)
}

export function get(url) {
    let token = localStorage.getItem("matrix-token")
    const instance = axios.create({
        baseURL: baseStore.endpoint,
        method: "get"
    });
    if(token){
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    return instance.get(url)
}
