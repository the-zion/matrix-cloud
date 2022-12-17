import {encrypt} from "./secret";

export function wechat(states, redirect) {
    let url = import.meta.env.VITE_WECHAT
    let appid = import.meta.env.VITE_WECHAT_APPID
    let state = (states || "") + encrypt()
    let redirect_url = redirect ? encodeURIComponent(redirect) : encodeURIComponent(import.meta.env.VITE_WECHAT_REDIRECT_URL)
    window.location.href = url + "?response_type=code&appid=" + appid + "&redirect_uri=" + redirect_url + "&scope=" + import.meta.env.VITE_WECHAT_SCOPE + "&state=" + state
}


export function qq(states, redirect) {
    let url = import.meta.env.VITE_QQ
    let appid = import.meta.env.VITE_QQ_APPID
    let state = (states || "") + encrypt()
    let redirect_url = redirect ? encodeURIComponent(redirect) : encodeURIComponent(import.meta.env.VITE_QQ_REDIRECT_URL)
    window.location.href = url + "?response_type=code&client_id=" + appid + "&redirect_uri=" + redirect_url + "&state=" + state
}

export function gitee(states, redirect) {
    let url = import.meta.env.VITE_GITEE
    let appid = import.meta.env.VITE_GITEE_APPID
    let state = (states || "") + encrypt()
    let redirect_url = redirect ? encodeURIComponent(redirect) : encodeURIComponent(import.meta.env.VITE_GITEE_REDIRECT_URL)
    window.location.href = url + "?client_id=" + appid + "&redirect_uri=" + redirect_url + "&response_type=code" + "&state=" + state
}


export function github(states, redirect) {
    let url = import.meta.env.VITE_GITHUB
    let appid = import.meta.env.VITE_GITHUB_APPID
    let state = (states || "") + encrypt()
    let redirect_url = redirect ? encodeURIComponent(redirect) : encodeURIComponent(import.meta.env.VITE_GITHUB_REDIRECT_URL)
    window.location.href = url + "?client_id=" + appid + "&redirect_uri=" + redirect_url + "&state=" + state
}