import {variable} from "./variable.js"
let {data, achievement, skills, visible} = variable()

export function initVariable() {
    return {data, achievement, skills, visible}
}

export function init() {
    initData()
}

function initData() {
    data.value = {
        follow: 2,
        follower: 36,
        profile: "vegetable chicken 我不会GO，如果看到我的提交记录是GO写的，说明那天我摸了复制了代码打卡",
        sex: "男",
        location: "广东省深圳市",
        school: "中国海洋大学",
        industry: "互联网",
        email: "945212191@qq.com"
    }

    achievement.value = {
        view: "18.8k",
        agree: "361",
        collect: "329",
    }

    skills.value = [
        "go", "kubernetes", "docker", "云原生", "javascript", "python"
    ]
}

export function follow() {
    visible.value = true
}

export function followDialogClose() {
    visible.value = false
}