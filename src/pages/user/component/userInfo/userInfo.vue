<template>
  <el-row>
    <el-space fill class="body" size="large">
      <el-row justify="center" class="base-info">
        <el-row class="setting" justify="end">
          <cube-dialog :visible="visible" :define="dialogDefine"></cube-dialog>
          <el-icon @click="visible = !visible">
            <setting/>
          </el-icon>
        </el-row>
        <el-space direction="vertical" :size="25">
          <el-avatar :size="104" src="../src/assets/images/user.jpg"></el-avatar>
          <el-space fill :size="8">
            <el-row class="name" justify="center">刘思圆</el-row>
            <el-row class="introduce" justify="center">海纳百川，有容乃大</el-row>
            <el-row justify="center">
              <el-button type="primary">+ 关注</el-button>
            </el-row>
          </el-space>
          <el-space size="large" class="info" fill>
            <el-space>
              <el-icon>
                <location/>
              </el-icon>
              <el-row class="info-word">浙江省杭州市</el-row>
            </el-space>
            <el-space>
              <el-icon>
                <plus/>
              </el-icon>
              <el-row class="info-word">关注数：120</el-row>
            </el-space>
            <el-space>
              <el-icon>
                <user/>
              </el-icon>
              <el-row class="info-word">粉丝数：120</el-row>
            </el-space>
            <el-space>
              <el-icon class="iconfont icon-like icon"></el-icon>
              <el-row class="info-word">获赞数：120</el-row>
            </el-space>
            <el-space>
              <el-icon><View /></el-icon>
              <el-row class="info-word">阅读数：120</el-row>
            </el-space>
          </el-space>
        </el-space>
      </el-row>
      <el-row>
        <el-descriptions title="标签">
          <el-descriptions-item>
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-tag size="small" type="success">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-tag size="small" type="info">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-tag size="small" type="warning">School</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
    </el-space>
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
      component: "el-upload",
      onChange: function (fileObject) {
        debugger
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
.body {
  width: 100%;

  .base-info {
    border-bottom: 1px solid var(--el-border-color-base);

    .setting {
      width: 100%;
      font-size: 20px;
      color: #909399;
      cursor: pointer;
    }

    .name {
      font-size: 20px;
    }

    .introduce {
      font-size: 13px;
      font-weight: 100;
    }

    .info {
      width: 200px;

      .icon {
        color: var(--el-text-color-secondary);
        height: 1em;
        width: 1em;
        cursor: pointer
      }

      .info-word {
        font-size: 14px;
      }
    }
  }
}
</style>