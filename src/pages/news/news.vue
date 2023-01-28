<template>
  <el-row class="news-list" id="news-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-space class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="newsClick(item)">
        <el-row class="news-card" align="top">
          <el-row class="container">
            <el-space class="main" fill :size="5">
              <el-space class="head">
                <el-row class="title">{{ item.title }}</el-row>
              </el-space>
              <el-space class="info">
                <el-row class="time">{{ "发布于 " + item.update }}</el-row>
                <el-tag round v-show="item.tags" type="info" v-for="tag in (item.tags?item.tags.split(';').slice(0,5):[])"
                        :key="tag">{{
                    tag
                  }}
                </el-tag>
                <el-space class="author" :size="3">
                  <el-icon><User /></el-icon>
                  <span>{{item.author}}</span>
                </el-space>
              </el-space>
              <el-space v-if="item.introduce" class="body" alignment="flex-start">
                <el-image v-if="item.cover" class="image" fit="cover" :src="news.baseUrl + item.id + '/cover.webp'"
                          lazy :preview-src-list="[news.baseUrl + item.id + '/cover.webp']" @click.stop="" preview-teleported></el-image>
                <span class="content">{{ item.introduce }}</span>
              </el-space>
            </el-space>
          </el-row>
        </el-row>
      </el-row>
    </el-space>
    <el-skeleton class="skeleton" v-show="loading" :rows="3" animated/>
  </el-row>
</template>

<script>
export default {
  name: "MatrixNewsList"
}
</script>

<script setup>
import {ref, onBeforeMount} from "vue";
import {scrollToBottomListen, throttle} from "../../utils/scroll";
import {baseMainStore} from "../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {axiosGetAll, get} from "../../utils/axios";
import {getAssets} from "../../utils/globalFunc";
import {info} from "~/utils/message";

const emits = defineEmits(["current-page"])
const baseStore = baseMainStore()
const {news} = storeToRefs(baseStore)
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let loading = ref(false)
let isBottom = false
let currentPage = 1
let request = 0
let mode = "technology"
let getDataLock = false

function init() {
  initData()
  getData()
}

function initData() {
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (isBottom) {
    info("到最底部啦～")
    return
  }

  if (getDataLock) {
    return
  }

  loading.value = true
  getDataLock = true
  get("/v1/get/news?page=" + currentPage).then(function (reply) {
    list.value = reply.data.news
    let size = reply.data.news.length
    if (size === 0) {
      isBottom = true
      info("到最底部啦～")
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
    endpoints.push(news.value.baseUrl + item["id"] + "/introduce")
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

function newsClick(item) {
  window.open(item.url, '_blank')
}

function modeChange(m) {
  mode = m
  isBottom = false
  currentPage = 1
  data.value = []
  getData()
}

defineExpose({
  modeChange
})

onBeforeMount(() => {
  init()
})
</script>

<style scoped lang="scss">
.news-list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .data {
    width: 100%;

    .each {
      position: relative;
      border-bottom: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      cursor: pointer;

      .news-card {
        width: 100%;
        padding: 16px;

        .container {
          width: 100%;

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

              .time {
                font-size: 14px;
                color: var(--el-text-color-regular)
              }

              .author{
                font-size: 14px;
                color: var(--el-text-color-secondary);
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
        }
      }
    }
  }

  .skeleton {
    padding: 16px;
  }
}
</style>