<template>
  <el-row class="account">
    <el-row class="title">账号密码登录</el-row>
    <el-form :model="form" class="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item prop="account">
        <el-input class="input" v-model="form.account" type="text" placeholder="手机/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="input" v-model="form.password" type="password" show-password placeholder="输入密码"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="button-block">
      <el-button class="button" color="rgb(36, 37, 40)" size="large" @click="login(formRef)">登录</el-button>
    </el-row>
    <el-row class="choose-block" justify="space-between">
      <el-row style="cursor: pointer" @click="mode">验证码登录</el-row>
      <el-row style="cursor: pointer">忘记密码</el-row>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "CubeLoginAccount"
}
</script>

<script setup>
import {ref} from "vue"
import {message} from "../../../../../utils/message"

const emit = defineEmits(["update:mode"])
const {success, error} = message()
const form = ref({
  account: "",
  password: ""
})

const formRef = ref()
const rules = ref({
  account: [{validator: validateAccount, trigger: 'blur'}],
  password: [{validator: validatePassWord, trigger: 'blur'}],
})

function mode() {
  emit("update:mode","code")
}

function validateAccount(rule, value, callback) {
  if (value === "" || !(checkPhone("+86" + value) || checkEmail(value))) {
    callback(new Error())
  }
  callback()
}

function validatePassWord(rule, value, callback) {
  if (value === "") {
    callback(new Error())
  }
  callback()
}


function checkPhone(value) {
  return value.match("^\\+[1-9]?[0-9]{7,14}$")
}

function checkEmail(value) {
  return value.match("^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
}

function login(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("账号或密码有误，请检查")
    } else {
      success("登录成功")
      return true
    }
  })
}

</script>

<style scoped lang="scss">
.account {
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