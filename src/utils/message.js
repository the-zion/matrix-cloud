import {ElMessageBox, ElNotification} from "element-plus";


export function success(m) {
    ElNotification({
        title: 'Success',
        message: m,
        showClose: false,
        type: 'success',
    })
}

export function warning(m) {
    ElNotification({
        title: 'Warning',
        message: m,
        showClose: false,
        type: 'warning',
    })
}

export function error(m) {
    ElNotification({
        title: 'Error',
        message: m,
        showClose: false,
        type: 'error',
    })
}

export function info(m) {
    // ElMessage({
    //     message: message,
    //     type: 'info',
    //     grouping: true
    // })
    ElNotification({
        title: 'Info',
        message: m,
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