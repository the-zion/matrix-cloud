import axios from "axios"
import {loginTimeOut} from "./globalFunc";
import {baseMainStore} from "../store";

let endpoint = null

function getEndPoint() {
    if (!endpoint) {
        endpoint = baseMainStore()["endpoint"]
    }
    return endpoint
}

export function post(url, params) {
    let token = localStorage.getItem("matrix-token")
    const instance = axios.create({
        baseURL: getEndPoint(),
        method: "post",
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    if (token) {
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    token && (instance.defaults.headers.common['Authorization'] = "Bearer " + token)
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        let response = error.response
        if (response) {
            switch (response.data.reason) {
                case "TOKEN_EXPIRED":
                    loginTimeOut()
                    break
            }
        }
        return Promise.reject(error)
    });
    return instance.post(url, params)
}

export function get(url) {
    let token = localStorage.getItem("matrix-token")
    const instance = axios.create({
        baseURL: getEndPoint(),
        method: "get",
        headers: {
            'Cache-Control': 'no-cache'
        },
    });
    if (token) {
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        let response = error.response
        if (response) {
            switch (response.data.reason) {
                case "TOKEN_EXPIRED":
                    loginTimeOut()
                    break
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
