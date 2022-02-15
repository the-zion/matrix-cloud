export function controller(emit, commentInput) {
    function dialogClosed() {
        emit("update:visible", false)
        commentInput.value = ""
    }

    return {dialogClosed}
}