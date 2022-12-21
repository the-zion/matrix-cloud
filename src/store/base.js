import {defineStore} from "pinia"


export const baseMainStore = defineStore("base", {
    state: () => ({
        endpoint: import.meta.env.VITE_MATRIX_ENDPOINT,
        cover: {
            region: "ap-shanghai",
            bucket: "user-1309416642",
            key: "cover/",
            freezeKey: "audit_freeze_backup/increment_audit/cover/",
            baseUrl: "https://matrixtech.cloud/cover/",
            freezeUrl: "https://matrixtech.cloud/audit_freeze_backup/increment_audit/cover/"
        },
        avatar: {
            region: "ap-shanghai",
            bucket: "user-1309416642",
            key: "avatar/",
            freezeKey: "audit_freeze_backup/increment_audit/avatar/",
            baseUrl: "https://matrixtech.cloud/avatar/",
            freezeUrl: "https://matrixtech.cloud/audit_freeze_backup/increment_audit/avatar/"
        },
        article: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "article/",
            freezeKey: "audit_freeze_backup/increment_audit/article/",
            baseUrl: "https://matrixtech.cloud/article/",
            freezeUrl: "https://matrixtech.cloud/audit_freeze_backup/increment_audit/article/"
        },
        talk: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "talk/",
            freezeKey: "audit_freeze_backup/increment_audit/talk/",
            baseUrl: "https://matrixtech.cloud/talk/",
            freezeUrl: "https://matrixtech.cloud/audit_freeze_backup/increment_audit/talk/"
        },
        column: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "column/",
            freezeKey: "audit_freeze_backup/increment_audit/column/",
            baseUrl: "https://matrixtech.cloud/column/",
            freezeUrl: "https://matrixtech.cloud/audit_freeze_backup/increment_audit/column/"
        },
        collect: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "collect/",
            baseUrl: "https://creation-1309416642.cos.ap-shanghai.myqcloud.com/collect/"
        },
        collections: {
            region: "ap-shanghai",
            bucket: "creation-1309416642",
            key: "collections/",
            baseUrl: "https://creation-1309416642.cos.ap-shanghai.myqcloud.com/collections/"
        },
        comment: {
            region: "ap-shanghai",
            bucket: "comment-1309416642",
            key: "comment/",
            baseUrl: "https://comment-1309416642.cos.ap-shanghai.myqcloud.com/comment/"
        },
        images: {
            baseUrl: "https://images-1309416642.cos.ap-shanghai.myqcloud.com"
        }
    }),
})
