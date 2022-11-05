<template>
  <el-container class="message-container">
    <el-backtop></el-backtop>
    <el-row class="background-box">
      <el-image class="message-background"
                :src="messageBackground"
                fit="cover"
      ></el-image>
    </el-row>
    <el-affix :offset="0">
      <el-aside class="message-aside" id="message-aside" width="140px">
        <el-row class="navigation-box">
          <navigation :comment="notification.comment" :subComment="notification.subComment" :system="notification.system"
                      :active="timelineActive" v-if="!loading"></navigation>
        </el-row>
      </el-aside>
    </el-affix>
    <el-main class="message-main">
      <el-row class="main">
        <router-view v-slot="{ Component }">
          <component :is="Component" :timeline="notification.timeline" v-model:lastTime="lastTime"
                     v-model:comment="notification.comment" v-model:subComment="notification.subComment" v-model:system="notification.system"
                     v-if="!loading"/>
        </router-view>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>

import {onMounted, ref} from "vue";
import Navigation from "./component/navigation.vue";
import {get} from "../../utils/axios";
import {onBeforeRouteLeave} from "vue-router";
import {removeScrollToBottomListen} from "../../utils/scroll";
import {getAssets} from "../../utils/globalFunc";

const messageBackground = getAssets("message.webp")
let notification = ref({
  timeline: {},
  comment: 0,
  subComment: 0,
  system: 0
})

let lastTime = ref(0)
let timelineActive = ref(false)
let loading = ref(true)

function init() {
  initData()
  getMessageNotification()
}

function getMessageNotification() {
  get("/v1/get/message/notification").then(function (reply) {
    notification.value.timeline = reply.data.timeline
    notification.value.comment = reply.data.comment
    notification.value.subComment = reply.data.subComment
    notification.value.system = reply.data.system
    getMailBoxLastTime()
  }).catch(function () {
    loading.value = false
  })
}

function getMailBoxLastTime() {
  get("/v1/get/mailbox/last/time").then(function (reply) {
    lastTime.value = reply.data.time
    setActive()
  }).catch(function () {
    loading.value = false
  })
}

function setActive() {
  Object.keys(notification.value.timeline).forEach(function (item) {
    if (notification.value.timeline[item] > lastTime.value) {
      timelineActive.value = true
      return null
    }
  })
  loading.value = false
}

function initData() {
  let background = document.getElementsByClassName("message-background")
  let aside = document.getElementById("message-aside")
  aside.style.height = background[0].clientHeight + "px"
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.message-container {
  width: 940px;
  margin: auto;

  .message-background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .message-aside {
    .navigation-box {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }

  .message-main {
    padding: unset;
    width: 800px;

    .main {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>