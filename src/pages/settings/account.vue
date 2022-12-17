<template>
  <el-container class="account-container">
    <!--    <security-edit v-model:visible="visible" v-bind:mode="mode"></security-edit>-->
    <account-bind ref="bindRef" v-model:visible="bindVisible" v-bind:mode="mode" @close="dialogClose"></account-bind>
    <account-unbind ref="unbindRef" v-model:visible="unbindVisible" v-bind:mode="mode" :data="data"
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
import {onBeforeMount, onMounted, ref} from "vue"
import AccountBind from "./component/bind.vue"
import AccountUnbind from "./component/unbind.vue"
import PasswordEdit from "./component/password-edit.vue"
import {get} from "../../utils/axios";
import {error, success} from "../../utils/message";
import {wechat, qq, gitee, github} from "../../utils/oauth";
import {useRoute} from "vue-router/dist/vue-router";
import {wordCheck} from "../../utils/secret";
import router from "../../router";

let bindVisible = ref(false)
let unbindVisible = ref(false)
let bindRef = ref()
let unbindRef = ref()
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
    func: setWechat
  },
  {
    key: "qq",
    label: "QQ",
    func: setQQ
  },
  {
    key: "gitee",
    label: "Gitee",
    func: setGitee
  },
  {
    key: "github",
    label: "Github",
    func: setGithub
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

function setWechat() {
  mode.value = "wechat"
  if (data.value["wechat"]) {
    unbindVisible.value = true
  } else {
    wechat("bind@wechat@wechat@", import.meta.env.VITE_WECHAT_ACCOUNT_URL)
  }
}

function setQQ() {
  mode.value = "qq"
  if (data.value["qq"]) {
    unbindVisible.value = true
  } else {
    qq("bind@qq@qq@", import.meta.env.VITE_QQ_ACCOUNT_URL)
  }
}

function setGitee() {
  mode.value = "gitee"
  if (data.value["gitee"]) {
    unbindVisible.value = true
  } else {
    gitee("bind@gitee@gitee@", import.meta.env.VITE_GITEE_ACCOUNT_URL)
  }
}

function setGithub() {
  mode.value = "github"
  if (data.value["github"]) {
    unbindVisible.value = true
  } else {
    github("bind@github@github@", import.meta.env.VITE_GITHUB_ACCOUNT_URL)
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
  bindAndUnbind()
}

function getData() {
  get("/v1/get/user/account").then(function (reply) {
    data.value = reply.data
  }).catch(function () {
    error("账号信息获取失败")
  })
}

function bindAndUnbind() {
  if (!useRoute().query["state"]) {
    return
  }

  if (!useRoute().query["code"]) {
    error("error", "绑定失败，关键参数缺失")
    return
  }
  let state = useRoute().query["state"].split("@")
  if (!stateCheck(state[3])) {
    error("error", "登录失败，参数校验失败")
    return
  }

  switch (state[0]) {
    case "bind":
      bindAccount(state[1], useRoute().query["code"])
      break
    case "unbind":
      unbindAccount(state[1], state[2], useRoute().query["code"])
      break
  }
}

function bindAccount(account, code){
  bindRef.value.setAccount("/v1/set/user/" + account, {
    code: code,
    redirect_url: import.meta.env["VITE_" + account.toUpperCase() + "_ACCOUNT_URL"]
  }, "账号绑定成功", "账号绑定失败").then(function (){
    getData()
  })
  router.push({name: "settings.account"})
}

function unbindAccount(account, choose, code){
  unbindRef.value.unbindAccount("/v1/unbind/user/" + account, {
    choose: choose,
    code: code,
    redirect_uri: import.meta.env["VITE_" + account.toUpperCase() + "_ACCOUNT_URL"]
  }, "账号解绑成功", "账号解绑失败").then(function (){
    getData()
  })
  router.push({name: "settings.account"})
}

function stateCheck(state) {
  return wordCheck(state)
}

function dialogClose() {
  getData()
}

onMounted(function () {
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