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
import {defineEmits, onMounted} from "vue"
import {controller} from "./controller";

const {initData, init, sendCode, mode, login} = controller()
const emits = defineEmits(["update:mode", "close"])
let {width, text, codeSending, interval, loading, form, formRef, rules} = initData()
onMounted(function () {
  init(emits)
})

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