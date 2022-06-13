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
      <el-button class="button" color="rgb(36, 37, 40)" size="large" :loading="loading" @click="login(formRef)">登录
      </el-button>
    </el-row>
    <el-row class="choose-block" justify="space-between">
      <el-row style="cursor: pointer" @click="mode('code')">验证码登录</el-row>
      <el-row style="cursor: pointer" @click="mode('forget')">忘记密码</el-row>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "Account"
}
</script>

<script setup>
import {ref} from "vue";
import {success, error} from "../../../utils/message";
import {validateAccount, validatePassword} from "../../../utils/check"
import {post} from "../../../utils/axios";

const emits = defineEmits(["update:mode", "close"])

let loading = ref(false)
let form = ref({
  account: "",
  password: ""
})
let formRef = ref()

const rules = ref({
  account: [{validator: validateAccount, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
})

function login(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("账号或密码输入有误，请检查")
    } else {
      toLogin()
      return true
    }
  })
}

function toLogin() {
  loading.value = true
  post("/v1/user/login/password", {
    account: form.value.account,
    password: form.value.password,
    mode: form.value.account.includes("@") ? "email" : "phone"
  }).then(function (reply) {
    localStorage.setItem("matrix-token", reply.data.token)
    success("登录成功")
    closeDialog()
  }).catch(function (err) {
    let msg = "登录失败"
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "VERIFY_PASSWORD_FAILED":
          msg = "登录失败：密码验证失败"
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

function mode(mode) {
  emits("update:mode", mode)
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