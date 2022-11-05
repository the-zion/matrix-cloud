import {defineStore} from "pinia"
import {get} from "../utils/axios"
import {initCos} from "../utils/cos"

export const userMainStore = defineStore("user", {
    state: () => ({
        uuid: null,
        username: null,
        avatar: null,
        cos: null,
    }),

    getters: {},

    actions: {
        getUserCos() {
            this.$patch(state => {
                state.cos = initCos()
            })
        },
        getUserProfile() {
            let that = this
            get("/v1/get/user/profile").then((reply) => {
                that.$patch(state => {
                    state.uuid = reply.data.uuid
                    state.username = reply.data.username
                    state.avatar = reply.data.avatar
                })
            }).catch(() => {
                that.$reset()
            })
        }
    }
})