<template>
  <el-dialog v-model="props.visible" custom-class="editDialog" :width="400"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ "身份验证" }}</el-row>
    <el-row class="description" justify="center">{{ "为了保护你的帐号安全，请验证身份，验证成功后进行下一步操作" }}</el-row>
    <identity-verification @open="subOpen" :data="props.data" :mode="props.mode"></identity-verification>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="unbind" :loading="loading">解绑</el-button>
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

let mode = ref("")
let loading = ref()
let form = null
let formRef = null

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
  mode.value = props.mode
  loading.value = false
}

function subOpen(f, r) {
  form = f
  formRef = r
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
        if (mode.value === 'phone') {
          unbindPhone()
        } else {
          unbindEmail()
        }
      })
      return true
    }
  })
}

function unbindPhone() {
  loading.value = true
  post("/v1/unbind/user/phone", {phone: form.phone, code: form.code}).then(function () {
    success("手机号解绑成功")
    close()
  }).catch(function (err) {
    let msg = "手机号解绑失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "UNIQUE_ACCOUNT":
          msg = "解绑失败：唯一可登录账号不能解绑"
          break
        case "VERIFY_CODE_FAILED":
          msg = "解绑失败：验证码错误"
          break
      }
    }
    error(msg)
    loading.value = false
  })
}

function unbindEmail() {
  loading.value = true
  post("/v1/unbind/user/email", {email: form.email, code: form.code}).then(function () {
    success("邮箱解绑成功")
    close()
  }).catch(function (err) {
    let msg = "邮箱解绑失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "UNIQUE_ACCOUNT":
          msg = "解绑失败：唯一可登录账号不能解绑"
          break
        case "VERIFY_CODE_FAILED":
          msg = "解绑失败：验证码错误"
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