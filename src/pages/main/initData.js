import {h, ref, watch} from 'vue'
import {ElDivider} from 'element-plus'

export function initData() {
    let input = ref('')
    let showSearch = ref(false)
    let messageValue = ref(0)
    const menulist = ref([{
        id: 0,
        key: "home",
        name: "首页",
        state: "home",
        icon: "house"
    }, {
        id: 1,
        key: "community",
        name: "江湖",
        state: "community",
        icon: "chat-dot-round"
    }, {
        id: 2,
        key: "about",
        name: "关于Cube",
        state: "about",
        icon: "question-filled"
    }])
    return {
        input, showSearch, messageValue, menulist
    }

}