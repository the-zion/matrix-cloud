import {useRoute} from "vue-router";

export function controller(route) {

    function init() {
        route.value = useRoute().name
    }

    function viewCount() {
        return false
    }

    function startCount() {
        return false
    }

    function likeCount() {
        return false
    }

    return {init, viewCount, startCount, likeCount}

}