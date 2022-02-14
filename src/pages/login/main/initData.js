import {ref} from 'vue'

export function initData() {
    let activeName = ref('phone')
    let inputPhone = ref('')
    let inputEmail = ref('')
    let buttonDisable = ref(true)
    let currentNote = ref("注：未注册的手机号会自动注册")
    let isLoading = ref(false)
    return {
        activeName, inputPhone, inputEmail, buttonDisable, currentNote, isLoading
    }

}