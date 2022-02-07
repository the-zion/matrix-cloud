<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <el-menu class="main-menu" :router=true default-active="home">
        <el-image class="main-cube-logo"
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
        <el-icon :size="20" class="main-menu-icon" @click="showSearchClick">
          <search/>
        </el-icon>
        <transition name="search">
          <el-input
              v-if="showSearch"
              v-model="input"
              class="main-menu-search-input"
              placeholder="站内搜索"
              @blur="searchBlur"
          />
        </transition>
        <el-badge :value="messageValue" :max="99" class="main-menu-icon" :hidden=messageCount(messageValue)>
          <el-icon :size="20" @click="add">
            <message/>
          </el-icon>
        </el-badge>
        <el-avatar class="main-user-image" :size="35" src="../src/assets/images/user.jpg" @click="login"></el-avatar>
        <!--        <el-dropdown class="main-user-dropdown" trigger="hover" :show-timeout=50 :hide-timeout=50 disabled>-->
        <!--          <el-avatar class="main-user-image" :size="35" :src="userImageUrl"></el-avatar>-->
        <!--          <template #dropdown>-->
        <!--            <el-dropdown-menu>-->
        <!--              <div-->
        <!--                  style="width: 220px;height: 140px;display: flex;align-items: center;justify-content: center;flex-direction: column">-->
        <!--                <el-avatar :size="70" :src="userImageUrl"></el-avatar>-->
        <!--                <div style="font-size: 15px;margin-top: 10px">付小小</div>-->
        <!--              </div>-->
        <!--              <el-dropdown-item divided>个人中心</el-dropdown-item>-->
        <!--              <el-dropdown-item divided>账号设置</el-dropdown-item>-->
        <!--              <el-dropdown-item divided>帮助中心</el-dropdown-item>-->
        <!--              <el-dropdown-item divided>退出登录</el-dropdown-item>-->
        <!--            </el-dropdown-menu>-->
        <!--          </template>-->
        <!--        </el-dropdown>-->
      </el-menu>
    </el-header>
    <el-container class="main-sub-container">
<!--      <el-aside class="main-aside">-->
<!--        <el-row class="tac main-menu-row">-->
<!--          <el-col :span="24">-->
<!--            <el-menu-->
<!--                default-active="home"-->
<!--                class="el-menu-vertical-demo main-menu"-->
<!--                :router=true-->
<!--            >-->
<!--            </el-menu>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-aside>-->
      <el-scrollbar class="main-scrollbar" :native="true">
<!--        <router-view></router-view>-->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
        <el-footer class="main-footer">
          <a class="beian" href="https://beian.miit.gov.cn/" target="_blank">魔方技术 互联网ICP备案：粤ICP备2021123846号 </a>
          <img style="margin: 0 2px 0 5px;" src="../../assets/images/police.png">
          <a class="beian" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45040302000206"
             target="_blank"> 桂公网安备 45040302000206号</a>
        </el-footer>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script setup>
import {initData} from "./initData.js"
import {controller} from "./controller.js"

let {input, showSearch, messageValue, menulist} = initData()
let {showSearchClick, searchBlur, messageCount, add, login} = controller(showSearch, messageValue)

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
    border-bottom: 1px solid #EBEEF5;

    .main-menu {
      display: flex;
      border: unset;
      height: 100%;
      align-items: center;
      background: #FFFFFF;

      .main-cube-logo {
        width: 100px;
        margin-right: 100px;
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

      .main-user-dropdown {
        .el-dropdown--default {
          display: flex;
        }
      }
    }
  }

  .main-sub-container {
    position: relative;

    //.main-aside {
    //  width: 208px;
    //
    //  .main-menu-row {
    //    height: 100%;
    //
    //    .main-menu {
    //      height: 100%;
    //
    //      .el-menu-item {
    //        height: 48px;
    //        padding: 0 16px !important;
    //      }
    //
    //      .el-menu-item.is-active {
    //        background: #e6f7ff;
    //        border-right: 2px solid;
    //      }
    //    }
    //
    //  }
    //}

    .main-scrollbar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

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
