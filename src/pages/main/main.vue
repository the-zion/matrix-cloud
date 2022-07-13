<template>
  <el-container class="main-container">
    <Login v-model:visible="loginVisible" class="loginDialog"></Login>
    <el-header class="main-header" height="50px">
      <el-menu class="main-menu" @select="menuActive" :default-active="activeMenu"
               :active-text-color="activeColor">
        <el-image class="main-matrix-logo" @click="backToHome"
                  src="../../src/assets/images/matrix.svg"
                  fit="contain"
        ></el-image>
        <el-menu-item class="main-menu-item" :index="item.state" v-for="item in menuList" :key="item.key"
                      @click="menuSelect(item.state, item.query)">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
        <div style="flex-grow: 1"></div>
        <el-dropdown split-button type="primary" trigger="click" v-show="uuid">
          创作中心
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="writeArticle">
                <el-icon>
                  <EditPen/>
                </el-icon>
                <span>写文章</span>
              </el-dropdown-item>
              <el-dropdown-item>
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
          <el-badge :value="messageValue" :max="99" class="main-menu-icon" :hidden=messageCount(messageValue)>
            <el-icon :size="20" @click="add">
              <message/>
            </el-icon>
          </el-badge>
          <el-dropdown size="large" placement="bottom-end" @command="dropdownClick"
                       popper-class="dropdown">
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
import router from "../../router"
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import Login from './component/login.vue'
import Dropdown from './component/dropdown.vue'
import {userMainStore, baseMainStore} from "../../store";
import {storeToRefs} from "pinia/dist/pinia";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar} = storeToRefs(baseStore)
let activeMenu = ref()
let userLogin = ref(false)
let messageValue = ref(0)
let loginVisible = ref(false)
let activeColor = ref()
let menuList = ref([{
  id: 0,
  key: "home",
  name: "学习与讨论",
  state: "home",
  query: {page: 'article'},
}, {
  id: 1,
  key: "about",
  name: "关于matrix",
  state: "about",
  query: {},
}])

function init() {
  initData()
}

function initData() {
  activeMenu.value = useRoute().name.split(".")[0]
}

function backToHome() {
  router.push({name: 'home', query: {page: 'article'}})
}

function menuActive() {
  activeColor.value = "#409eff"
}

function menuSelect(state, query) {
  router.push({name: state, query: query})
}

function messageCount(value) {
  return value === 0
}

function add() {
  messageValue.value += 1
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

onMounted(function () {
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
        margin: 0 20px 0 50px;
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
