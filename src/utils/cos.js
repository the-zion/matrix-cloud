import COS from "cos-js-sdk-v5"
import {get} from "./axios"
import {error} from "./message";

export function initCos() {
    return new COS({
        getAuthorization(options, callback) {
            get("/v1/get/cos/session/key").then((reply) => {
                callback({
                    TmpSecretId: reply.data.tmpSecretId,
                    TmpSecretKey: reply.data.tmpSecretKey,
                    SecurityToken: reply.data.sessionToken,
                    StartTime: reply.data.startTime,
                    ExpiredTime: reply.data.expiredTime,
                });
            }).catch(() => {
                error("上传失败，请稍后再试")
            })
        }
    });
}