import * as COS from "cos-js-sdk-v5"
import {get} from "./axios"
import {error} from "./message";

export function initCos() {
    return new COS({
        // getAuthorization 必选参数
        getAuthorization: function (options, callback) {
            // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/blob/master/scope.md
            // 异步获取临时密钥
            get("/v1/get/cos/session/key").then(function (reply) {
                let data = reply.data
                callback({
                    TmpSecretId: data["tmpSecretId"],
                    TmpSecretKey: data["tmpSecretKey"],
                    SecurityToken: data["sessionToken"],
                    // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    StartTime: data["startTime"], // 时间戳，单位秒，如：1580000000
                    ExpiredTime: data["expiredTime"], // 时间戳，单位秒，如：1580000000
                });
            }).catch(function () {
                error("图片上传失败，请稍后再试")
            })
        }
    });
}