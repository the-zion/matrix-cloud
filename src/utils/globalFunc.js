
import {ElLoading} from 'element-plus'

export function globalFunc() {

    function loadFullScreen() {
        return ElLoading.service({
            text: "Loading...",
            lock: true,
        })
    }

    return {loadFullScreen}
}