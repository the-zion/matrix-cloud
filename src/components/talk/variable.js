import {ref} from "vue"
export function variable() {
    let avatar = ref()
    let title = ref()
    let name = ref()
    let time = ref()
    let tags = ref()
    let image = ref()
    let content = ref()
    let agree = ref()
    let view = ref()
    let comment = ref()
    let collect = ref()

    return {avatar, title, name, time, tags, image, content, agree, view, comment, collect}
}