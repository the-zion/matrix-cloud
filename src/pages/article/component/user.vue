<template>
  <el-row class="user-list" id="user-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-row class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('article', {id:item.id})">
        <el-row class="article-card">
          <el-space class="main" fill>
            <el-space class="head">
              <el-avatar class="avatar" :size="32" icon="UserFilled"
                         :src="avatar.baseUrl + item.uuid + '/avatar.webp'"/>
              <el-row class="title">{{ item.title }}</el-row>
            </el-space>
            <el-space class="info">
              <el-row class="time">{{ "发布于 " + item.update }}</el-row>
              <el-tag round v-show="item.tags" type="info"
                      v-for="tag in (item.tags?item.tags.split(';'):[])" :key="tag">{{
                  tag
                }}
              </el-tag>
            </el-space>
            <el-space class="body" alignment="flex-start">
              <el-image v-if="item.cover" class="image" fit="cover" :src="item.cover"
                        lazy></el-image>
              <span class="content">{{ item.text }}</span>
            </el-space>
          </el-space>
          <el-space class="foot">
            <el-space :size="3">
              <el-icon class="iconfont icon-like icon"></el-icon>
              <span class="num">{{
                  item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree || 0
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-eye icon"></el-icon>
              <span
                  class="num">{{
                  item.view > 1000 ? (item.view / 1000).toFixed(1) + "k" : item.view || 0
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-message icon"></el-icon>
              <span
                  class="num">{{
                  item.comment > 1000 ? (item.comment / 1000).toFixed(1) + "k" : item.comment || 0
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-star icon"></el-icon>
              <span
                  class="num">{{
                  item.collect > 1000 ? (item.collect / 1000).toFixed(1) + "k" : item.collect || 0
                }}</span>
            </el-space>
          </el-space>
        </el-row>
      </el-row>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "ArticleUserList"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {getAssets, goToPage} from "../../../utils/globalFunc";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {axiosGetAll, get} from "../../../utils/axios";
import {useRoute} from "vue-router";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let loading = ref(false)
let isBottom = ref(false)
let currentPage = 1
let userId = ref()
let request = null
let getDataLock = false

function init() {
  initData()
  getData()
}

function initData() {
  userId.value = useRoute().query["id"]
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (!userId.value || isBottom.value || getDataLock) {
    return
  }
  list.value = []
  loading.value = true
  getDataLock = true
  get("/v1/get/user/article/list/visitor?page=" + currentPage + "&uuid=" + userId.value).then(function (reply) {
    list.value = reply.data.article
    let size = reply.data.article.length
    if (size === 0) {
      isBottom.value = true
      loading.value = false
      getDataLock = false
      return
    }
    currentPage += 1
    getIntroduce()
  }).catch(function () {
    loading.value = false
    getDataLock = false
  })
}

function getIntroduce() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(article.value.baseUrl + item["uuid"] + "/" + item["id"] + "/introduce")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each, index) {
      list.value[index] = Object.assign(list.value[index], each.data)
    })
  }, function () {
  }, function () {
    data.value = data.value.concat(list.value)
    loading.value = false
    getDataLock = false
  })
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.user-list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .skeleton {
    padding: 16px;
  }

  .data {
    width: 100%;

    .each {
      position: relative;
      border-bottom: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      cursor: pointer;
      width: 100%;

      .article-card {
        width: 100%;
        padding: 16px;

        .main {
          width: 100%;

          .head {
            width: 100%;

            ::v-deep(.el-avatar--circle) {
              border: 1px solid var(--el-border-color-lighter);
            }

            .avatar {
              font-size: 20px;
              border: 1px solid var(--el-border-color-lighter);
            }

            .title {
              display: unset;
              font-size: 16px;
              font-weight: 500;
              color: var(--el-text-color-primary)
            }

            .title:hover {
              color: var(--el-color-primary);
            }
          }

          .info {
            width: 100%;

            .name {
              font-size: 14px;
              color: var(--el-text-color-secondary)
            }

            .time {
              font-size: 14px;
              color: var(--el-text-color-regular)
            }
          }

          .body {
            width: 100%;
            max-height: 80px;

            .image {
              height: 80px;
              width: 120px;
              border-radius: 6px;
            }

            .content {
              text-align: left;
              font-size: 14px;
              line-height: 24px;
              color: var(--el-text-color-regular);
              word-break: break-all;
              align-self: stretch;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            }
          }
        }

        .foot {
          width: 100%;
          margin-top: 1rem;

          .icon {
            font-size: 18px;
            color: var(--el-text-color-secondary)
          }

          .num {
            font-size: 14px;
            color: var(--el-text-color-secondary)
          }
        }
      }
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }

  .skeleton {
    padding: 16px;
  }
}
</style>