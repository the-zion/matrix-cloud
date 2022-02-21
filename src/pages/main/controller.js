import router from '../../router/index'

export function controller(activeColor, showSearch, messageValue) {

    function menuSelect() {
        activeColor.value = "#409eff"
    }

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

    function dropdownClick(item) {
        activeColor.value = "var(--el-menu-text-color)"
        router.push({name: item})
    }

    return {menuSelect, showSearchClick, searchBlur, messageCount, add, login, dropdownClick}
}