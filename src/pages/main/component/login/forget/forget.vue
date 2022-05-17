<template>
  <el-row class="forget">
    <el-row class="title">重新设置密码</el-row>
    <el-form v-if="step === 'step1'" :model="form1" class="form" :rules="rules1" ref="formRef1" status-icon>
      <el-form-item prop="select" required>
        <el-select class="select" v-model="form1.select" placeholder="选择密码重置方式" @change="selectChange">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form1.select === 'phone'" prop="phone">
        <el-input class="inputPhone" v-model="form1.phone" type="text" placeholder="输入手机号">
          <template #prepend>
            <el-row>+86</el-row>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="form1.select === 'email'" prop="email">
        <el-input class="input" v-model="form1.email" type="text" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input class="inputCode" v-model="form1.code" type="text" placeholder="验证码">
          <template #append>
            <el-row v-show="!codeSending" :style="{width: width + 'px'}" style="cursor:pointer;"
                    @click="sendCode()">
              {{ text + (interval ? ' 秒后可重发' : '') }}
            </el-row>
            <el-button v-show="codeSending" class="sending" type="primary" loading>发送中</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form v-if="step === 'step2'" :model="form2" class="form" :rules="rules2" ref="formRef2" status-icon>
      <el-form-item prop="password">
        <el-input class="input" v-model="form2.password" type="password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="repeat">
        <el-input class="input" v-model="form2.repeat" type="password" show-password placeholder="请重复密码"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="button-block">
      <el-button class="button" color="rgb(36, 37, 40)" size="large" :loading="loading"
                 @click="step === 'step1' ? nextStep(formRef1):passwordReset(formRef2)">
        {{ step === 'step1' ? "下一步" : "密码重置" }}
      </el-button>
    </el-row>
    <el-row class="choose-block" justify="space-between">
      <el-row style="cursor: pointer" @click="mode('code')">验证码登录</el-row>
      <el-row style="cursor: pointer" @click="mode('account')">账号密码登录</el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixLoginForget"
}
</script>

<script setup>
import {ref} from "vue";
import {success, error} from "../../../../../utils/message";
import {validatePhone, validateCode, validateEmail, validatePassword, checkPhone, checkEmail} from "../../../../../utils/check"

const emit = defineEmits(["update:mode"])

let width = ref(68)
let text = ref("获取验证码")
let codeSending = ref(false)
let interval = ref(null)
let step = ref("step1")
let loading = ref(false)
let formRef1 = ref()
let formRef2 = ref()
let options = ref([{
  key: "phone",
  value: "phone",
  label: "用手机号重设"
}, {
  key: "email",
  value: "email",
  label: "用邮箱重设"
}])
let form1 = ref({
  select: "phone",
  phone: "",
  email: "",
  code: ""
})
let form2 = ref({
  password: "",
  repeat: "",
})

const rules1 = ref({
  phone: [{validator: validatePhone, trigger: 'blur'}],
  code: [{validator: validateCode, trigger: 'blur'}],
  email: [{validator: validateEmail, trigger: 'blur'}]
})
const rules2 = ref({
  password: [{validator: validatePassword, trigger: 'blur'}],
  repeat: [{validator: validateRepeat, trigger: 'blur'}],
})

function validateRepeat(rule, value, callback) {
  if (!checkRepeat(value)) {
    value || callback(new Error("密码不能为空"))
    callback(new Error("两次密码输入不一致"))
  }
  callback()
}

function checkRepeat(value) {
  return value === form2.value.password
}

function selectChange() {
  form1.value.phone = ""
  form1.value.email = ""
  form1.value.code = ""
  cancelInterval()
}

function sendCode() {
  if (interval.value || !(form1.value.select === 'phone' ? checkPhone("+86" + form1.value.phone) : checkEmail(form1.value.email))) {
    interval.value || error(form1.value.select === 'phone' ? "手机号有误，请检查" : "邮箱有误，请检查")
    return null
  }
  codeSending.value = true
  setTimeout(function () {
    countDown()
  }, 500)
}

function countDown() {
  let countdown = 300
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

function nextStep(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("账号或验证码有误，请检查")
    } else {
      loading.value = true
      setTimeout(function () {
        loading.value = false
        cancelInterval()
        step.value = "step2"
      }, 500)
      return true
    }
  })
}

function passwordReset(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("密码输入有误，请检查")
    } else {
      success("密码重置成功，请重新登录")
      mode("account")
      return true
    }
  })
}

function mode(mode) {
  cancelInterval()
  emit("update:mode", mode)
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

</script>

<style scoped lang="scss">
.forget {
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

    .select {
      width: 100%;

      ::v-deep(.el-input__wrapper) {
        height: 40px;
        border-radius: 8px;
      }
    }

    .input {
      ::v-deep(.el-input__wrapper) {
        border-radius: 8px;
        height: 40px;
      }
    }

    .inputPhone {
      ::v-deep(.el-input-group__prepend) {
        background-color: unset;
        border-radius: 8px 0 0 8px;
        width: 15px;
        color: var(--el-text-color-regular);
      }

      ::v-deep(.el-input__wrapper) {
        height: 40px;
        border-radius: 0 8px 8px 0;
      }
    }

    .inputCode {
      ::v-deep(.el-input__wrapper) {
        height: 40px;
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