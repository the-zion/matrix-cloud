<template>
  <el-container>
    <el-main class="login-main">
      <div class="login-left">
        <div class="login-body">
          <div class="login-block">
            <div class="login-title">欢迎使用Cube</div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="手机号" name="first"></el-tab-pane>
              <el-tab-pane label="邮箱" name="second"></el-tab-pane>
            </el-tabs>
            <div class="login-input-block">
              <transition name="phone-tran">
                <el-input v-show="!email" class="login-input-phone" v-model="inputPhone" placeholder="请输入你的手机号" size="large"/>
                <!--                <div v-bind:key="email" class="phone-email">-->
                <!--                  <el-input class="login-input" v-model="inputEmail" placeholder="请输入你的邮箱" size="large"/>-->
                <!--                </div>-->

              </transition>
              <transition name="email-tran">
                <el-input v-show="email" class="login-input-email" v-model="inputEmail" placeholder="请输入你的邮箱" size="large"/>
              </transition>
            </div>
            <el-row class="login-button">
              <el-button class="button-style" size="large" plain disabled type="info">下一步</el-button>
            </el-row>
            <el-row class="login-statement">注：未注册的手机号会自动注册</el-row>
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
                    <img @click="visitor" src="../../assets/images/user.jpg" class="option-icon">
                  </el-tooltip>
                </el-col>
                <el-col :span="8" class="option-col">
                  <el-tooltip content="微信登录" placement="right" effect="light">
                    <img src="../../assets/images/wechat.svg" class="option-icon">
                  </el-tooltip>
                </el-col>
                <el-col :span="8" class="option-col">
                  <el-tooltip content="github登录" placement="right" effect="light">
                    <img src="../../assets/images/GitHub.svg" class="option-icon">
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="login-right">
        <img class="login-background" src="../../assets/images/cube-main.svg">
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import {ref} from 'vue'
import {controller} from "./controller.js";

const activeName = ref('first')
const email = ref(false)

const handleClick = function () {
  email.value = !email.value
  console.log(1234)
}

let {visitor} = controller()
</script>

<style lang="scss" scoped>
.login-main {
  position: absolute;
  padding: unset;
  display: flex;
  background: #FFFFFF;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .login-left {
    width: 64%;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-body {
      height: 550px;
      width: 444px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      border: 1px solid #dee0e3;

      .login-block {
        padding: 56px 32px 32px 32px;
        height: calc(100% - 88px);
        display: flex;
        flex-direction: column;

        .login-title {
          font-size: 22px;
          color: #1f2329;
          font-weight: 600;
          line-height: 30px;
          white-space: pre-wrap;
          margin-bottom: 24px;
        }

        .login-input-block {
          overflow: hidden;
          position: relative;
          height: 40px;

          .login-input-phone {
            width: 380px;
            position: absolute;
            right: 0;
          }

          .login-input-email {
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

        .login-button {
          margin-top: 16px;

          .button-style {
            width: 100%;
            border-radius: 6px;
          }
        }

        .login-statement {
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
      }
    }
  }

  .login-right {
    width: 36%;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .login-background {
      width: 100%;
      //clip:rect(0px 0px 0% 0px)
    }
  }
}
</style>