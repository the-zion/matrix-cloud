import {ref, reactive} from 'vue'

export function initData() {
    let count = ref(0)
    let isLoading = ref(false)
    let inputCode = ref()
    let buttonDisable = ref(false)
    let phoneNumber = ref('')
    let emailNumber = ref('')
    let routerParams = reactive({})
    return {
        count, isLoading, inputCode, buttonDisable, phoneNumber, emailNumber, routerParams
    }
}