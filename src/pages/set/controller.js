
export function controller(classList, currentPage) {

    function classSelect(index) {
        currentPage.value = classList.value[index].value
    }

    return {
        classSelect
    }

}