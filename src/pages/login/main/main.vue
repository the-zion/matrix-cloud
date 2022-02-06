<template>
  <div class="login-phone-title">欢迎使用Cube</div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="手机号" name="phone"></el-tab-pane>
    <el-tab-pane label="邮箱" name="email"></el-tab-pane>
  </el-tabs>
  <div class="login-phone-input-block">
    <transition name="phone-tran">
      <el-input v-if="activeName === 'phone'" class="login-phone-input-phone" v-model="inputPhone"
                placeholder="请输入你的手机号" size="large"
                @input="phoneInput"/>

    </transition>
    <transition name="email-tran">
      <el-input v-show="activeName === 'email'" class="login-phone-input-email" v-model="inputEmail"
                placeholder="请输入你的邮箱" size="large"
                @input="emailInput"/>
    </transition>
  </div>
  <el-row class="login-phone-button">
    <el-button class="button-style" size="large" :disabled="buttonDisable" :loading="isLoading"
               :type="buttonDisable?'info':'primary'"
               @click="buttonNext">下一步
    </el-button>
  </el-row>
  <el-row class="login-phone-statement">{{ currentNote }}</el-row>
  <div class="flex-grow"></div>
  <div class="more-options-container">
    <el-row>
      <el-col :span="9">
        <hr class="option-hr"/>
      </el-col>
      <el-col :span="6" class="option-word">更多登录方式</el-col>
      <el-col :span="9">
        <hr class="option-hr"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" class="option-col">
        <el-tooltip content="游客浏览" placement="right" effect="light">
          <img @click="visitor" src="../../../assets/images/user.jpg" class="option-icon">
        </el-tooltip>
      </el-col>
      <el-col :span="8" class="option-col">
        <el-tooltip content="微信登录" placement="right" effect="light">
          <img src="../../../assets/images/wechat.svg" class="option-icon">
        </el-tooltip>
      </el-col>
      <el-col :span="8" class="option-col">
        <el-tooltip content="github登录" placement="right" effect="light">
          <img src="../../../assets/images/GitHub.svg" class="option-icon">
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {controller} from "./controller.js";
import {initData} from "./initData.js"

let {activeName, inputPhone, inputEmail, buttonDisable, currentNote, isLoading} = initData()
let {
  visitor,
  phoneInput,
  emailInput,
  handleClick,
  buttonNext
} = controller(activeName, inputPhone, inputEmail, buttonDisable, currentNote, isLoading)
</script>

<style lang="scss">
.login-phone-title {
  font-size: 22px;
  color: #1f2329;
  font-weight: 600;
  line-height: 30px;
  white-space: pre-wrap;
  margin: 24px 0;
}

.login-phone-input-block {
  overflow: hidden;
  position: relative;
  height: 40px;

  .login-phone-input-phone {
    width: 380px;
    position: absolute;
    right: 0;
  }

  .login-phone-input-email {
    width: 380px;
    position: absolute;
    right: 0;
  }

  .phone-tran-enter-active, .phone-tran-leave-active {
    transition: right 0.3s linear;
  }

  .phone-tran-enter-from, .phone-tran-leave-to {
    right: 412px;
  }

  .email-tran-enter-active, .email-tran-leave-active {
    transition: right 0.3s linear;
  }

  .email-tran-enter-from, .email-tran-leave-to {
    right: -412px;
  }

}

.login-phone-button {
  margin-top: 16px;

  .button-style {
    width: 100%;
    border-radius: 6px;
  }
}

.login-phone-statement {
  margin-top: 16px;
  font-size: 14px;
  color: #909399;
}

.flex-grow {
  flex-grow: 1;
}

.more-options-container {
  margin-top: 10px;

  .option-hr {
    background: #DCDFE6;
    border: unset;
    height: 1px;
  }

  .option-word {
    text-align: center;
    font-size: 12px;
    color: #909399;
  }

  .option-col {
    display: flex;
    justify-content: center;
    margin-top: 15px;

    .option-icon {
      width: 30px;
      border-radius: 100%;
      cursor: pointer;
    }
  }
}

</style>