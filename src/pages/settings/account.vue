<template>
  <el-container class="account-container">
    <!--    <security-edit v-model:visible="visible" v-bind:mode="mode"></security-edit>-->
    <account-bind v-model:visible="bindVisible" v-bind:mode="mode" @close="dialogClose"></account-bind>
    <account-unbind v-model:visible="unbindVisible" v-bind:mode="mode" :data="data"
                    @close="dialogClose"></account-unbind>
    <password-edit v-model:visible="passwordVisible" v-bind:mode="mode" @close="dialogClose"></password-edit>
    <el-row class="title-block" justify="space-between">
      <span class="world">账号设置</span>
    </el-row>
    <el-row class="body-block">
      <el-row class="each" justify="space-between" v-for="item in accountMeta">
        <el-row class="account" align="middle">
          <span class="label">{{ item.label }}</span>
          <span class="value">{{ data[item.key] || "未绑定" }}</span>
        </el-row>
        <span class="operation" @click="item.func">{{ data[item.key] ? "解绑" : "绑定" }}</span>
      </el-row>
      <el-row class="each" justify="space-between">
        <el-row class="account" align="middle">
          <span class="label">{{ "密码" }}</span>
          <span class="value">{{ data["password"] }}</span>
        </el-row>
        <span class="operation" @click="passWord">{{ data["password"] ? "更改" : "设置" }}</span>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import AccountBind from "./component/bind.vue"
import AccountUnbind from "./component/unbind.vue"
import PasswordEdit from "./component/password-edit.vue"
import {get} from "../../utils/axios";
import {error, success} from "../../utils/message";

let bindVisible = ref(false)
let unbindVisible = ref(false)
let passwordVisible = ref(false)
let mode = ref()

let accountMeta = ref([
  {
    key: "phone",
    label: "手机号",
    func: setPhone
  },
  {
    key: "email",
    label: "邮箱",
    func: setEmail
  },
  {
    key: "wechat",
    label: "微信",
  },
  {
    key: "qq",
    label: "QQ",
  },
  {
    key: "weibo",
    label: "新浪微博",
  },
  {
    key: "github",
    label: "Github",
  }
])

let data = ref({})

function setPhone() {
  mode.value = "phone"
  if (data.value["phone"]) {
    unbindVisible.value = true
  } else {
    bindVisible.value = true
  }
}

function setEmail() {
  mode.value = "email"
  if (data.value["email"]) {
    unbindVisible.value = true
  } else {
    bindVisible.value = true
  }
}

function passWord() {
  passwordVisible.value = true
  if (data.value["password"]) {
    mode.value = "change"
  } else {
    mode.value = "set"
  }
}

function init() {
  getData()
}

function getData() {
  get("/v1/get/user/account").then(function (reply) {
    data.value = reply.data
  }).catch(function () {
    error("账号信息获取失败")
  })
}

function dialogClose() {
  getData()
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.account-container {
  padding: 20px;
  background-color: var(--el-color-white);
  flex-direction: column;

  ::v-deep(.editDialog) {

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 32px 24px;
    }
  }

  .title-block {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .world {
      font-size: 18px;
      line-height: 22px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }
  }

  .body-block {
    width: 100%;

    .each {
      border-bottom: 1px solid var(--el-border-color-lighter);
      padding: 2rem 5px;
      width: 100%;

      .account {
        width: 90%;

        .label {
          width: 100px;
          font-size: 14px;
          color: var(--el-text-color-primary);
        }

        .value {
          font-size: 14px;
          color: var(--el-text-color-secondary);
        }
      }

      .operation {
        font-size: 14px;
        cursor: pointer;
        color: var(--el-color-primary)
      }
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
}
</style>