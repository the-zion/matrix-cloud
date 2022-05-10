import {variable} from "./variable.js"
let {mode} = variable()
let emits = null

export function initVariable() {
    return {mode}
}

export function init(emitsObject) {
    emits = emitsObject
}

export function beforeClose() {
    emits("update:visible", false)
}

export function dialogClosed() {
    mode.value = "code"
}

export function closeDialog() {
    beforeClose()
}