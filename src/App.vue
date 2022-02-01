<template>
  <el-container class="main-container">
    <!--    <el-scrollbar class="main-scrollbar">-->
    <!--    </el-scrollbar>-->
    <el-header class="main-header">
      <el-menu class="main-menu">
        <el-image class="main-cube-logo"
                  src="./src/assets/images/dark.svg"
                  fit="contain"
        ></el-image>
        <div style="flex-grow: 1"></div>
        <el-icon :size="20" class="main-menu-icon">
          <search/>
        </el-icon>
        <el-badge :value="messageValue" :max="99" class="main-menu-icon" :hidden=messageCount(messageValue)>
          <el-icon :size="20" @click="add">
            <message/>
          </el-icon>
        </el-badge>
        <el-dropdown trigger="hover" :show-timeout=50 :hide-timeout=50>
          <el-avatar class="main-user-image" :size="35" :src="userImageUrl"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <div style="width: 220px;height: 140px;display: flex;align-items: center;justify-content: center">
                <el-avatar :size="60" :src="userImageUrl"></el-avatar>
              </div>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>
    </el-header>
    <el-container class="main-sub-container">
      <el-aside class="main-aside">
        <el-row class="tac main-menu-row">
          <el-col :span="24">
            <el-menu
                default-active="home"
                class="el-menu-vertical-demo main-menu"
                :router=true
            >
              <el-menu-item :route="item.state" :index="item.state" v-for="(item,index) in menulist">
                <template #title>
                  <el-icon>
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>{{ item.name }}</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <div class="main-scrollbar" style="overflow:auto;">
        <el-main class="main-area" v-infinite-scroll="load" :infinite-scroll-immediate=false :infinite-scroll-delay=500>
          <router-view></router-view>
        </el-main>
        <el-footer class="main-footer">
          <a class="beian" href="https://beian.miit.gov.cn/" target="_blank">魔方技术 互联网ICP备案：粤ICP备2021123846号 </a>
          <img style="margin: 0 2px 0 5px;" src="./assets/images/police.png">
          <a class="beian" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45040302000206"
             target="_blank"> 桂公网安备 45040302000206号</a>
        </el-footer>
      </div>
      <!--      <ul v-infinite-scroll="load" class="main-scrollbar" style="overflow: auto">-->
      <!--        <el-main class="main-area">-->
      <!--          <router-view></router-view>-->
      <!--        </el-main>-->
      <!--        <el-footer class="main-footer">-->
      <!--          <a class="beian" href="https://beian.miit.gov.cn/" target="_blank">魔方技术 互联网ICP备案：粤ICP备2021123846号 </a>-->
      <!--          <img style="margin: 0 2px 0 5px;" src="./assets/images/police.png">-->
      <!--          <a class="beian" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45040302000206"-->
      <!--             target="_blank"> 桂公网安备 45040302000206号</a>-->
      <!--        </el-footer>-->
      <!--      </ul>-->
    </el-container>
  </el-container>
</template>

<script setup>
import {ref, reactive, toRefs, provide} from 'vue'

const url = reactive({
  userImageUrl: new URL(`./assets/images/user.jpg`, import.meta.url).href,
  logoImageUrl: new URL(`./assets/images/cube.svg`, import.meta.url).href
})
const {userImageUrl, logoImageUrl} = toRefs(url)
const defaultActiveIndex = "home"
let infiniteScrollValue = ref(1)
//使用 提供/注入 命令子组件做事
provide('infinite-scroll', infiniteScrollValue);
let load = function () {
  console.log(1)
  infiniteScrollValue.value = 1
  setTimeout(function () {
    infiniteScrollValue.value = 0
  }, 50)
}

const menulist = ref([{
  id: 0,
  key: "home",
  name: "首页",
  state: "home",
  icon: "house"
}, {
  id: 1,
  key: "community",
  name: "江湖",
  state: "community",
  icon: "chat-dot-round"
}, {
  id: 2,
  key: "blog",
  name: "我要发表",
  state: "blog",
  icon: "edit-pen"
}, {
  id: 3,
  key: "message",
  name: "消息中心",
  state: "message",
  icon: "message"
}, {
  id: 4,
  key: "search",
  name: "站内搜索",
  state: "search",
  icon: "search"
}, {
  id: 5,
  key: "user",
  name: "个人中心",
  state: "user",
  icon: "user"
}, {
  id: 6,
  key: "setting",
  name: "账号设置",
  state: "setting",
  icon: "setting"
}, {
  id: 7,
  key: "about",
  name: "关于Cube",
  state: "about",
  icon: "question-filled"
}])
let messageValue = ref(0)

function messageCount(value) {
  return value === 0
}

function add() {
  messageValue.value += 1
}

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
  bottom: 0px;
  left: 0;
  right: 0;

  .main-header {
    padding: unset;
    height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .main-menu {
      display: flex;
      padding: 0 20px;
      height: 50px;
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

      .main-user-image {
        margin: 0 15px;
      }
    }
  }

  .main-sub-container {
    position: relative;
    top: 1px;

    .main-aside {
      width: 208px;

      .main-menu-row {
        height: 100%;

        .main-menu {
          height: 100%;

          .el-menu-item {
            height: 48px;
            padding: 0 16px !important;
          }

          .el-menu-item.is-active {
            background: #e6f7ff;
            border-right: 2px solid;
          }
        }

      }
    }

    .main-scrollbar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 208px;
      right: 0;

      .el-scrollbar__view {
        height: 100%;
      }

      .main-area {
        min-height: 100%;
        padding: unset;
        background: #f0f2f5;
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
