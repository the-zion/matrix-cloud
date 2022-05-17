import {ref} from "vue"

export function initData() {
    const input = ref("")
    const routerJumpConfirm = ref(false)
    const editorId = `w-e-${Math.random().toString().slice(-5)}` //【注意】编辑器 id ，要全局唯一
    const defaultHtml = '一行文字'
    const toolbarConfig = {
        excludeKeys: [
            "fullScreen",
            "lineHeight",
            'group-video'
        ]
    }
    const editorConfig = {placeholder: '请输入内容...'}
    const visible = ref(false)
    const dialogDefine = ref()
    const backTopRight = ref()

    return {
        input, routerJumpConfirm, editorId, defaultHtml, toolbarConfig, editorConfig, visible,
        dialogDefine, backTopRight
    }

}