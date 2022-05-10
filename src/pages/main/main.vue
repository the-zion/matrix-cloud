<template>
  <el-container class="main-container">
    <el-header class="main-header" height="50px">
      <el-menu class="main-menu" router @select="menuSelect" :default-active="activeMenu"
               :active-text-color="activeColor">
        <el-image class="main-matrix-logo" @click="backToHome"
                  src="../src/assets/images/matrix.svg"
                  fit="contain"
        ></el-image>
        <el-menu-item class="main-menu-item" :route="item.state" :index="item.state" v-for="(item) in menuList">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
        <div style="flex-grow: 1"></div>
        <el-row class="main-login-word" v-show="!userLogin" @click="login">登录</el-row>
        <matrix-login v-model:visible="loginVisible" class="loginDialog"></matrix-login>
        <el-row align="middle" v-show="!userLogin">
          <el-badge :value="messageValue" :max="99" class="main-menu-icon" :hidden=messageCount(messageValue)>
            <el-icon :size="20" @click="add">
              <message/>
            </el-icon>
          </el-badge>
          <el-dropdown size="large" placement="bottom-end" @command="dropdownClick"
                       popper-class="dropdown">
            <el-avatar class="main-user-image" :size="30" icon="UserFilled"></el-avatar>
            <template #dropdown>
              <matrix-center></matrix-center>
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
  </el-container>
</template>

<script setup>
import {initVariable, init, backToHome, menuSelect, messageCount, add, login, dropdownClick} from "./controller.js"
import router from "../../router"

let {activeMenu, userLogin, messageValue, menuList, loginVisible, activeColor, scroll} = initVariable()
init()

router.afterEach(function (route) {
  activeMenu.value = route.name
})


</script>
<style lang="scss">

::-webkit-scrollbar { //隐藏滚轮display: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track-piece {
  background: #eee;
}

::-webkit-scrollbar-thumb:vertical {
  background: #666;
}

body {
  margin: unset;
  overflow-y: scroll;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  .dropdown {
    border-radius: 0.5rem;

    .el-popper__arrow {
      display: none;
    }
  }
}

.main-container {
  background-color: rgb(247 248 250);

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
    }
  }

  .main-body {
    overflow: unset;
    min-height: 1000px;
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
</style>
