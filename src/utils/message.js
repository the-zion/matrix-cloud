import {ElMessage} from "element-plus";

export function message() {
    function success(message) {
        ElMessage({
            message: message,
            type: 'success',
            grouping: true
        })
    }

    function error(message){
        ElMessage({
            message: message,
            type: 'error',
            grouping: true
        })
    }

    return {success, error}
}

export function success(message) {
    ElMessage({
        message: message,
        type: 'success',
        grouping: true
    })
}

export function error(message){
    ElMessage({
        message: message,
        type: 'error',
        grouping: true
    })
}