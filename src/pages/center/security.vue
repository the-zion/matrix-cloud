<template>
  <el-container class="security-container">
    <security-edit v-model:visible="visible" v-bind:mode="mode"></security-edit>
    <el-row class="title" align="middle">账号信息</el-row>
    <el-row v-for="item in accountMeta" class="each">
      <el-row class="account" align="middle">
        <el-row class="label" align="middle">{{ item.label }}</el-row>
        <el-row class="word" align="middle" :class="{'unset':accountMeta[item.key] === ''}">{{
            accountData[item.key] || "未设置"
          }}
        </el-row>
      </el-row>
      <el-space class="operate" @click="(visible = true) && (mode = item.key)">
        <el-icon>
          <edit-pen/>
        </el-icon>
        <span>编辑</span>
      </el-space>
    </el-row>
    <el-row class="title" align="middle">关联第三方账号</el-row>
    <el-row v-for="item in connectMeta" class="each">
      <el-row class="account" align="middle">
        <el-icon class="iconfont icon" :color="item.color" :class="item.icon"></el-icon>
        <el-row class="label" align="middle">{{ item.label }}</el-row>
        <el-row class="word" align="middle" :class="{'unset':!connectData[item.key]}">
          {{ connectData[item.key] === 1 ? "已关联" : "未关联" }}
        </el-row>
      </el-row>
      <el-space class="operate">
        <el-icon>
          <connection/>
        </el-icon>
        <span>关联</span>
      </el-space>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import SecurityEdit from "./component/security-edit.vue"

let visible = ref(false)
let mode = ref()

let accountMeta = ref([
  {
    key: "email",
    label: "邮箱",
  },
  {
    key: "phone",
    label: "手机号",
  },
  {
    key: "password",
    label: "密码",
  }
])

let connectMeta = ref([
  {
    key: "qq",
    label: "QQ",
    icon: "icon-QQ",
    color: "rgb(74, 154, 253)",
    func: connectQQ
  },
  {
    key: "wechat",
    label: "微信",
    icon: "icon-wechat-fill",
    color: "rgb(0, 202, 0)",
    func: connectWechat
  },
  {
    key: "weibo",
    label: "微博",
    icon: "icon-weibo",
    color: "rgb(233, 14, 36)",
    func: connectWeibo
  },
  {
    key: "github",
    label: "Github",
    icon: "icon-github-fill",
    color: "var(--el-color-black)",
    func: connectGithub
  }
])

let accountData = ref({
  email: "945212191@qq.com",
  phone: "19907740758",
  password: "********"
})

let connectData = ref({})

function connectQQ() {

}

function connectWechat() {

}

function connectWeibo() {

}

function connectGithub() {

}
</script>

<style scoped lang="scss">
.security-container {
  width: 740px;
  box-shadow: var(--el-box-shadow-lighter);
  background-color: var(--el-color-white);
  border-radius: 8px;
  flex-direction: column;

  ::v-deep(.editDialog) {

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 32px 24px;
    }
  }

  .title {
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    width: 100%;
    padding: 0 20px;
    height: 48px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .each {
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .account {
      width: calc(100% - 60px);
    }

    .operate {
      color: var(--el-text-color-regular);
      font-size: 13px;
      width: 60px;
      cursor: pointer;
    }

    .operate:hover {
      color: var(--el-color-primary);
    }

    .label {
      font-size: 14px;
      width: 110px;
      color: var(--el-text-color-regular);
    }

    .word {
      font-size: 14px;
      color: var(--el-text-color-primary);
    }

    .unset {
      color: var(--el-text-color-disabled);
    }

    .icon {
      margin-right: 8px;
      font-size: 20px;
    }
  }
}
</style>