import {defineStore} from "pinia"
import {get} from "../utils/axios"
import {warning} from "../utils/message";

export const userMainStore = defineStore("user", {
    state: () => {
        return {
            uuid: null,
            username: null,
            avatar: null,
        }
    },

    getters: {},

    actions: {
        getUserProfile() {
            let that = this
            get("/v1/get/user/profile").then(function (reply) {
                that.$patch(state => {
                    state.uuid = reply.data.uuid
                    state.username = reply.data.username
                    state.avatar = reply.data.avatar
                })
            }).catch(function (err) {
                let response = err.response
                if (response) {
                    switch (response.data.reason) {
                        case "TOKEN_EXPIRED":
                            warning("登录已过期，请重新登录")
                            localStorage.removeItem("matrix-token")
                            break
                    }
                }
                that.$reset()
            })
        }
    }
})

export const baseMainStore = defineStore("base", {
    state: () => {
        return {
            endpoint: "http://127.0.0.1:8080",
            avatar: {
                region: "ap-shanghai",
                bucket: "user-1309416642",
                key: "avatar/",
                baseUrl: "https://user-1309416642.cos.ap-shanghai.myqcloud.com/avatar/"
            },
            article: {
                region: "ap-shanghai",
                bucket: "creation-1309416642",
                key: "article/",
                baseUrl: "https://creation-1309416642.cos.ap-shanghai.myqcloud.com/article/"
            }
        }
    },
})