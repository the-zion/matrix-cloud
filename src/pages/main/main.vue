<template>
  <el-container class="main-container">
    <el-header class="main-header" height="50px">
      <el-menu class="main-menu" router @select="menuSelect" :default-active="activeMenu"
               :active-text-color="activeColor">
        <el-image class="main-cube-logo" @click="backToHome"
                  src="../src/assets/images/cube.svg"
                  fit="contain"
        ></el-image>
        <el-menu-item :route="item.state" :index="item.state" v-for="(item,index) in menulist">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
        <div style="flex-grow: 1"></div>
        <el-tooltip
            effect="dark"
            content="站内搜索"
            placement="bottom"
        >
          <el-icon :size="20" class="main-menu-icon" @click="showSearchClick">
            <search/>
          </el-icon>
        </el-tooltip>
        <transition name="search">
          <el-input
              v-if="showSearch"
              v-model="input"
              class="main-menu-search-input"
              placeholder="站内搜索"
              @blur="searchBlur"
          />
        </transition>
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
          <el-avatar class="main-user-image" :size="35" src="../src/assets/images/user.jpg"></el-avatar>
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
      </el-menu>
    </el-header>
    <el-container class="main-sub-container">
      <div class="main-scrollbar">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
        <el-footer class="main-footer">
          <a class="beian" href="https://beian.miit.gov.cn/" target="_blank">魔方技术 互联网ICP备案：粤ICP备2021123846号 </a>
          <img style="margin: 0 2px 0 5px;" src="../../assets/images/police.png">
          <a class="beian" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45040302000206"
             target="_blank"> 桂公网安备 45040302000206号</a>
        </el-footer>
      </div>
    </el-container>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"
import router from "../../router";
import {useRoute} from "vue-router";

let activeColor = ref()

let {activeMenu, input, showSearch, messageValue, menulist} = initData()
let {
  init,
  backToHome,
  menuSelect,
  showSearchClick,
  searchBlur,
  messageCount,
  add,
  login,
  dropdownClick,
  editBlog
} = controller(activeMenu, activeColor, showSearch, messageValue)

init()
router.afterEach(function (route) {
  activeMenu.value = route.name
})

</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all .2s ease-in-out;
}

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

  .main-header {
    border-bottom: 1px solid var(--el-border-color-base);

    .main-menu {
      display: flex;
      border: unset;
      height: 100%;
      align-items: center;
      background: #FFFFFF;

      .main-cube-logo {
        width: 100px;
        margin-right: 100px;
        cursor: pointer;
      }

      .main-search {
        margin-left: 10px;
        margin-right: 10px;
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

      .main-menu-search-input {
        width: 210px;
        overflow: hidden;
      }

      .search-enter-active, .search-leave-active {
        transition: width 0.3s linear;
      }

      .search-enter-from, .search-leave-to {
        width: 0;
      }

      .main-user-image {
        margin: 0 15px;
        cursor: pointer;
      }
    }
  }

  .main-sub-container {
    position: relative;

    .main-scrollbar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;

      .el-scrollbar__view {
        height: 100%;
      }

      .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s linear;
      }

      .fade-enter-from, .fade-leave-to {
        opacity: 0;
      }

      .main-footer {
        background: #f0f2f5;
        display: flex;
        justify-content: center;
        align-items: center;

        .beian {
          font: 12px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
          color: rgba(0, 0, 0, .45);
          text-decoration: unset;
        }
      }
    }
  }

}
</style>
