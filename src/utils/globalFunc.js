import {ElMessageBox} from 'element-plus'
import router from "../router";

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
    const params = {id: id};
    const {href} = router.resolve({
        name: state,
        query: params
    });
    window.open(href, "_blank");
}