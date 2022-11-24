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
import {get} from "../../utils/axios";
import {getAssets} from "../../utils/globalFunc";

const emits = defineEmits(["current-page"])
const baseStore = baseMainStore()
const {avatar, talk} = storeToRefs(baseStore)
const noData = getAssets("no_data.svg")

let data = ref([])
let loading = ref(false)
let isBottom = false
let currentPage = 1
let request = 0
let mode = "technology"

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
  loading.value = true
  get("/v1/get/news?page=" + currentPage).then(function (reply) {
    data.value = data.value.concat(reply.data["news"])
    currentPage += 1
  }).catch(function () {
  }).then(function () {
    loading.value = false
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
          }

          .foot {
            width: 100%;
            margin-top: 5px;

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
  }

  .skeleton {
    padding: 16px;
  }
}
</style>