import {ElMessage} from "element-plus"
import {globalFunc} from "../../utils/globalFunc"

export function controller(visible, dialogDefine) {
    const {item, getClassList} = globalFunc()
    console.log(item)
    const classList = getClassList()

    function save() {

    }

    function send() {
        visible.value = true
        dialogDefine.value = {
            title: "文章发布",
            top: "10vh",
            width: "40%",
            mode: "form",
            position: "right",
            footBtn: [{
                name: "取消",
                click: function () {

                },
            }, {
                name: "发布",
                type: "primary",
                click: function () {

                },
            }],
            beforeClose: function () {
                visible.value = !visible.value
            },
            formDefine: {
                form: [{
                    key: "class",
                    component: "el-select",
                    placeholder: "选择大类",
                    label: "选择大类",
                    labelWidth: '70px',
                    style: "width:calc(100% - 70px)",
                    options: classList,
                    change: function (value) {
                        classList.forEach(function (item) {
                            if (item.value === value) {
                                dialogDefine.value.formDefine.form[1].options = item.children
                                dialogDefine.value.formDefine.data.subclass = item.children[0].value
                            }
                        })
                    }
                }, {
                    key: "subclass",
                    component: "el-select",
                    placeholder: "选择子类",
                    label: "选择子类",
                    labelWidth: '70px',
                    style: "width:calc(100% - 70px)",
                    options: classList[0].children
                }, {
                    key: "column",
                    component: "el-select",
                    placeholder: "可选",
                    label: "所属专栏",
                    labelWidth: '70px',
                    style: "width:calc(100% - 70px)",
                    options: []
                }, {
                    key: "cover",
                    component: "el-upload",
                    label: "封面",
                    labelWidth: '70px',
                    style: "width:calc(100% - 70px)",
                    imageStyle: "width:396px; height: 230px;border-radius:5px",
                    onChange: function (fileObject) {
                        let file = fileObject.raw
                        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
                        const isLt2M = file.size / 1024 / 1024 < 2

                        if (!isJPG) {
                            ElMessage.error('只能上传 JPG/PNG/GIF 格式的图片!')
                        }
                        if (!isLt2M) {
                            ElMessage.error('图片大小不得大于 2MB!')
                        }
                        dialogDefine.value.formDefine.data.image = URL.createObjectURL(file)
                        return isJPG && isLt2M
                    }
                }],
                data: {class: "language", subclass: "python"},
            }
        }
    }

    return {save, send}

}