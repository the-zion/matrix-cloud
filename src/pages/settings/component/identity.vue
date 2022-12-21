<template>
  <el-container class="identity-container">
    <el-form :model="form" ref="formRef" class="form" :rules="rules">
      <el-form-item class="form-item" prop="choose">
        <el-select v-model="form.choose" class="choose" placeholder="请选择验证方式">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="!props.data[item.value]"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.choose === 'password'" class="form-item" prop="account">
        <el-input v-model="form.account" :maxlength="50" placeholder="请输入手机号或邮箱"/>
      </el-form-item>
      <el-form-item v-if="form.choose === 'password'" class="form-item" prop="password">
        <el-input v-model="form.password" :maxlength="50" show-password placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item v-if="form.choose === 'phone'" class="form-item" prop="phone">
        <el-input v-model="form.phone" disabled :maxlength="20" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item v-if="form.choose === 'email'" class="form-item" prop="email">
        <el-input v-model="form.email" disabled :maxlength="50" placeholder="请输入邮箱账号"/>
      </el-form-item>
      <el-form-item v-if="form.choose === 'phone' || form.choose === 'email'" class="form-item" prop="code">
        <el-row class="code" justify="space-between">
          <el-input class="code-input" v-model="form.code" :maxlength="6" placeholder="请输入验证码"/>
          <el-button class="button" :disabled="countdown !== 121" :loading="codeSending" @click="sendCode">
            {{ codeSending ? "发送中" : buttonText }}
          </el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: "IdentityVerification"
}
</script>

<script setup>
import {onMounted, ref} from "vue"
import {validatePassword, validateCode, validateAccount} from "../../../utils/check";
import {post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";

const emits = defineEmits(["open"])
const rules = ref({
  account: [{validator: validateAccount, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
  code: [{validator: validateCode, trigger: 'blur'}]
})
const props = defineProps({
  data: Object,
  mode: String
})
const options = [{
  label: "手机号验证",
  value: "phone"
}, {
  label: "邮箱验证",
  value: "email"
}, {
  label: "密码验证",
  value: "password"
}, {
  label: "微信验证",
  value: "wechat"
}, {
  label: "QQ验证",
  value: "qq"
}, {
  label: "Github验证",
  value: "github"
}, {
  label: "Gitee验证",
  value: "gitee"
}]

let form = ref({choose: "", password: "", phone: "", email: "", account: "", code: "", mode: ""})
let formRef = ref()
let buttonText = ref("获取验证码")
let codeSending = ref(false)
let countdown = ref(121)

function init() {
  initData()
}

function initData() {
  form.value.choose = props.mode
  form.value.phone = props.data["phone"]
  form.value.email = props.data["email"]
}

function sendCode() {
  codeSending.value = true
  countdown.value = 120
  if (form.value.choose === "phone") {
    sendPhoneCode()
  } else {
    sendEmailCode()
  }
}

function sendPhoneCode() {
  post("/v1/user/code/phone", {phone: form.value.phone, template: "4"}).then(function () {
    success("验证码已发送")
    countDown()
  }).catch(function () {
    error("验证码发送失败")
    codeSending.value = false
  })
}

function sendEmailCode() {
  post("/v1/user/code/email", {email: form.value.email, template: "4"}).then(function () {
    success("验证码已发送")
    countDown()
  }).catch(function () {
    error("验证码发送失败")
    codeSending.value = false
  })
}

function countDown() {
  codeSending.value = false
  buttonText.value = "120s后获取"
  let interval = setInterval(() => {
    countdown.value--
    buttonText.value = countdown.value + "s后获取"
    if (countdown.value === 0) {
      buttonText.value = "获取验证码"
      countdown.value = 121
      clearInterval(interval)
    }
  }, 1000)
}

onMounted(function () {
  emits("open", form.value, formRef.value)
  init()
})
</script>

<style scoped lang="scss">
.identity-container {
  width: 100%;

  .form {
    width: 100%;

    .form-item {
      width: 100%;
      margin-bottom: 30px;

      .choose {
        width: 100%;
      }

      .code {
        width: 100%;

        .code-input {
          width: calc(100% - 100px);
        }

        .button {
          height: 42px;
          padding: 12px 0;
          width: 90px;
          text-align: center;
        }
      }

      ::v-deep(.el-input__wrapper) {
        height: 40px;
      }

      .select {
        width: 100%;
      }
    }
  }
}
</style>