<template>
  <el-container class="email-container">
    <el-form :model="form" ref="formRef" class="form" :rules="rules">
      <el-form-item class="form-item" prop="email">
        <el-input v-model="form.email" :maxlength="50" placeholder="请输入邮箱账号"/>
      </el-form-item>
      <el-form-item class="form-item" prop="code">
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
  name: "Email"
}
</script>

<script setup>
import {ref, onBeforeMount, onMounted} from "vue";

import {validateEmail, validateCode} from "../../../utils/check";
import {post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";

const emits = defineEmits(["open"])
const rules = ref({
  email: [{validator: validateEmail, trigger: 'blur'}],
  code: [{validator: validateCode, trigger: 'blur'}]
})

let form = ref({email: "", code: ""})
let formRef = ref()
let buttonText = ref("获取验证码")
let codeSending = ref(false)
let countdown = ref(61)

function sendCode() {
  codeSending.value = true
  countdown.value = 60
  post("/v1/user/code/email", {email: form.value.email, template: "3"}).then(function () {
    success("验证码已发送")
    countDown()
  }).catch(function () {
    error("验证码发送失败")
    codeSending.value = false
  })
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
})
</script>

<style scoped lang="scss">
.email-container {
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
    }
  }
}
</style>