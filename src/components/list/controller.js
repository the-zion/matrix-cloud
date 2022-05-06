import {variable} from "./variable.js"

export function controller() {
    let {mode, data} = variable()

    function initVariable() {
        return {data}
    }

    function init(props) {
        initData(props)
        getData()
    }

    function initData(props) {
        mode = props.mode
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
                        agree: 10000,
                        view: 12000,
                        comment: 1100,
                        collect: 500
                    })
                }
        }
    }

    return {initVariable, init}
}