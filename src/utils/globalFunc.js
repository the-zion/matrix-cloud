import {ElMessageBox} from 'element-plus'
import router from "../router";
import {warning} from "./message";
import {userMainStore} from "../store";

const userStore = userMainStore()

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

export function goToPage(state, id) {
    if (!state) {
        return null
    }
    const params = {id: id};
    const {href} = router.resolve({
        name: state,
        query: params
    });
    window.open(href, "_blank");
}

export function backToHome() {
    router.push({name: "home"})
}

export function loginTimeOut(){
    warning("登录已过期，请重新登录")
    localStorage.removeItem("matrix-token")
    userStore.$reset()
}