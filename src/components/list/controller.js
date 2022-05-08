import {variable} from "./variable.js"
import {watch} from "vue";

export function controller() {
    let {data, currentPage} = variable()
    let mode = null
    let emit = null

    watch(currentPage, (value) => {
        emit("current-page", "")
    })

    function initVariable() {
        return {data, currentPage}
    }

    function init(props, emits) {
        initData(props, emits)
        getData()
    }

    function initData(props, emits) {
        mode = props.mode
        emit = emits
    }

    function getData() {
        switch (mode) {
            case 1:
                for (let i = 0; i <= 9; i++) {
                    data.value.push({
                        title: "迭代法实现二叉树的前序、中序和后序遍历",
                        avatar: "../src/assets/images/boy.png",
                        image: "../src/assets/images/img.png",
                        name: "刘小圆sama",
                        time: "2022-05-06",
                        content: "本文的目的是为了总结出一个通用的，改动较少的非递归模板，可以分别适用于二叉树的前序、中序和后续遍历，方便记忆。前序遍历前序遍历的遍历顺序为：根 -> 左 -> 右。只要有左子树，就把左子树入栈，同时把值加入答案数组，然后依次弹出栈顶元素，移动到它的右子树，重复操作。「代码块」中序遍历中序遍历的遍",
                        tags: "go;云原生",
                        agree: 10000,
                        view: 12000,
                        comment: 1100,
                        collect: 500
                    })
                }
                break
            case 2:
                for (let i = 0; i <= 9; i++) {
                    data.value.push({
                        title: "数组和字符串",
                        avatar: "../src/assets/images/boy.png",
                        image: "../src/assets/images/img.png",
                        name: "刘小圆sama",
                        time: "2022-05-06",
                        content: "简介：数组是数据结构中的基本模块之一。因为字符串是由字符数组形成的，所以二者是相似的。大多数面试问题都属于这个范畴。",
                        tags: "go;云原生",
                        agree: 10000,
                        view: 12000,
                        comment: 1100,
                        collect: 500
                    })
                }
                break
            case 3:
                for (let i = 0; i <= 9; i++) {
                    data.value.push({
                        title: "Shopee 送命题：进程切换为什么比线程切换慢",
                        avatar: "../src/assets/images/boy.png",
                        // image: "../src/assets/images/img.png",
                        name: "刘小圆sama",
                        time: "2022-05-06",
                        content: "这个问题挺有区分度的，我也是昨天整理面经才看见的这道题。 注意这里问的是为什么进程切换比线程慢，而不是问为什么进程比线程慢。当然这里的线程",
                        tags: "go;云原生",
                        agree: 10000,
                        view: 12000,
                        comment: 1100,
                        collect: 500
                    })
                }
                break
        }
    }

    return {initVariable, init}
}