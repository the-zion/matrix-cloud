export function controller(backTop) {
    function upToTop() {
        backTop.value.handleClick()
    }

    return {upToTop}
}