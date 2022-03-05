import {ref} from "vue";

export function initData() {
    const route = ref()
    const backTopRight = ref()
    const title = ref("03 | 新特性：初探Vue 3新特性")
    const defaultHtml = '<div>一行文字</div>'
    const view = ref()
    const star = ref()
    const like = ref()

    return {
        route, backTopRight, title, defaultHtml, view, star, like
    }

}