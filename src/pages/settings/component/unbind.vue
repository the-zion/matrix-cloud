<template>
  <el-dialog v-model="props.visible" custom-class="editDialog" :width="400"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ "身份验证" }}</el-row>
    <el-row class="description" justify="center">{{ "为了保护你的帐号安全，请验证身份，验证成功后进行下一步操作" }}</el-row>
    <identity-verification @open="subOpen" :data="props.data" v-model:mode="props.mode"></identity-verification>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button v-if="form.choose === 'phone' || form.choose === 'email' || form.choose === 'password'"
                   type="primary"
                   @click="unbind" :loading="loading">解绑</el-button>
        <el-button v-else type="primary" @click="nextStep">验证</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "AccountUnbind"
}
</script>

<script setup>
import {ref} from "vue";
import {post} from "../../../utils/axios";
import {confirm, error, success} from "../../../utils/message";
import IdentityVerification from "./identity.vue"
import {checkEmail, checkPhone} from "../../../utils/check";
import {wechat, qq, gitee, github} from "../../../utils/oauth";

let loading = ref()
let form = ref({})
let formRef = {}

const emits = defineEmits(["update:visible"])
const props = defineProps({
  mode: String,
  visible: Boolean,
  data: Object
})

function open() {
  initData()
}

function initData() {
  loading.value = false
}

function subOpen(f, r) {
  form.value = f
  formRef = r
}

function nextStep() {
  confirm("解绑后将不能以此账号登录").then(function (){
    switch (form.value.choose) {
      case "wechat":
        wechat("unbind@" + props.mode + "@wechat@", import.meta.env.VITE_WECHAT_ACCOUNT_URL)
        break
      case "qq":
        qq("unbind@" + props.mode + "@qq@", import.meta.env.VITE_QQ_ACCOUNT_URL)
        break
      case "gitee":
        gitee("unbind@" + props.mode + "@gitee@", import.meta.env.VITE_GITEE_ACCOUNT_URL)
        break
      case "github":
        github("unbind@" + props.mode + "@github@", import.meta.env.VITE_GITHUB_ACCOUNT_URL)
        break
    }
  })
}

function unbind() {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("提交的信息有误，请检查")
    } else {
      confirm("解绑后将不能以此账号登录").then(function () {
        switch (props.mode) {
          case "phone":
            unbindAccount("/v1/unbind/user/phone", form.value, "手机号解绑成功", "手机号解绑失败")
            break
          case "email":
            unbindAccount("/v1/unbind/user/email", form.value, "邮箱解绑成功", "邮箱解绑失败")
            break
          case "wechat":
            unbindAccount("/v1/unbind/user/wechat", form.value, "微信解绑成功", "微信解绑失败")
            break
          case "qq":
            unbindAccount("/v1/unbind/user/qq", form.value, "QQ解绑成功", "QQ解绑失败")
            break
          case "gitee":
            unbindAccount("/v1/unbind/user/gitee", form.value, "Gitee解绑成功", "Gitee解绑失败")
            break
          case "github":
            unbindAccount("/v1/unbind/user/github", form.value, "Github解绑成功", "Github解绑失败")
            break
        }
      })
      return true
    }
  })
}

function unbindAccount(url, form, msg, failMsg) {
  return new Promise((resolve, reject) => {
    loading.value = true
    if (form.choose === "password" && checkPhone(form.account)) {
      form.mode = "phone"
    }
    if (form.choose === "password" && checkEmail(form.account)) {
      form.mode = "email"
    }
    post(url, form).then(function () {
      success(msg)
      close()
      resolve()
    }).catch(function (err) {
      let msg = failMsg
      let response = err.response
      if (response) {
        switch (response.data.reason) {
          case "UNIQUE_ACCOUNT":
            msg = "解绑失败：唯一可登录账号不能解绑"
            break
          case "VERIFY_CODE_FAILED":
            msg = "解绑失败：验证码错误"
                break
          case "VERIFY_PASSWORD_FAILED":
            msg = "解绑失败：密码错误"
            break
        }
      }
      error(msg)
      loading.value = false
      reject()
    })
  })
}

function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}


defineExpose({
  unbindAccount
})
</script>

<style scoped lang="scss">
.editDialog {
  .title {
    margin-top: 8px;
    font-size: 24px;
    color: var(--el-text-color-primary);
  }

  .description {
    margin: 2px auto 24px;
    font-size: 14px;
    color: #8590a6;
    max-width: 240px;
    line-height: 25px;
    text-align: center;
  }
}
</style>