import {ref} from 'vue'

export function controller() {
    let handleClick = function (tab, event) {
        console.log(tab, event)
    }

    return {handleClick}
}