import {h, reactive, ref, watch} from 'vue'

export function initData() {
    let inputPassword = ref()
    let buttonDisable = ref(false)
    let routerParams = ref({})
    let isLoading = ref(false)
    return {
        inputPassword, buttonDisable, routerParams, isLoading
    }
}