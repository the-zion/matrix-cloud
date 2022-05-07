import {variable} from "./variable.js"

export function controller() {
    let {avatar, title, name, time, tags, image, content, agree, view, comment, collect} = variable()

    function initVariable() {
        return {avatar, title, name, time, tags, image, content, agree, view, comment, collect}
    }

    function init(props) {
        avatar.value = props.data.avatar
        title.value = props.data.title
        name.value = props.data.name
        time.value = props.data.time
        tags.value = props.data.tags
        image.value = props.data.image
        content.value = props.data.content
        agree.value = props.data.agree > 1000 ? (props.data.agree / 1000).toFixed(1) + "k" : props.data.agree
        view.value = props.data.view > 1000 ? (props.data.view / 1000).toFixed(1) + "k" : props.data.view
        comment.value = props.data.comment > 1000 ? (props.data.comment / 1000).toFixed(1) + "k" : props.data.comment
        collect.value = props.data.collect > 1000 ? (props.data.collect / 1000).toFixed(1) + "k" : props.data.collect
    }

    return {initVariable, init}
}