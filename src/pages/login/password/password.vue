<template>
  <el-container direction="vertical">
    <el-row class="base-back" @click="back" align="middle">
      <el-icon class="base-back-icon"><arrow-left-bold/></el-icon>
      <el-row class="base-back-word">返回</el-row>
    </el-row>
    <el-row class="login-password-title">输入密码</el-row>
    <el-row class="login-password-input-block">
      <el-input class="login-password-input-phone" v-model="inputPassword"
                placeholder="请输入密码" size="large"
                @input="passwordInput"
                show-password
      />
    </el-row>
    <el-row class="login-password-statement blue" @click="codeLogin">{{ "验证码登录" }}</el-row>
    <el-row class="login-password-statement">
      <el-row>{{ "忘记密码?" }}</el-row>
      <el-row class="blue password-reset" @click="passwordReset">点此重置</el-row>
    </el-row>
    <el-row class="flex-grow"></el-row>
    <el-row class="login-password-button">
      <el-button class="button-style" size="large" :disabled="!buttonDisable" :loading="isLoading"
                 :type="!buttonDisable?'info':'primary'"
                 @click="buttonNext">下一步
      </el-button>
    </el-row>
  </el-container>
</template>

<script setup>
import {initData} from "./initData.js"
import {controller} from "./controller.js"

let {inputPassword, buttonDisable, routerParams, isLoading} = initData()
let {
  init,
  passwordInput,
  back,
  passwordReset,
  buttonNext,
  codeLogin
} = controller(buttonDisable, routerParams, isLoading)

init()
</script>

<style lang="scss" scoped>
.base-back {
  position: relative;
  top: 2px;
  margin-bottom: 15px;
  border-radius: 6px;
  padding: 0 4px 0 2px;
  cursor: pointer;

  .base-back-icon {
    display: flex;
    color: #606266;
  }

  .base-back-word {
    color: #606266;
  }
}

.login-password-title {
  font-size: 22px;
  color: #1f2329;
  font-weight: 600;
  line-height: 30px;
  white-space: pre-wrap;
  margin-bottom: 24px;
}

.login-password-input-block {
  overflow: hidden;
  position: relative;
  height: 40px;

}

.login-password-button {
  margin-top: 16px;

  .button-style {
    width: 100%;
    border-radius: 6px;
  }

}

.login-password-statement {
  margin-top: 20px;
  color: #646a73;
  font-size: 14px;
  line-height: 1;
}

.blue {
  color: #409EFF;
  cursor: pointer;
}

.password-reset {
  margin: 0 5px;
}


.flex-grow {
  flex-grow: 1;
}

</style>