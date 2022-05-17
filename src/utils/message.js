import {ElMessage} from "element-plus";


export function success(message) {
    ElMessage({
        message: message,
        type: 'success',
        grouping: true
    })
}

export function warning(message) {
    ElMessage({
        message: message,
        type: 'warning',
        grouping: true
    })
}

export function error(message) {
    ElMessage({
        message: message,
        type: 'error',
        grouping: true
    })
}

export function info(message) {
    ElMessage({
        message: message,
        type: 'info',
        grouping: true
    })
}