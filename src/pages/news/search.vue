<template>
  <el-row class="search-list" id="search-list">
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
                <el-row class="title" v-html="item.title" align="middle"></el-row>
              </el-space>
              <el-space class="info">
                <el-row class="time">{{ "发布于 " + item.update }}</el-row>
                <el-tag round v-show="item.tags" :type="(tags.includes(tag) || [search].includes(tag))?'primary':'info'"
                        :effect="(tags.includes(tag) || [search].includes(tag)) && 'dark'"
                        v-for="tag in (item.tags?item.tags.split(';').slice(0,5):[])" :key="tag">{{
                    tag
                  }}
                </el-tag>
                <el-space class="author" :size="3">
                  <el-icon><User /></el-icon>
                  <span>{{item.author}}</span>
                </el-space>
              </el-space>
              <el-space v-if="item.content" class="body" alignment="flex-start">
                <el-image v-if="item.cover" class="image" fit="cover" :src="news.baseUrl + item.id + '/cover.webp'"
                          lazy :preview-src-list="[news.baseUrl + item.id + '/cover.webp']" @click.stop="" preview-teleported></el-image>
                <span class="content" v-html="item.content"></span>
              </el-space>
            </el-space>
          </el-row>
        </el-row>
      </el-row>
    </el-space>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "NewsSearchList"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {getAssets} from "../../utils/globalFunc";
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {get} from "../../utils/axios";
import {scrollToBottomListen, throttle} from "../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {news} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  search: String,
  time: String,
  tags: {
    type: Array,
    default: [],
  }
})
const noData = getAssets("no_data.svg")

let data = ref([])
let tags = ref([])
let loading = ref(false)
let search = ref("")
let currentPage = 1
let time = "new"
let request = null
let getDataLock = false
let isBottom = false

function init() {
  initData()
  getData()
}

function initData() {
  search.value = props.search
  time = props.time
  tags.value = props.tags
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (isBottom || getDataLock) {
    return
  }
  getDataLock = true
  loading.value = true
  getNewsSearch()
}

function getNewsSearch() {
  get("/v1/get/news/search?page=" + currentPage + "&search=" + search.value + "&time=" + time).then(function (reply) {
    data.value = data.value.concat(reply.data.list)
    let size = reply.data.list.length
    if (size === 0) {
      isBottom = true
      return
    }
    currentPage += 1
  }).catch(function () {
  }).then(function () {
    loading.value = false
    getDataLock = false
  })
}

function newsClick(item) {
  window.open(item.url, '_blank')
}

function searchChange(s, t, selectTags) {
  search.value = s
  time = t
  currentPage = 1
  data.value = []
  tags.value = selectTags
  isBottom = false
  getData()
}

defineExpose({
  searchChange
})

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.search-list {
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
}
</style>