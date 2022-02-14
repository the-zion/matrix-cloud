import {ref} from 'vue'

export function initData() {
    let inputPassword = ref()
    let repeatPassword = ref()
    let buttonDisable = ref(false)
    let routerParams = ref({})
    let passWordPass = ref(true)
    let repeatPass = ref(true)
    let passwordError = ref('')
    let repeatError = ref('')
    let isLoading = ref(false)
    return {
        inputPassword,
        repeatPassword,
        buttonDisable,
        routerParams,
        passWordPass,
        repeatPass,
        passwordError,
        repeatError,
        isLoading
    }
}