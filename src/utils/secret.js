import Crypto from "./crypto";

function createKey() {
    let key = ""
    for (let index = 1; index <= 16; index++) {
        key += Math.ceil(Math.random() * 9)
    }
    key = Crypto.keyParse(key)
    localStorage.setItem("matrix-aes-key", JSON.stringify(key))
    return key
}

function getKey() {
    let key = JSON.parse(localStorage.getItem("matrix-aes-key"))
    localStorage.removeItem("matrix-aes-key")
    return key
}

function createIv() {
    let iv = ""
    for (let index = 1; index <= 16; index++) {
        iv += Math.ceil(Math.random() * 9)
    }
    iv = Crypto.ivParse(iv)
    localStorage.setItem("matrix-aes-iv", JSON.stringify(iv))
    return iv
}

function getIv() {
    let iv = JSON.parse(localStorage.getItem("matrix-aes-iv"))
    localStorage.removeItem("matrix-aes-iv")
    return iv
}


function createWord() {
    let word = ""
    let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    for (let index = 1; index <= 16; index++) {
        word += arr[Math.floor(Math.random() * 26)]
    }
    localStorage.setItem("matrix-aes-word", word)
    return word
}

function getWord() {
    let word = localStorage.getItem("matrix-aes-word")
    localStorage.removeItem("matrix-aes-word")
    return word
}

export function encrypt() {
    let key = createKey()
    let iv = createIv()
    let word = createWord()
    return Crypto.encrypt(word, key, iv)
}

function decrypt(word) {
    let key = getKey()
    let iv = getIv()
    return Crypto.decrypt(word, key, iv)
}

export function wordCheck(word) {
    return getWord() === decrypt(word)
}


