<template>
  <el-container class="collect-container">
    <el-backtop></el-backtop>
    <el-row class="header">
      <el-row class="block">
        <el-row class="body">
          <el-row justify="start" class="title">{{ collectionProfile["name"] }}</el-row>
          <el-row justify="start" class="introduce">{{ collectionProfile["introduce"] }}</el-row>
          <el-row justify="space-between" class="user" align="middle">
            <el-avatar class="avatar" :size="32" icon="UserFilled"
                       :src="avatar.baseUrl + userId + '/avatar.webp'"></el-avatar>
            <el-row class="name">{{ userProfile["username"] }}</el-row>
            <el-row class="word" @click="moreCollect">更多收藏集 ></el-row>
          </el-row>
        </el-row>
      </el-row>
    </el-row>
    <el-row class="area">
      <el-row class="main">
        <el-row class="menu" align="middle">
          <el-space @click="pageChange('article')">
            <span class="label" :class="{'select': page === 'article'}">文章</span>
            <span class="label" :class="{'select': page === 'article'}">{{ data["article"] || 0 }}</span>
          </el-space>
          <el-divider direction="vertical"></el-divider>
          <el-space @click="pageChange('column')">
            <span class="label" :class="{'select': page === 'column'}">专栏</span>
            <span class="label" :class="{'select': page === 'column'}">{{ data["column"] || 0 }}</span>
          </el-space>
          <el-divider direction="vertical"></el-divider>
          <el-space @click="pageChange('talk')">
            <span class="label" :class="{'select': page === 'talk'}">讨论</span>
            <span class="label" :class="{'select': page === 'talk'}">{{ data["talk"] || 0 }}</span>
          </el-space>
        </el-row>
        <el-row class="body">
          <article-collect-list v-if="page === 'article'" :userId="userId"
                                @row-delete="rowDelete('article')"></article-collect-list>
          <column-collect-list v-if="page === 'column'" :userId="userId"
                               @row-delete="rowDelete('column')"></column-collect-list>
          <talk-collect-list v-if="page === 'talk'" :userId="userId"
                             @row-delete="rowDelete('talk')"></talk-collect-list>
        </el-row>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {get} from "../../utils/axios";
import {onBeforeRouteLeave, useRoute} from "vue-router";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onBeforeMount, ref} from "vue"
import {baseMainStore, userMainStore} from "../../store";
import router from "../../router";
import ArticleCollectList from "../article/component/collect.vue";
import TalkCollectList from "../talk/component/collect.vue";
import ColumnCollectList from "../column/component/collect.vue";
import {removeScrollToBottomListen} from "../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {collections, avatar} = storeToRefs(baseStore)

let collectionsId = ref()
let userId = ref()
let page = ref("article")
let data = ref({})

let collectionProfile = ref({
  name: "暂无数据",
  introduce: "暂无数据"
})
let userProfile = ref({
  username: "暂无数据"
})

function init() {
  initData()
  getData()
}

function initData() {
  collectionsId.value = useRoute().query["id"]
}

function getData() {
  if (!collectionsId.value) {
    return
  }
  getCollections()
}

function getCollections() {
  get("/v1/get/collections?id=" + collectionsId.value + "&uuid=" + (uuid.value || "")).then(function (reply) {
    if (!reply.data) {
      return
    }
    data.value = reply.data
    userId.value = data.value.uuid
    getCollectionsProfile()
    getUserInfo()
  })
}

function getCollectionsProfile() {
  get(collections.value.baseUrl + userId.value + "/" + collectionsId.value + "/content").then(function (reply) {
    collectionProfile.value = reply.data
  })
}

function getUserInfo() {
  get("/v1/get/user/info/visitor?uuid=" + userId.value).then(function (reply) {
    userProfile.value = reply.data
  })
}

function pageChange(m) {
  removeScrollToBottomListen()
  page.value = m
}

function moreCollect() {
  const {href} = router.resolve({
    name: "user.collect",
    query: {id: userId.value, menu: 'collections'}
  });
  window.open(href, "_blank");
}

function rowDelete(menu) {
  let r = data.value[menu] - 1
  r >= 0 ? (data.value[menu] = r) : (data.value[menu] = 0)
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.collect-container {
  width: 100%;
  flex-direction: column;

  .header {
    width: 100%;
    position: relative;

    .image {
      width: 100%;
      height: 100%;
    }

    .block {
      width: 100%;
      height: 100%;
      background-color: var(--el-color-white);
      border: 1px solid var(--el-border-color-lighter);

      .body {
        margin: 24px auto;
        width: 700px;

        .title {
          width: 100%;
          font-size: 26px;
          line-height: 36px;
          font-weight: 600;
        }

        .introduce {
          width: 100%;
          min-height: 22px;
          font-weight: 400;
          overflow: visible;
          word-break: break-all;
          box-sizing: border-box;
          min-width: 0;
          color: var(--el-text-color-regular);
          font-size: 18px;
          line-height: 22px;
          margin-top: 8px;
        }

        .user {
          margin-top: 8px;

          .avatar {
            margin-right: 10px;
          }

          .name {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: v-bind(coverColor);
            margin-right: 10px
          }

          .word {
            font-size: 12px;
            line-height: 20px;
            color: v-bind(coverColor);
            opacity: .8;
            cursor: pointer;
          }
        }
      }
    }
  }

  .area {
    width: 100%;
    margin: 20px 0;

    .main {
      width: 700px;
      margin: auto;
      background-color: var(--el-color-white);
      border: 1px solid var(--el-border-color-lighter);

      .menu {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid var(--el-border-color-lighter);

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

      .body {
        width: 100%;
      }
    }
  }
}
</style>