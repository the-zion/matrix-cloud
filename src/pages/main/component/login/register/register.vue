<template>
  <el-row class="register">
    <el-row class="title">邮箱注册</el-row>
    <el-form :model="form" class="form" :rules="rules" ref="formRef" status-icon>
      <el-form-item prop="email">
        <el-input class="input" v-model="form.email" type="text" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="input" v-model="form.password" type="password" show-password placeholder="输入密码"></el-input>
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
  name: "MatrixLoginRegister"
}
</script>

<script setup>
import {defineEmits, onMounted} from "vue"
import {controller} from "./controller";

const {initVariable, init, register, mode} = controller()
const emits = defineEmits(["update:mode", "close"])
let {form, formRef, loading, rules} = initVariable()

onMounted(function () {
  init(emits)
})
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