<template>
  <el-container class="reply-container">
    <el-header class="reply-header" height="50px">
      <el-row v-for="item in menu" class="option" align="middle" @click="menuSelect(item)">
        <span>{{ item.label }}</span>
        <span class="bottom-line" v-show="currentMenu === item.key"></span>
      </el-row>
    </el-header>
    <Article mode="Reply" v-if="currentMenu === 'article'" v-bind:statistic="commentUser"
             @row-delete="rowDelete"></Article>
    <Talk mode="Reply" v-if="currentMenu === 'talk'" v-bind:statistic="commentUser" @row-delete="rowDelete"></Talk>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import {onBeforeRouteLeave, useRoute} from "vue-router";
import {get} from "../../utils/axios";
import router from "../../router";
import {removeScrollToBottomListen} from "../../utils/scroll";
import Article from "./component/comment/article.vue";
import Talk from "./component/comment/talk.vue";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

function menuSelect(item) {
  removeScrollToBottomListen()
  currentMenu.value = item.key
  router.push({name: "creation.reply", query: {menu: item.key}})
}

const menu = [{
  key: "article",
  label: "文章",
}, {
  key: "talk",
  label: "讨论",
},]

let data = ref({})
let commentUser = ref({})
let currentMenu = ref(useRoute().query["menu"])

function rowDelete(value) {
  let r = data.value[currentMenu.value] - (value || 1)
  r >= 0 ? (data.value[currentMenu.value] = r) : (data.value[currentMenu.value] = 0)
}

function init() {
  initData()
  getData()
}

function initData() {
  data.value = props.data
}

function getData() {
  get("/v1/get/comment/user").then(function (reply) {
    commentUser.value = reply.data
  })
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.reply-container {
  width: 100%;
  flex-direction: column;
  background-color: var(--el-color-white);

  .reply-header {
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    align-items: center;
    line-height: 22px;
    display: flex;

    .option {
      height: 100%;
      margin-right: 40px;
      position: relative;
      cursor: pointer;

      .statistic {
        margin-left: 5px;
      }

      .bottom-line {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: 50px;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        z-index: 10;
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>