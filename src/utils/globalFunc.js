import {ElMessageBox} from 'element-plus'
import router from "../router";
import {warning} from "./message";
import {baseMainStore} from "../store/base";

let userStoreStorage = null

function getUserStore() {
    if (!userStoreStorage) {
        userStoreStorage = baseMainStore()
    }
    return userStoreStorage
}

function getAverageRGB(imgEl) {
    let blockSize = 5
    let defaultRGB = {r: 0, g: 0, b: 0}
    let canvas = document.createElement('canvas')
    let context = canvas.getContext && canvas.getContext('2d')
    let data
    let width
    let height
    let i = -4
    let length
    let rgb = {r: 0, g: 0, b: 0}
    let count = 0


    if (!context) {
        return defaultRGB;
    }

    canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    height = canvas.height
    width = canvas.width

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        return defaultRGB;
    }

    length = data.data.length;

    while (i + blockSize * 4 < length) {
        i += blockSize * 4
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    rgb.r = Math.floor(rgb.r / count) || 0;
    rgb.g = Math.floor(rgb.g / count) || 0;
    rgb.b = Math.floor(rgb.b / count) || 0;

    return rgb;
}

export function reverse(base, inner) {
    let el = document.getElementById(base)
    if (!el) {
        el = document.getElementById(inner)
    }
    el.crossOrigin = "Anonymous";
    let rgb = getAverageRGB(el);
    let r = 255 - rgb.r
    let g = 255 - rgb.g
    let b = 255 - rgb.b
    return `${r},${g},${b}`
}

export function confirm(title, message, type) {
    return ElMessageBox.confirm(
        message,
        title,
        {
            customClass: 'matrix-message-box',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type || "warning",
        }
    )
}

export function goToPage(state, params) {
    if (!state) {
        return null
    }
    const {href} = router.resolve({
        name: state,
        query: params
    });
    window.open(href, "_blank");
}

export function backToHome() {
    router.push({name: 'home', query: {page: 'news'}})
}

export function setTitle(word) {
    document.title = word
}

export function textEmojiRemove(text) {
    return text.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, "")
}

export function charFilter(str) {
    return str.replace(/\s+/g,'')
}

export function loginTimeOut() {
    let userStore = getUserStore()
    if (localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)) {
        warning("登录已过期，请重新登录")
        localStorage.removeItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
        userStore.$reset()
    }
}

export const getAssets = (name, folder = 'images') => new URL(`../assets/${folder}/${name}`, import.meta.url).href