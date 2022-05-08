import {variable} from "./variable.js"

export function controller() {

    let {data, list, visible, scroll, bar} = variable()
    let element = null

    function initVariable() {
        return {data, list, visible, scroll, bar}
    }

    function init() {
        initData()
        getData()
        getList()
    }

    function initData() {
        element = document.getElementById('scroll')
        console.log(element)
    }

    function getData() {
        data.value = {
            "follow": 2,
            "follower": 36
        }
    }

    function getList() {
        for (let i = 0; i <= 9; i++) {
            list.value.push({
                name: "刘小圆sama",
                introduce: "海纳百川，有容乃大",
                image: '../src/assets/images/boy.png'
            })
        }
    }

    function select(each) {
        bar.value.forEach(function (item) {
            item.select = item.key === each.key
        })
    }

    function dataLoad() {
        visible.value = false
        setTimeout(function () {
                setTimeout(function () {
                    visible.value = true
                    getList()
                }, 2000)
                scroll.value.setScrollTop(element.scrollHeight)
            }, 10
        )
    }

    return {initVariable, init, select, dataLoad}
}