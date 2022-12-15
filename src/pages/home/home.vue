<template>
  <el-container class="home-container" v-if="page">
    <el-backtop></el-backtop>
    <el-row class="menu" justify="space-between">
      <el-row v-for="item in menu" :key="item.key" class="menu-item" @click="select(item)">
        <span class="label" :class="{'select':page === item.key}">{{ item.label }}</span>
        <!--        <el-image fit="fill" class="image" :src="item.image"></el-image>-->
        <video class="image" preload="auto" muted height="10" autoplay loop
               :src="getVideo(item.key)"></video>
      </el-row>
    </el-row>
    <el-row class="main" justify="space-between">
      <el-row class="left-area">
        <el-row class="header" align="middle" v-if="page !== 'news'">
          <span class="label" :class="{'select': mode === 'new'}" @click="modeChange('new')">最新</span>
          <el-divider direction="vertical"></el-divider>
          <span class="label" :class="{'select': mode === 'hot'}" @click="modeChange('hot')">最热</span>
        </el-row>
        <el-row class="header" align="middle" v-if="page === 'news'">
          <span class="label">技术头条</span>
        </el-row>
        <el-row class="body">
          <matrix-article-list v-if="page === 'article'" ref="listRef"></matrix-article-list>
          <matrix-column-list v-if="page === 'column'" ref="listRef"></matrix-column-list>
          <matrix-talk-list v-if="page === 'talk'" ref="listRef"></matrix-talk-list>
          <matrix-news-list v-if="page === 'news'" ref="listRef"></matrix-news-list>
        </el-row>
      </el-row>
      <el-row class="aside">
        <leader-board></leader-board>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref, watch} from "vue"
import {useRoute, useRouter, onBeforeRouteLeave} from "vue-router";
import LeaderBoard from "./component/leaderboard.vue"
import "../../utils/axios"
import {baseMainStore} from "../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {removeScrollToBottomListen} from "../../utils/scroll";
import {getAssets, setTitle} from "../../utils/globalFunc";

const baseStore = baseMainStore()
const {images} = storeToRefs(baseStore)
const router = useRouter()

let listRef = ref()
let page = ref()
let mode = ref("new")
let menu = ref([{
  key: "news",
  label: "技术头条",
}, {
  key: "article",
  label: "博客文章",
}, {
  key: "column",
  label: "专栏分享",
}, {
  key: "talk",
  label: "讨论发起",
}])

function init() {
  setTitle("首页-魔方技术")
  initData()
}

function initData() {
  page.value = useRoute().query["page"]
  if (page.value === 'news') {
    mode.value = "technology"
  }
}

function select(item) {
  removeScrollToBottomListen()
  mode.value = item.key === "news" ? "technology" : "new"
  page.value = item.key
  router.push({name: "home", query: {page: item.key}})
}

function modeChange(m) {
  mode.value = m
  listRef.value.modeChange(m)
}

function getVideo(key) {
  return getAssets(key + ".mp4")
}


watch(() => router.currentRoute.value.query.page, (p) => {
  if (p === "news") {
    page.value = p
  }
}, {immediate: true, deep: true})

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  margin: auto;
  flex-direction: column;

  ::v-deep(.tag-filter-dialog) {
    border-radius: 8px;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 20px 20px 0 20px
    }
  }

  .tags {
    width: 100%;
    min-height: 50px;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--el-border-color-lighter);

    .area {
      width: 980px;
      height: 100%;

      .block {
        width: 900px;
        flex-wrap: wrap;
        margin: 10px 0;

        .label {
          font-size: 15px;
          color: var(--el-text-color-secondary);
          cursor: pointer;
          margin: 8px 0;
        }

        .select {
          color: var(--el-color-primary);
        }
      }

      .filter {
        font-size: 14px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
      }
    }
  }

  .menu {
    width: 980px;
    margin: 10px auto;

    .menu-item {
      width: 240px;
      height: 140px;
      background-color: var(--el-color-white);
      border-radius: 3px;
      border: 1px solid var(--el-border-color-lighter);
      padding: 12px 0 0 16px;
      flex-direction: column;
      cursor: pointer;
      overflow: hidden;

      .label {
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;
        color: var(--el-text-color-regular);
      }

      //.image {
      //  width: calc(100% - 82px);
      //  height: 100%;
      //}

      .image {
        width: 170px;
        height: 180px;
        position: relative;
        bottom: 20px;
        right: 0;
      }

      .select {
        color: var(--el-color-primary);
      }
    }
  }

  .main {
    width: 980px;
    margin: auto;

    .left-area {
      width: 710px;
      height: fit-content;
      background-color: var(--el-color-white);
      border: 1px solid var(--el-border-color-lighter);
      flex-direction: column;
      margin-bottom: 10px;

      .header {
        height: 46px;
        width: 100%;
        border-bottom: 1px solid var(--el-border-color-lighter);
        padding: 0 20px;

        .label {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          cursor: pointer;
        }

        .select {
          color: var(--el-color-primary);
        }
      }

      .body {
        width: 100%;
      }
    }

    .aside {
      width: 260px;
    }
  }
}
</style>