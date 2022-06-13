<template>
  <el-row class="register">
    <el-row class="title">邮箱注册</el-row>
    <el-form :model="form" class="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item prop="email">
        <el-input class="input" v-model="form.email" type="text" :maxlength="50" show-word-limit
                  placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="input" v-model="form.password" type="password" show-password placeholder="输入密码"></el-input>
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
      <el-button class="button" color="rgb(36, 37, 40)" size="large" :loading="loading" @click="register(formRef)">注册
      </el-button>
    </el-row>
    <el-row class="choose-block" justify="center">
      <el-row style="cursor: pointer" @click="mode('code')">验证码登录</el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "Register"
}
</script>

<script setup>
import {ref} from "vue";
import {success, error} from "../../../utils/message";
import {checkEmail, validateCode, validateEmail, validatePassword} from "../../../utils/check"
import {post} from "../../../utils/axios";

const emits = defineEmits(["update:mode", "close"])

let form = ref({
  email: "",
  password: "",
  code: ""
})

let width = ref(68)
let text = ref("获取验证码")
let interval = ref(null)
let formRef = ref()
let loading = ref(false)
let codeSending = ref(false)
const rules = ref({
  email: [{validator: validateEmail, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
  code: [{validator: validateCode, trigger: 'blur'}],
})

function sendCode() {
  if (interval.value || !checkEmail(form.value.email)) {
    interval.value || error("邮箱输入有误，请检查")
    return null
  }
  codeSending.value = true
  post("/v1/user/code/email", {email: form.value.email, template: "5"}).then(function () {
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

function register(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("邮箱输入有误，请检查")
    } else {
      toRegister()
      return true
    }
  })
}

function toRegister() {
  loading.value = true
  post("/v1/user/register", {email: form.value.email, password: form.value.password, code: form.value.code}).then(function () {
    success("注册成功")
    mode("account")
  }).catch(function (err) {
    let msg = "注册失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "VERIFY_CODE_FAILED":
          msg = "注册失败：验证码错误"
          break
        case "EMAIL_CONFLICT":
          msg = "注册失败：该账号已注册"
          break
      }
    }
    error(msg)
    loading.value = false
  })
}

function mode(mode) {
  cancelInterval()
  emits("update:mode", mode)
}

function closeDialog() {
  emits("close", "")
}

</script>

<style scoped lang="scss">
.register {
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

    .input {
      height: 40px;

      ::v-deep(.el-input__wrapper) {
        border-radius: 8px;
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