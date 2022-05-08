<template>
  <el-container class="main-container">
    <el-scrollbar class="main-scroll" max-height="100%" ref="scroll">
      <el-header class="main-header" height="50px">
        <el-menu class="main-menu" router @select="menuSelect" :default-active="activeMenu"
                 :active-text-color="activeColor">
          <el-image class="main-matrix-logo" @click="backToHome"
                    src="../src/assets/images/matrix.svg"
                    fit="contain"
          ></el-image>
          <el-menu-item class="main-menu-item" :route="item.state" :index="item.state" v-for="(item) in menulist">
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
          <div style="flex-grow: 1"></div>
          <el-row class="main-login-word" v-show="!userLogin" @click="login">登录</el-row>
          <matrix-login v-model:visible="loginVisible" class="loginDialog"></matrix-login>
          <el-row align="middle" v-show="!userLogin">
            <el-tooltip
                effect="dark"
                content="我要发表"
                placement="bottom"
            >
              <el-icon :size="20" class="main-menu-icon" @click="editBlog">
                <edit/>
              </el-icon>
            </el-tooltip>
            <el-tooltip
                effect="dark"
                content="站内信息"
                placement="bottom"
            >
              <el-badge :value="messageValue" :max="99" class="main-menu-icon" :hidden=messageCount(messageValue)>
                <el-icon :size="20" @click="add">
                  <message/>
                </el-icon>
              </el-badge>
            </el-tooltip>
            <el-dropdown size="large" trigger="hover" @command="dropdownClick">
              <!--          @click="login"-->
              <el-avatar class="main-user-image" :size="30" src="../src/assets/images/user.jpg"></el-avatar>
              <template #dropdown>
                <el-row align="middle" justify="center"
                        style="width: 224px;height: 140px;border-bottom: 1px solid var(--el-border-color-base);">
                  <el-space direction="vertical" :size="5">
                    <el-avatar class="main-user-image" :size="60" src="../src/assets/images/user.jpg"></el-avatar>
                    <el-row style="font-size: 15px">刘思圆</el-row>
                  </el-space>
                </el-row>
                <el-dropdown-menu>
                  <el-dropdown-item command="user">个人中心</el-dropdown-item>
                  <el-dropdown-item command="set" divided>账号设置</el-dropdown-item>
                  <el-dropdown-item command="login" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-row>
        </el-menu>
      </el-header>
      <el-main class="main-body">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in" mode="out-in">
            <component :is="Component" :scroll="scroll"/>
          </transition>
        </router-view>
      </el-main>
      <el-footer class="main-footer">
        <a class="beian" href="https://beian.miit.gov.cn/" target="_blank">魔方技术 互联网ICP备案：粤ICP备2021123846号 </a>
        <img style="margin: 0 2px 0 5px;" src="../../assets/images/police.png">
        <a class="beian" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45040302000206"
           target="_blank"> 桂公网安备 45040302000206号</a>
      </el-footer>
    </el-scrollbar>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"
import router from "../../router";
import {useRoute} from "vue-router";

let activeColor = ref()
const scroll = ref()

let {activeMenu, userLogin, messageValue, menulist, loginVisible} = initData()
let {
  init,
  backToHome,
  menuSelect,
  messageCount,
  add,
  login,
  dropdownClick,
  editBlog
} = controller(activeMenu, activeColor, messageValue, loginVisible)

init()
router.afterEach(function (route) {
  activeMenu.value = route.name
})

</script>
<style lang="scss">

body {
  margin: unset;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;;
}

.main-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background-color: rgb(247 248 250);

  .main-scroll {
    width: 100%;

    .main-header {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      box-shadow: var(--el-box-shadow-lighter);


      .main-menu {
        display: flex;
        border: unset;
        height: 100%;
        width: 1200px;
        align-items: center;

        .main-menu-item {
          font-size: 13px;
        }


        .main-matrix-logo {
          width: 95px;
          cursor: pointer;
          margin-right: 20px;
        }

        .main-login-word {
          font-size: 13px;
          cursor: pointer;
          color: var(--el-text-color-regular);
        }

        .loginDialog {
          border-radius: 20px;

          .el-dialog__header {
            display: none;
          }

          .el-dialog__body {
            padding: unset;
          }
        }

        .main-menu-icon {
          color: #909399;
          margin: 0 15px;
          cursor: pointer;
          display: flex;

          .el-badge__content.is-fixed {
            border: unset;
          }
        }

        .main-user-image {
          margin: 0 15px;
          cursor: pointer;
        }
      }
    }

    .main-body {
      overflow: unset;
    }

    .main-footer {
      background: var(--el-color-black);
      display: flex;
      justify-content: center;
      align-items: center;

      .beian {
        font: 12px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
        color: var(--el-fill-color-blank);
        text-decoration: unset;
      }
    }
  }
}
</style>
