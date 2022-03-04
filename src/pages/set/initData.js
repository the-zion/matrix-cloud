import {ref} from "vue"

export function initData() {
    const currentPage = ref("security")
    const classList = ref(
        [{
            "value": "security",
            "label": "安全设置",
            "icon": "lock",
        }, {
            "value": "bind",
            "label": "账号绑定",
            "icon": "monitor",
        }, {
            "value": "messageSet",
            "label": "消息通知",
            "icon": "message",
        }]
    )
    return {
        classList, currentPage
    }

}