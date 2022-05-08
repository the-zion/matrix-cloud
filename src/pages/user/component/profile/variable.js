import {ref} from 'vue'

export function variable() {

    let data = ref({})
    let achievement = ref({})
    let skills = ref([])
    let visible = ref(false)
    return {
        data, achievement, skills, visible
    }

}