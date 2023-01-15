import {defineStore} from "pinia"


export const baseMainStore = defineStore("base", {
    state: () => ({
        endpoint: import.meta.env.VITE_MATRIX_ENDPOINT,
        cover: {
            region: "ap-shanghai",
            bucket: "user-1309416642",
            key: "cover/",
            freezeKey: "audit_freeze_backup/increment_audit/cover/",
            baseUrl: import.meta.env.VITE_USER_BASE_URL + "/cover/",
            freezeUrl: import.meta.env.VITE_USER_BASE_URL + "/audit_freeze_backup/increment_audit/cover/"
        },
        avatar: {
            region: "ap-shanghai",
            bucket: "user-1309416642",
            key: "avatar/",
            freezeKey: "audit_freeze_backup/increment_audit/avatar/",
            baseUrl: import.meta.env.VITE_USER_BASE_URL + "/avatar/",
            freezeUrl: import.meta.env.VITE_USER_BASE_URL + "/audit_freeze_backup/increment_audit/avatar/"
        },
        article: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "article/",
            freezeKey: "audit_freeze_backup/increment_audit/article/",
            baseUrl: import.meta.env.VITE_CREATION_BASE_URL + "/article/",
            freezeUrl: import.meta.env.VITE_CREATION_BASE_URL + "/audit_freeze_backup/increment_audit/article/"
        },
        talk: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "talk/",
            freezeKey: "audit_freeze_backup/increment_audit/talk/",
            baseUrl: import.meta.env.VITE_CREATION_BASE_URL + "/talk/",
            freezeUrl: import.meta.env.VITE_CREATION_BASE_URL + "/audit_freeze_backup/increment_audit/talk/"
        },
        column: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "column/",
            freezeKey: "audit_freeze_backup/increment_audit/column/",
            baseUrl: import.meta.env.VITE_CREATION_BASE_URL + "/column/",
            freezeUrl: import.meta.env.VITE_CREATION_BASE_URL + "/audit_freeze_backup/increment_audit/column/"
        },
        collect: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "collect/",
            baseUrl: import.meta.env.VITE_CREATION_BASE_URL + "/collect/"
        },
        collections: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "collections/",
            baseUrl: import.meta.env.VITE_CREATION_BASE_URL + "/collections/"
        },
        comment: {
            region: "ap-shanghai",
            bucket: "comment-1309416642",
            key: "comment/",
            baseUrl: import.meta.env.VITE_CREATION_BASE_URL + "/comment/"
        },
    }),
})
