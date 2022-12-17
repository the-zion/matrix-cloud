<template>
  <el-dialog v-model="props.visible" custom-class="editDialog" :width="400"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ title }}</el-row>
    <el-row class="description" justify="center">{{ description }}</el-row>
    <Email v-if="mode === 'email'" @open="subOpen"></Email>
    <Phone v-if="mode === 'phone'" @open="subOpen"></Phone>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="set" :loading="loading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "AccountBind"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue";
import Email from "./email.vue"
import Phone from "./phone.vue"
import {post} from "../../../utils/axios";
import {confirm, error, success} from "../../../utils/message";
import {useRoute} from "vue-router/dist/vue-router";
import {wordCheck} from "../../../utils/secret";

let mode = ref("")
let title = ref("")
let description = ref("")
let loading = ref()
let form = null
let formRef = null

const emits = defineEmits(["update:visible"])
const props = defineProps({
  mode: String,
  visible: Boolean
})

function open() {
  initData()
}

function initData() {
  mode.value = props.mode
  loading.value = false
  switch (mode.value) {
    case "email":
      title.value = "邮箱设置"
      description.value = "请输入邮箱账号与验证码完成邮箱设置"
      break
    case "phone":
      title.value = "手机号设置"
      description.value = "请输入手机号与验证码完成手机号设置"
      break
  }
}

function subOpen(f, r) {
  form = f
  formRef = r
}

function set() {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("提交的信息有误，请检查")
    } else {
      switch (mode.value) {
        case "phone":
          setAccount("/v1/set/user/phone", {phone: form.phone, code: form.code}, "手机号设置成功", "手机号设置失败")
          break
        case "email":
          setAccount("/v1/set/user/email", {email: form.email, code: form.code}, "邮箱设置成功", "邮箱设置失败")
          break
      }
      return true
    }
  })
}

function setAccount(url, form, msg, failMsg) {
  return new Promise((resolve, reject) => {
    loading.value = true
    post(url, form).then(function () {
      success(msg)
      close()
      resolve()
    }).catch(function (err) {
      let msg = failMsg
      let response = err.response
      if (response) {
        switch (response.data.reason) {
          case "PHONE_CONFLICT":
            msg = "该手机号已被绑定"
            break
          case "EMAIL_CONFLICT":
            msg = "该邮箱已被绑定"
            break
          case "WECHAT_CONFLICT":
            msg = "该微信已被绑定"
            break
          case "QQ_CONFLICT":
            msg = "该QQ已被绑定"
            break
          case "GITEE_CONFLICT":
            msg = "该Gitee已被绑定"
            break
          case "GITHUB_CONFLICT":
            msg = "该Github已被绑定"
            break
          case "VERIFY_CODE_FAILED":
            msg = "验证码错误"
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
  setAccount
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