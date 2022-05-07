import {variable} from "./variable.js"

export function controller() {

    let {mode} = variable()
    let emits = null

    function initData() {
        return {mode}
    }

    function init(emitsObject) {
        emits = emitsObject
    }

    function beforeClose() {
        emits("update:visible", false)
    }

    function dialogClosed() {
        mode.value = "code"
    }

    function closeDialog() {
        beforeClose()
    }


    return {initData, init, beforeClose, dialogClosed, closeDialog}
}