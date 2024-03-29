<template>
  <el-row class="code">
    <el-row class="title">验证码登录</el-row>
    <el-form :model="form" class="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item prop="phone">
        <el-input class="inputPhone" v-model="form.phone" type="text" :maxlength="50" show-word-limit placeholder="输入手机号">
          <template #prepend>
            <el-row>+86</el-row>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input class="inputCode" v-model="form.code" type="text" :maxlength="6" show-word-limit placeholder="验证码">
          <template #append>
            <el-row v-show="!codeSending" :style="{width: width + 'px'}" style="cursor:pointer;" @click="sendCode">
              {{ text + (interval ? ' 秒后可重发' : '') }}
            </el-row>

            <el-button v-show="codeSending" class="sending" type="primary" loading>发送中</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-row class="button-block">
      <el-button class="button" color="rgb(36, 37, 40)" size="large" :loading="loading" @click="login(formRef)">登录/注册
      </el-button>
    </el-row>
    <el-row class="choose-block" justify="space-between">
      <el-row style="cursor: pointer" @click="mode('account')">账号密码登录</el-row>
      <el-row style="cursor: pointer" @click="mode('register')">邮箱注册</el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixLoginCode"
}
</script>

<script setup>
import {ref} from "vue"
import {success, error} from "../../../utils/message"
import {validatePhone, validateCode, checkPhone} from "../../../utils/check"
import {post} from "../../../utils/axios"
import {userMainStore} from "../../../store/user";

const userStore = userMainStore()
const emits = defineEmits(["update:mode", "close"])

let width = ref(68)
let text = ref("获取验证码")
let codeSending = ref(false)

let interval = ref(null)
let loading = ref(false)
let form = ref({
  phone: "",
  code: ""
})
let formRef = ref()

const rules = ref({
  phone: [{validator: validatePhone, trigger: 'blur'}],
  code: [{validator: validateCode, trigger: 'blur'}],
})

function sendCode() {
  if (interval.value || !checkPhone(form.value.phone)) {
    interval.value || error("手机号有误，请检查")
    return null
  }
  codeSending.value = true
  post("/v1/user/code/phone", {phone: form.value.phone, template: "1"}).then(function () {
    success("验证码已发送")
    countDown()
  }).catch(function () {
    error("验证码发送失败")
    codeSending.value = false
  })
}

function countDown() {
  let countdown = 120
  codeSending.value = false
  width.value = 90
  text.value = countdown
  interval.value = setInterval(() => {
    countdown--
    text.value = countdown
    if (countdown === 0) {
      cancelInterval()
    }
  }, 1000)
}

function cancelInterval() {
  if (!interval.value) {
    return null
  }
  width.value = 68
  text.value = "获取验证码"
  clearInterval(interval.value)
  interval.value = null
}

function mode(mode) {
  cancelInterval()
  emits("update:mode", mode)
}

function login(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("手机号或验证码有误，请检查")
    } else {
      loginByCode()
      return true
    }
  })
}

function loginByCode() {
  loading.value = true
  post("/v1/user/login/code", {phone: form.value.phone, code: form.value.code}).then(function (reply) {
    localStorage.setItem(import.meta.env.VITE_MATRIX_TOKEN_KEY, reply.data.token)
    success("登录成功")
    userStore.getUserProfile()
    closeDialog()
  }).catch(function (err) {
    let msg = "登录失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "VERIFY_CODE_FAILED":
          msg = "登录失败：验证码错误"
          break
      }
    }
    error(msg)
    loading.value = false
  })
}

function closeDialog() {
  emits("close", "")
}

</script>

<style scoped lang="scss">

.code {
  width: 100%;

  .title {
    color: var(--el-text-color-primary);
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    margin-top: 32px;
    margin-bottom: 24px;
    width: 100%;
  }

  .form {
    width: 100%;
    margin-bottom: unset !important;

    .inputPhone {
      height: 40px;

      ::v-deep(.el-input-group__prepend) {
        background-color: unset;
        border-radius: 8px 0 0 8px;
        width: 15px;
        color: var(--el-text-color-regular);
      }

      ::v-deep(.el-input__wrapper) {
        border-radius: 0 8px 8px 0;
      }
    }

    .inputCode {
      height: 40px;

      ::v-deep(.el-input__wrapper) {
        border-radius: 8px 0 0 8px;
      }

      ::v-deep(.el-input-group__append) {
        background-color: unset;
        border-radius: 0 8px 8px 0;
        color: var(--el-text-color-regular);
      }

      ::v-deep(.sending) {
        display: flex;
        font-weight: 400;
        font-size: 13px;
      }
    }
  }

  .button-block {
    width: 100%;
    margin: 8px 0 16px;

    .button {
      width: 100%;
      border-radius: 8px;
    }
  }

  .choose-block {
    width: 100%;
  }
}
</style>