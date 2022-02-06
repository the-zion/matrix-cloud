import {h, reactive, ref, watch} from 'vue'

export function initData() {
    let inputPassword = ref()
    let buttonDisable = ref(false)
    let routerParams = ref({})
    return {
        inputPassword, buttonDisable, routerParams
    }
}