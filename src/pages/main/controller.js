import router from '../../router/index'

export function controller(showSearch, messageValue) {

    function showSearchClick() {
        showSearch.value = !showSearch.value
    }

    function searchBlur() {
        showSearchClick()
    }

    function messageCount(value) {
        return value === 0
    }

    function add() {
        messageValue.value += 1
    }

    function login() {
        router.push({name: 'login'})
    }

    return {showSearchClick, searchBlur, messageCount, add, login}
}