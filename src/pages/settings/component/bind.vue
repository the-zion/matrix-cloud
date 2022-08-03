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
import {ref} from "vue";
import Email from "./email.vue"
import Phone from "./phone.vue"
import {post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";

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
  if (mode.value === 'phone') {
    setPhone()
  } else {
    setEmail()
  }
}

function setPhone() {
  loading.value = true
  post("/v1/set/user/phone", {phone: form.phone, code: form.code}).then(function () {
    success("手机号设置成功")
    close()
  }).catch(function (err) {
    let msg = "手机号设置失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "PHONE_CONFLICT":
          msg = "该账号已存在"
          break
        case "VERIFY_CODE_FAILED":
          msg = "验证码错误"
          break
      }
    }
    error(msg)
    loading.value = false
  })
}

function setEmail() {
  loading.value = true
  post("/v1/set/user/email", {email: form.email, code: form.code}).then(function () {
    success("邮箱设置成功")
    close()
  }).catch(function (err) {
    let msg = "邮箱设置失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "EMAIL_CONFLICT":
          msg = "该账号已存在"
          break
        case "VERIFY_CODE_FAILED":
          msg = "验证码错误"
          break
      }
    }
    error(msg)
    loading.value = false
  })
}


function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}
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