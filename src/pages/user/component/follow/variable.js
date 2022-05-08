import {ref} from 'vue'

export function variable() {

    let data = ref({})
    let list = ref([])
    let visible = ref(true)
    let scroll = ref()
    let bar = ref([
        {
            key: "follow",
            label: "关注了",
            select: true
        },
        {
            key: "follower",
            label: "关注者",
            select: false
        }
    ])
    return {
        data, list, visible, scroll, bar
    }

}