<template>
  <el-container class="main-container">
    <Login v-model:visible="loginVisible" class="loginDialog"></Login>
    <el-header class="main-header" height="50px">
      <el-menu class="main-menu" @select="menuActive" :default-active="activeMenu"
               :active-text-color="activeColor">
        <el-image class="main-matrix-logo" @click="backToHome"
                  :src="logo"
                  fit="contain"
        ></el-image>
        <el-menu-item class="main-menu-item" :index="item.state" v-for="item in menuList" :key="item.key"
                      @click="menuSelect(item.state, item.query)">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
        <div style="flex-grow: 1"></div>
        <el-input v-if="activeMenu !== 'search'" :maxlength="100" v-model="search" class="search" placeholder="搜索"
                  suffix-icon="search"
                  @change="searchChange"></el-input>
        <el-dropdown split-button type="primary" trigger="click" v-show="uuid"
                     @click="router.push({name: 'creation'})">
          创作中心
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="writeArticle">
                <el-icon>
                  <EditPen/>
                </el-icon>
                <span>写文章</span>
              </el-dropdown-item>
              <el-dropdown-item @click="writeTalk">
                <el-icon>
                  <ChatDotRound/>
                </el-icon>
                <span>发讨论</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-row class="main-login-word" v-show="!uuid" @click="login">登录</el-row>
        <el-row align="middle" v-show="uuid">
          <el-badge :value="messageValue" :is-dot="!messageValue" :max="99" class="main-menu-icon" :hidden="messageCount()">
            <el-icon :size="20" @click="router.push({name: 'message'})">
              <message/>
            </el-icon>
          </el-badge>
          <el-dropdown size="large" placement="bottom-end" @command="dropdownClick"
                       popper-class="dropdown" trigger="hover">
            <el-avatar class="main-user-image" :size="30" icon="UserFilled"
                       :src="avatar.baseUrl + uuid + '/avatar.webp'"></el-avatar>
            <template #dropdown>
              <dropdown></dropdown>
            </template>
          </el-dropdown>
        </el-row>
      </el-menu>
    </el-header>
    <el-main class="main-body">
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
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
import {goToPage} from "../../utils/globalFunc";
import {backToHome} from "../../utils/globalFunc";
import {getAssets} from "../../utils/globalFunc";
import {useRoute} from "vue-router";
import {ref, onBeforeMount} from "vue";
import {storeToRefs} from "pinia/dist/pinia";
import Login from './component/login.vue';
import Dropdown from './component/dropdown.vue';
import router from "../../router";
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import {get} from "../../utils/axios";

const logo = getAssets('matrix.svg')
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar} = storeToRefs(baseStore)
let activeMenu = ref()
let messageValue = ref(0)
let loginVisible = ref(false)
let activeColor = ref()
let search = ref()
let menuList = ref([{
  id: 0,
  key: "home",
  name: "学习与讨论",
  state: "home",
  query: {page: 'news'},
}, {
  id: 1,
  key: "about",
  name: "关于matrix",
  state: "about",
  query: {},
}])

let notification = {
  timeline: {},
  comment: 0,
  subComment: 0,
  system: 0
}

let lastTime = 0
let timelineActive = ref(false)

function init() {
  initData()
  getMessageNotification()
}

function initData() {
  activeMenu.value = useRoute().name.split(".")[0]
}

function getMessageNotification() {
  get("/v1/get/message/notification").then(function (reply) {
    notification.timeline = reply.data.timeline
    notification.comment = reply.data.comment
    notification.subComment = reply.data.subComment
    notification.system = reply.data.system
    getMailBoxLastTime()
  })
}

function getMailBoxLastTime() {
  get("/v1/get/mailbox/last/time").then(function (reply) {
    lastTime = reply.data.time
    setActive()
  })
}

function setActive() {
  Object.keys(notification.timeline).forEach(function (item) {
    if (notification.timeline[item] > lastTime) {
      timelineActive.value = true
      return null
    }
  })
  messageValue.value = notification.comment + notification.subComment + notification.system
}

function menuActive() {
  activeColor.value = "#409eff"
}

function menuSelect(state, query) {
  router.push({name: state, query: query})
}

function messageCount() {
  return !timelineActive.value && (messageValue.value === 0)
}

function login() {
  loginVisible.value = true
}

function dropdownClick(item) {
  router.push({name: item})
}

function writeArticle() {
  const {href} = router.resolve({
    name: "article.write",
    query: {mode: 'create'}
  });
  window.open(href, "_blank");
}

function writeTalk() {
  const {href} = router.resolve({
    name: "talk.write",
    query: {mode: 'create'}
  });
  window.open(href, "_blank");
}

function searchChange(s) {
  goToPage("search", {search: s})
}

onBeforeMount(function () {
  init()
})

router.afterEach(function (route) {
  activeMenu.value = route.name.split(".")[0]
})

</script>
<style lang="scss">

.main-container {

  .main-header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid var(--el-border-color-lighter);
    background-color: var(--el-color-white);


    .main-menu {
      display: flex;
      border: unset;
      height: 100%;
      width: 1200px;
      align-items: center;

      .main-menu-item {
        font-size: 13px;
        height: 100%;
      }

      .search {
        width: 200px;
        margin: 0 50px;
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

      .main-menu-icon {
        color: #909399;
        margin: 0 30px 0 50px;
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
    padding: unset;
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
