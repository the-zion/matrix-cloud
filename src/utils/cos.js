import * as COS from "cos-js-sdk-v5"
import {get} from "./axios"
import {error} from "./message";

export function initCos() {
    return new COS({
        getAuthorization: function (options, callback) {
            get("/v1/get/cos/session/key").then(function (reply) {
                let data = reply.data
                callback({
                    TmpSecretId: data["tmpSecretId"],
                    TmpSecretKey: data["tmpSecretKey"],
                    SecurityToken: data["sessionToken"],
                    StartTime: data["startTime"],
                    ExpiredTime: data["expiredTime"],
                });
            }).catch(function () {
                error("图片上传失败，请稍后再试")
            })
        }
    });
}