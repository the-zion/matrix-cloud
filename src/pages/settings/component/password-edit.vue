<template>
  <el-dialog v-model="props.visible" custom-class="editDialog" :width="400"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ title }}</el-row>
    <el-row class="description" justify="center">{{ description }}</el-row>
    <Password @open="subOpen" v-bind:mode="props.mode"></Password>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save" :loading="loading"
            >保存</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "PasswordEdit"
}
</script>

<script setup>
import {ref} from "vue"
import {success, error} from "../../../utils/message";
import Password from "./password.vue"
import {post} from "../../../utils/axios";
import {loginTimeOut} from "../../../utils/globalFunc";

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
  mode: String,
})

let title = ref("")
let description = ref("")
let loading = ref()
let mode = ref("")
let form = null
let formRef = null

function open() {
  initData()
}

function initData() {
  loading.value = false
  title.value = "密码设置"
  mode.value = props.mode
  if (mode.value === "change") {
    description.value = "为了保护你的帐号安全，请输入旧密码，以便于后续验证"
  } else {
    description.value = "请输入新密码以完成密码设置"
  }
}

function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}

function subOpen(f, r) {
  form = f
  formRef = r
}

function save() {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("提交的信息有误，请检查")
    } else {
      setPassword()
      return true
    }
  })
}

function setPassword() {
  loading.value = true
  post(mode.value === "set" ? "/v1/set/user/password" : "/v1/change/user/password", {
    oldpassword: form.oldpassword,
    password: form.password
  }).then(function () {
    success("密码设置成功")
    close()
  }).catch(function (err) {
    let msg = "密码设置失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "TOKEN_EXPIRED":
          loginTimeOut()
          return
        case "VERIFY_PASSWORD_FAILED":
          msg = "旧密码验证错误"
          break
      }
    }
    error(msg)
    loading.value = false
  })
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