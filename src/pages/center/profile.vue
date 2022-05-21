<template>
  <el-container class="profile-container">
    <profile-edit v-model:visible="visible"></profile-edit>
    <el-row class="title-block" justify="space-between">
      <el-space>
        <el-icon :size="20" color="var(--el-color-primary)">
          <document/>
        </el-icon>
        <span class="world">个人资料</span>
      </el-space>
      <el-icon class="edit" :size="20" color="var(--el-text-color-secondary)" @click="editProfile">
        <edit/>
      </el-icon>
    </el-row>
    <el-space class="info-block" fill>
      <el-space class="title" size="large">
        <span class="divide"></span>
        <span class="word">基本信息</span>
      </el-space>
      <el-row class="area" justify="space-between" align="top">
        <el-space class="info" wrap :size="15" :spacer="spacer" alignment="start">
          <el-space v-for="item in infoMeta.slice(0,3)" :size="12" class="each" alignment="start">
            <span class="label">{{ item.label }}</span>
            <span class="word">{{ data[item.key] }}</span>
          </el-space>
        </el-space>
        <el-space class="info" wrap :size="15" :spacer="spacer" alignment="start">
          <el-space v-for="item in infoMeta.slice(3,)" :size="12" class="each" alignment="start">
            <span class="label">{{ item.label }}</span>
            <span class="word">{{ data[item.key] }}</span>
          </el-space>
        </el-space>
        <el-space class="info" :size="15" alignment="start">
          <el-space class="introduce each" :size="12" alignment="start">
            <span class="label">{{ "自我介绍" }}</span>
            <span class="word introduce">{{ data["introduce"] }}</span>
          </el-space>
        </el-space>
      </el-row>
      <el-upload
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
      >
        <el-avatar class="avatar" shape="square" :size="66" :src="imageUrl"></el-avatar>
        <el-row class="avatar-shadow" align="middle" justify="center">
          <el-icon :size="25" color="var(--el-color-white)"><CameraFilled /></el-icon>
        </el-row>
      </el-upload>
    </el-space>
    <el-space class="info-block" fill>
      <el-space class="title" size="large">
        <span class="divide"></span>
        <span class="word">标签与技能</span>
      </el-space>
      <el-row class="area" justify="space-between" align="top">
        <el-space class="info" v-for="item in webMeta">
          <el-space :size="12" class="each" alignment="start">
            <el-icon class="iconfont" :class="item.icon+' '+item.class"></el-icon>
            <span class="word">{{ data[item.key] }}</span>
          </el-space>
        </el-space>
        <el-space class="info" wrap style="margin-top: 12px">
          <el-space class="each" :size="12" wrap alignment="start">
            <span class="label">{{ "标签" }}</span>
            <el-tag type="info" v-for="item in data['tags'].split(';')">{{ item }}</el-tag>
          </el-space>
        </el-space>
      </el-row>
    </el-space>
  </el-container>
</template>

<script setup>
import {h, ref} from "vue"
import {ElDivider} from 'element-plus'
import {error} from "../../utils/message";
import ProfileEdit from "./component/profile-edit.vue"

const spacer = h(ElDivider, {direction: 'vertical'})
let visible = ref(false)
let imageUrl = ref('../../src/assets/images/boy.png')
let infoMeta = ref([{
  key: "nickname",
  label: "昵称"
}, {
  key: "name",
  label: "姓名"
}, {
  key: "sex",
  label: "性别"
}, {
  key: "location",
  label: "居住地"
}, {
  key: "school",
  label: "毕业院校"
}, {
  key: "email",
  label: "邮箱"
}])

let webMeta = ref([{
  key: "web",
  icon: "icon-earth",
  class: "net",
  label: "个人网站"
}, {
  key: "github",
  icon: "icon-github-fill",
  class: "github",
  label: "Github"
}, {
  key: "gitee",
  icon: "icon-gitee",
  class: "gitee",
  label: "Gitee"
}])

let data = ref({
  nickname: "刘小圆sama",
  sex: "男",
  name: "neo",
  location: "广东省深圳市",
  school: "中国海洋大学",
  email: "945212191@qq.com",
  introduce: "海纳百川，有容纳大",
  web: "https://www.matrix.com",
  github: "https://github.com/Liusiyuan-git",
  gitee: "https://gitee.com/Liusiyuan-git",
  tags: "go;云原生;python;宅；二次元;go;云原生;python;宅；二次元;go;云原生;python;宅；二次元"
})

function editProfile() {
  visible.value = true
}

function beforeAvatarUpload(rawFile){
  if (rawFile.type !== 'image/jpeg') {
    error('头像必须是 jpg 格式的')
    return false
  } else if (rawFile.size / 1024 / 1024 > 1) {
    error('图片大小不超过 1MB')
    return false
  }
  return true
}

</script>

<style scoped lang="scss">

.profile-container {
  width: 740px;
  padding: 16px 0;
  box-shadow: var(--el-box-shadow-lighter);
  background-color: var(--el-color-white);
  border-radius: 8px;
  flex-direction: column;

  ::v-deep(.editDialog) {
    border-radius: 8px;
    height: 680px;

    .el-dialog__body {
      padding: 18px 28px 20px;
      height: calc(100% - 154px);
      overflow: auto;
    }
  }

  .title-block {
    padding: 0 20px 14px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .world {
      font-size: 16px;
      line-height: 22px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }

    .edit:hover {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }

  .info-block {
    position: relative;
    padding: 16px 20px;

    .avatar {
      position: absolute;
      top: 16px;
      right: 40px;
      border-radius: 8px;
    }

    .avatar-shadow {
      opacity: 0;
      height: 66px;
      width: 66px;
      position: absolute;
      top: 16px;
      right: 40px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.3);
    }

    .avatar-shadow:hover{
      opacity: 1;
    }

    .title {
      font-size: 15px;
      line-height: 32px;

      .divide {
        width: 3px;
        height: 14px;
        border-radius: 5px;
        background: var(--el-color-primary);
      }
    }

    .area {
      width: 100%;
      position: relative;
      margin-left: 19px;

      .info {
        width: calc(100% - 66px);

        .each {
          min-height: 32px;

          .label {
            font-size: 14px;
            line-height: 20px;
            color: var(--el-text-color-secondary);
          }

          .word {
            font-size: 14px;
            line-height: 20px;
            color: var(--el-text-color-primary);
          }

          .introduce {
            width: 520px;
            word-break: break-all;
          }

          .net {
            color: var(--el-color-primary);
          }

          .github {
            color: var(--el-text-color-primary);
          }

          .gitee {
            color: #c71d24;
          }
        }
      }
    }
  }
}
</style>