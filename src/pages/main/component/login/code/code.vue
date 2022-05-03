<template>
  <el-row class="code">
    <el-row class="title">验证码登录</el-row>
    <el-form :model="form" class="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item prop="phone">
        <el-input class="inputPhone" v-model="form.phone" type="text" placeholder="输入手机号">
          <template #prepend>
            <el-row>+86</el-row>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input class="inputCode" v-model="form.code" type="text" placeholder="验证码">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-row class="button-block">
      <el-button class="button" color="rgb(36, 37, 40)" size="large" @click="login(formRef)">登录/注册</el-button>
    </el-row>
    <el-row class="choose-block" justify="space-between">
      <el-row style="cursor: pointer" @click="mode">账号密码登录</el-row>
      <el-row style="cursor: pointer">邮箱注册</el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "CubeLoginCode"
}
</script>

<script setup>
import {ref} from "vue"
import {message} from "../../../../../utils/message"

const emit = defineEmits(["update:mode"])
const {success, error} = message()
const form = ref({
  phone: "",
  code: ""
})

const formRef = ref()
const rules = ref({
  phone: [{validator: validatePhone, trigger: 'blur'}],
  code: [{validator: validateCode, trigger: 'blur'}],
})

function mode() {
  emit("update:mode", "account")
}

function validatePhone(rule, value, callback) {
  if (value === "" || !(checkPhone("+86" + value))) {
    callback(new Error())
  }
  callback()
}

function validateCode(rule, value, callback) {
  if (value === "" || !(checkCode(value))) {
    callback(new Error())
  }
  callback()
}


function checkPhone(value) {
  return value.match("^\\+[1-9]?[0-9]{7,14}$")
}

function checkCode(value) {
  return value.length === 6 && value.match("^[0-9]+$")
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
      success("登录成功")
      return true
    }
  })
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