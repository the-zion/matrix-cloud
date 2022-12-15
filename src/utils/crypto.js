import CryptoJS from "crypto-js";

export default {
    keyParse(key) {
        return CryptoJS.enc.Utf8.parse(key)
    },
    ivParse(iv) {
        return CryptoJS.enc.Utf8.parse(iv)
    },
    encrypt(word, key, iv) {
        let encrypted = "";
        if (typeof word == "string") {
            const srcs = CryptoJS.enc.Utf8.parse(word);
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        } else if (typeof word == "object") {
            //对象格式的转成json字符串
            const data = JSON.stringify(word);
            const srcs = CryptoJS.enc.Utf8.parse(data);
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        }
        return encrypted.ciphertext.toString();
    },

    decrypt(word, key, iv) {
        const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        const decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
};