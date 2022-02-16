<template>
  <el-container direction="vertical">
    <el-row class="base-back" @click="back" align="middle">
      <el-icon class="base-back-icon"><arrow-left-bold/></el-icon>
      <el-row class="base-back-word">返回</el-row>
    </el-row>
    <el-row class="login-phone-code-title">{{ '验证' + routerParams.state === 'phone' ? '手机号' : '电子邮箱' }}</el-row>
    <el-row class="login-phone-code-note">
      <el-row>{{ "请输入发送至 " }}</el-row>
      <el-row class="strong">{{ phoneNumber || emailNumber }}</el-row>
      <el-row>{{ " 的 6 位验证码，有效期 10 分钟" }}</el-row>
    </el-row>
    <el-row class="login-phone-code-input-block">
      <el-input v-model="inputCode"
                placeholder="请输入验证码" size="large" maxlength="6"
                @input="codeInput"/>
    </el-row>
    <el-row class="login-phone-code-statement" v-show="count !== 0">{{ count + " 秒后可重新获取验证码" }}</el-row>
    <el-row class="login-phone-code-statement blue" v-show="count === 0" @click="codeGet">{{ "重新获取验证码" }}</el-row>
    <el-row v-show="routerParams.state !== 'passwordReset'" class="login-phone-code-statement blue"
            @click="passwordLogin">{{
        "密码登录"
      }}
    </el-row>
    <el-row class="flex-grow"></el-row>
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