import {ref} from 'vue'
import router from '../../router/index'

export function controller(showSearch, messageValue) {

    function visitor() {
        router.push({name: 'home'})
    }

    return {visitor}
}