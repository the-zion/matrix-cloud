<template>
  <el-image class="background" :src="'../../src/assets/images/carousel2.png'" :fit="'cover'"></el-image>
  <el-row class="body">
    <el-row class="image-block" justify="center" align="middle">
      <el-avatar shape="square" :size="160" src="../src/assets/images/user.jpg"></el-avatar>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "CubeUserInfo",
}
</script>
<script setup>
import {ref} from "vue"
import {ElMessage} from "element-plus";
import {initData} from "./initData.js"

const {provinces} = initData()
const visible = ref(false)
const dialogDefine = ref({
  title: "设置",
  width: "30%",
  mode: "form",
  footBtn: [{
    name: "取消",
    click: function () {
      visible.value = !visible.value
    },
  }, {
    name: "确认",
    type: "primary",
    click: function () {
      visible.value = !visible.value
      let formData = dialogDefine.value.formDefine.data
      if (formData.tag.length > 10) {
        ElMessage.error("标签不能超过10个")
      }
    },
  }],
  beforeClose: function () {
    visible.value = !visible.value
  },
  formDefine: {
    form: [{
      key: "image",
      labelWidth: '0px',
      align: "middle",
      justify: "center",
      style: "width:100%",
      size: 105,
      type: "avatar",
      component: "el-upload",
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

    }, {
      key: "name",
      component: "el-input",
      label: "名字",
      placeholder: "来起一个好听的名字吧~",
      labelWidth: '70px',
      maxlength: 10,
      style: "width:calc(100% - 70px)",
    }, {
      key: "introduce",
      component: "el-input",
      placeholder: "让大家更好认识你（30个字）",
      label: "个人简介",
      labelWidth: '70px',
      maxlength: 30,
      style: "width:calc(100% - 70px)",
    }, {
      key: "location",
      component: "el-cascader",
      placeholder: "选择你的位置",
      label: "位置",
      labelWidth: '70px',
      options: provinces,
      showAllLevels: false,
      filterable: true,
      style: "width:calc(100% - 70px)",
    },
      {
        key: "tag",
        style: "width:calc(100% - 70px)",
        component: "el-tag",
        labelWidth: '70px',
        placeholder: "请输入",
        label: "标签",
      }],
    data: {image: "../src/assets/images/user.jpg", name: "", introduce: "", location: "", tag: []}
  }
})

</script>

<style scoped lang="scss">
.background {
  height: 132px;
  width: 100%;
}

.body {
  position: relative;
  margin: 0 20px 24px;
  width: 100%;
  height: calc(100% - 156px);

  .image-block {
    position: absolute;
    border-radius: 8px;
    top: -74px;
    left: 0;
    width: 168px;
    height: 168px;
    background: var(--el-color-white);
  }
}
</style>