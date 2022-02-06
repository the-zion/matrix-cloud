<template>
  <el-container>
    <el-main class="login-main">
      <div class="login-left">
        <div class="login-body">
          <div class="login-block">
            <router-view></router-view>
<!--            <div class="login-title">欢迎使用Cube</div>-->
<!--            <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--              <el-tab-pane label="手机号" name="phone"></el-tab-pane>-->
<!--              <el-tab-pane label="邮箱" name="email"></el-tab-pane>-->
<!--            </el-tabs>-->
<!--            <div class="login-input-block">-->
<!--              <transition name="phone-tran">-->
<!--                <el-input v-if="activeName === 'phone'" class="login-input-phone" v-model="inputPhone"-->
<!--                          placeholder="请输入你的手机号" size="large"-->
<!--                          @input="phoneInput"/>-->

<!--              </transition>-->
<!--              <transition name="email-tran">-->
<!--                <el-input v-show="activeName === 'email'" class="login-input-email" v-model="inputEmail"-->
<!--                          placeholder="请输入你的邮箱" size="large"-->
<!--                          @input="emailInput"/>-->
<!--              </transition>-->
<!--            </div>-->
<!--            <el-row class="login-button">-->
<!--              <el-button class="button-style" size="large" :disabled="buttonDisable"-->
<!--                         :type="buttonDisable?'info':'primary'">下一步-->
<!--              </el-button>-->
<!--            </el-row>-->
<!--            <el-row class="login-statement">{{ currentNode }}</el-row>-->
<!--            <div class="flex-grow"></div>-->
<!--            <div class="more-options-container">-->
<!--              <el-row>-->
<!--                <el-col :span="9">-->
<!--                  <hr class="option-hr"/>-->
<!--                </el-col>-->
<!--                <el-col :span="6" class="option-word">更多登录方式</el-col>-->
<!--                <el-col :span="9">-->
<!--                  <hr class="option-hr"/>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--              <el-row>-->
<!--                <el-col :span="8" class="option-col">-->
<!--                  <el-tooltip content="游客浏览" placement="right" effect="light">-->
<!--                    <img @click="visitor" src="../../assets/images/user.jpg" class="option-icon">-->
<!--                  </el-tooltip>-->
<!--                </el-col>-->
<!--                <el-col :span="8" class="option-col">-->
<!--                  <el-tooltip content="微信登录" placement="right" effect="light">-->
<!--                    <img src="../../assets/images/wechat.svg" class="option-icon">-->
<!--                  </el-tooltip>-->
<!--                </el-col>-->
<!--                <el-col :span="8" class="option-col">-->
<!--                  <el-tooltip content="github登录" placement="right" effect="light">-->
<!--                    <img src="../../assets/images/GitHub.svg" class="option-icon">-->
<!--                  </el-tooltip>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </div>-->
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
        padding: 32px;
        height: calc(100% - 64px);
        display: flex;
        flex-direction: column;
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
    }
  }
}
</style>