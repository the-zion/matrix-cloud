<template>
  <el-container class="identity">
    <el-form :model="form" ref="formRef" class="form" :rules="rules">
      <el-form-item class="form-item" prop="mode">
        <el-select class="select" v-model="form.mode" placeholder="请选择验证方式" @change="selectChange">
          <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.mode === 'phone'" class="form-item" prop="phone">
        <el-input v-model="form.phone" disabled :maxlength="20" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item v-if="form.mode === 'email'" class="form-item" prop="email">
        <el-input v-model="form.email" disabled :maxlength="50" placeholder="请输入邮箱账号"/>
      </el-form-item>
      <el-form-item v-if="form.mode === 'account'" class="form-item" prop="account">
        <el-input v-model="form.account" :maxlength="50" placeholder="请输入 手机号/邮箱账号"/>
      </el-form-item>
      <el-form-item v-if="form.mode === 'account'" class="form-item" prop="password">
        <el-input v-model="form.password" :maxlength="50" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item v-if="form.mode !== 'account'" class="form-item" prop="code">
        <el-row class="code" justify="space-between">
          <el-input class="code-input" v-model="form.code" :maxlength="6" placeholder="请输入验证码"/>
          <el-button class="button" :disabled="countdown !== 61" :loading="codeSending" @click="sendCode">
            {{ codeSending ? "发送中" : buttonText }}
          </el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: "MatrixIdentityVerification"
}
</script>

<script setup>
import {onMounted, ref} from "vue"
import {validateAccount, validatePassword, validateCode} from "../../../../utils/check";

const emits = defineEmits(["open"])
const rules = ref({
  account: [{validator: validateAccount, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
  code: [{validator: validateCode, trigger: 'blur'}]
})

let form = ref({mode: "phone", phone: "", email: "", account: "", code: ""})
let data = ref({
  phone: "+86 19907740758",
  email: "945212191@qq.com"
})
let formRef = ref()
let buttonText = ref("获取验证码")
let codeSending = ref(false)
let countdown = ref(61)
let options = ref([
  {
    value: "phone",
    label: "手机号验证"
  },
  {
    value: "email",
    label: "邮箱验证"
  },
  {
    value: "account",
    label: "账号密码验证"
  }
])

function init() {
  initData()
}

function initData() {
  form.value.phone = data.value["phone"]
}

function selectChange(key) {
  form.value[key] = data.value[key]
}

function sendCode() {
  codeSending.value = true
  countdown.value = 60
  setTimeout(function () {
    countDown()
  }, 500)
}

function countDown() {
  codeSending.value = false
  buttonText.value = "60s后获取"
  let interval = setInterval(() => {
    countdown.value--
    buttonText.value = countdown.value + "s后获取"
    if (countdown.value === 0) {
      buttonText.value = "获取验证码"
      countdown.value = 61
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
.identity {
  width: 100%;

  .form {
    width: 100%;

    .form-item {
      width: 100%;
      margin-bottom: 30px;

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