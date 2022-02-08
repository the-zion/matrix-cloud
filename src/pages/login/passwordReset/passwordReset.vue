<template>
  <el-container direction="vertical">
    <div class="base-back" @click="back">
    <span class="base-back-icon">
      <el-icon><arrow-left-bold/></el-icon>
    </span>
      <span class="base-back-word">返回</span>
    </div>
    <div class="login-password-reset-title">设置帐号密码</div>
    <el-row class="login-password-reset-statement">{{ "密码需同时包含字母和数字，至少 8 个字符" }}</el-row>
    <div class="login-password-reset-input-block">
      <el-input class="login-password-reset-input" v-model="inputPassword"
                placeholder="请输入密码" size="large"
                @input="passwordInput"
                @blur="passwordBlur"
                show-password
      />
      <div class="input-error">{{ passwordError }}</div>
      <el-input class="login-password-reset-input" v-model="repeatPassword"
                placeholder="再次输入密码" size="large"
                @input="passwordRepeat"
                @blur="repeatBlur"
                show-password
      />
      <div class="input-error">{{ repeatError }}</div>

    </div>
    <div class="flex-grow"></div>
    <el-row class="login-password-reset-button">
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

let {
  inputPassword,
  repeatPassword,
  buttonDisable,
  routerParams,
  passWordPass,
  repeatPass,
  passwordError,
  repeatError,
  isLoading
} = initData()
let {
  init,
  passwordInput,
  passwordRepeat,
  back,
  passwordReset,
  passwordBlur,
  repeatBlur,
  buttonNext
} = controller(buttonDisable, routerParams, passWordPass, repeatPass, passwordError, repeatError, isLoading)

init()
</script>
<style lang="scss" scoped>
.base-back {
  position: relative;
  top: 2px;
  align-items: center;
  display: flex;
  margin-bottom: 15px;
  border-radius: 6px;
  padding: 0 4px 0 2px;
  cursor: pointer;
  background-color: transparent;

  .base-back-icon {
    display: flex;
    color: #606266;
  }

  .base-back-word {
    color: #606266;
  }
}

.login-password-reset-title {
  font-size: 22px;
  color: #1f2329;
  font-weight: 600;
  line-height: 30px;
  white-space: pre-wrap;
}

.login-password-reset-input-block {
  overflow: hidden;
  position: relative;

  .login-password-reset-input {
    margin-bottom: 12px;
  }

  .input-error {
    word-break: break-all;
    margin-bottom: 6px;
    font-size: 13px;
    color: #f54a45;
    line-height: 20px;
  }
}


.login-password-reset-button {
  margin-top: 16px;

  .button-style {
    width: 100%;
    border-radius: 6px;
  }

}

.login-password-reset-statement {
  margin-top: 8px;
  color: #646a73;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 24px;
}


.flex-grow {
  flex-grow: 1;
}

</style>