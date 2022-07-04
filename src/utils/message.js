import {ElMessage, ElMessageBox, ElNotification} from "element-plus";


export function success(message) {
    ElNotification({
        title: 'Success',
        message: message,
        showClose: false,
        type: 'success',
    })
}

export function warning(message) {
    ElNotification({
        title: 'Warning',
        message: message,
        showClose: false,
        type: 'warning',
    })
}

export function error(message) {
    ElNotification({
        title: 'Error',
        message: message,
        showClose: false,
        type: 'error',
    })
}

export function info(message) {
    // ElMessage({
    //     message: message,
    //     type: 'info',
    //     grouping: true
    // })
    ElNotification({
        title: 'Info',
        message: message,
        showClose: false,
        type: 'info',
    })
}

export function confirm(text) {
    return ElMessageBox.confirm(
        text,
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
}