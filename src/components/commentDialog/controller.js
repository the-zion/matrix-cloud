export function controller(emit) {
    function dialogClose() {
        emit("update:visible", false)
    }

    return {dialogClose}
}