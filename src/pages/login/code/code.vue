<template>
  <el-container direction="vertical">
    <div class="base-back" @click="back">
    <span class="base-back-icon">
      <el-icon><arrow-left-bold/></el-icon>
    </span>
      <span class="base-back-word">返回</span>
    </div>
    <div class="login-phone-code-title">{{ '验证' + routerParams.state === 'phone' ? '手机号' : '电子邮箱' }}</div>
    <div class="login-phone-code-note">
      <span>{{ "请输入发送至 " }}</span>
      <span class="strong">{{ phoneNumber || emailNumber }}</span>
      <span>{{ " 的 6 位验证码，有效期 10 分钟" }}</span>
    </div>
    <div class="login-phone-code-input-block">
      <el-input class="login-phone-code-input-phone" v-model="inputCode"
                placeholder="请输入验证码" size="large" maxlength="6"
                @input="codeInput"/>
    </div>
    <el-row class="login-phone-code-statement" v-show="count !== 0">{{ count + " 秒后可重新获取验证码" }}</el-row>
    <el-row class="login-phone-code-statement blue" v-show="count === 0" @click="codeGet">{{ "重新获取验证码" }}</el-row>
    <el-row v-show="routerParams.state !== 'passwordReset'" class="login-phone-code-statement blue"
            @click="passwordLogin">{{
        "密码登录"
      }}
    </el-row>
    <div class="flex-grow"></div>
    <el-row class="login-phone-code-button">
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

let {count, isLoading, inputCode, buttonDisable, phoneNumber, emailNumber, routerParams} = initData()
let {
  init,
  countDown,
  codeGet,
  codeInput,
  back,
  passwordLogin,
  buttonNext
} = controller(count, buttonDisable, phoneNumber, emailNumber, routerParams, isLoading)

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

.login-phone-code-title {
  font-size: 22px;
  color: #1f2329;
  font-weight: 600;
  line-height: 30px;
  white-space: pre-wrap;
}

.login-phone-code-note {
  font-size: 14px;
  color: #646a73;
  margin-top: 8px;
  line-height: 20px;
  min-height: 40px;
  white-space: pre-wrap;

  .strong {
    color: #1f2329;
    font-weight: bold;
  }
}

.login-phone-code-input-block {
  overflow: hidden;
  position: relative;
  height: 40px;

}

.login-phone-code-button {
  margin-top: 16px;

  .button-style {
    width: 100%;
    border-radius: 6px;
  }

}

.login-phone-code-statement {
  margin-top: 20px;
  color: #646a73;
  font-size: 14px;
  line-height: 1;
}

.blue {
  color: #409EFF;
  cursor: pointer;
}


.flex-grow {
  flex-grow: 1;
}

</style>