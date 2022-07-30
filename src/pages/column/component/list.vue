<template>
  <el-row class="column-list" id="column-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-space class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('column', {id:item.id})">
        <el-row class="column-card" align="top">
          <el-image class="image" fit="cover" :src="item.cover" lazy></el-image>
          <el-row class="container" align="top">
            <el-space class="main">
              <el-row class="title">{{ item.name }}</el-row>
              <el-space class="info">
                <el-tag round v-show="item.tags" type="info" v-for="tag in (item.tags?item.tags.split(';'):[])"
                        :key="tag">{{
                    tag
                  }}
                </el-tag>
              </el-space>
            </el-space>
            <el-row class="content">{{ item.introduce }}</el-row>
            <el-space class="foot">
              <el-space :size="3">
                <el-icon class="iconfont icon-like icon"></el-icon>
                <span class="num">{{
                    item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree
                  }}</span>
              </el-space>
              <el-space :size="3">
                <el-icon class="iconfont icon-eye icon"></el-icon>
                <span class="num">{{
                    item.view > 1000 ? (item.view / 1000).toFixed(1) + "k" : item.view
                  }}</span>
              </el-space>
              <el-space :size="3">
                <el-icon class="iconfont icon-star icon"></el-icon>
                <span class="num">{{
                    item.collect > 1000 ? (item.collect / 1000).toFixed(1) + "k" : item.collect
                  }}</span>
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
  name: "MatrixColumnList"
}
</script>

<script setup>
import {ref, watch, onMounted} from "vue";
import {goToPage} from "../../../utils/globalFunc";
import {confirm} from "../../../utils/globalFunc";
import {info, success} from "../../../utils/message";
import {baseMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";
import {axiosGetAll, get} from "../../../utils/axios";

const emits = defineEmits(["current-page"])
const baseStore = baseMainStore()
const {avatar, column} = storeToRefs(baseStore)

let data = ref([])
let list = ref([])
let currentPage = 1
let loading = ref(false)
let isBottom = false
let request = 0
let mode = "new"

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

  loading.value = true
  get((mode === "new" ? "/v1/get/column/list?page=" : "/v1/get/column/list/hot?page=") + currentPage).then(function (reply) {
    list.value = reply.data.column
    let size = reply.data.column.length
    if (size === 0) {
      isBottom = true
      info("到最底部啦～")
      loading.value = false
      return
    }
    request = 2
    currentPage += 1
    getStatistic()
    getIntroduce()
  })
}

function getStatistic() {
  let ids = []
  list.value.forEach(function (each) {
    ids.push("ids=" + each["id"])
  })
  get("/v1/get/column/list/statistic?" + ids.join("&")).then(function (reply) {
    reply.data.count.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.id === item["id"] && (list.value[index] = Object.assign(item, each))
      })
    })
  }).catch(function () {
  }).then(function () {
    request -= 1
    if (request === 0) {
      data.value = data.value.concat(list.value)
      loading.value = false
    }
  })
}

function getIntroduce() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(column.value.baseUrl + item["uuid"] + "/" + item["id"] + "/introduce")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.data.id === item["id"] && (list.value[index] = Object.assign(item, each.data))
      })
    })
  }, function () {
  }, function () {
    request -= 1
    if (request === 0) {
      data.value = data.value.concat(list.value)
      loading.value = false
    }
  })
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

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.column-list {
  width: 100%;

  .skeleton {
    padding: 16px;
  }

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

      .column-card {
        width: 100%;
        padding: 16px;

        .image {
          height: 120px;
          width: 170px;
          border-radius: 6px;
          margin-right: 16px;
        }

        .container {
          width: 70%;
          height: 100%;
        }

        .main {
          width: 100%;
          height: fit-content;

          .title {
            font-size: 16px;
            line-height: 24px;
            font-weight: 500;
            color: var(--el-text-color-secondary)
          }

          .title:hover {
            color: var(--el-color-primary);
          }

          .info {
            width: 100%;
          }
        }

        .content {
          margin-top: 8px;
          height: 40px;
          font-size: 14px;
          line-height: 20px;
          color: var(--el-text-color-secondary);
          word-break: break-word;
          align-self: stretch;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .foot {
          width: 100%;
          margin-top: 8px;

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

      .operation {
        position: absolute;
        top: 16px;
        right: 0;

        .icon {
          color: var(--el-text-color-placeholder);
          font-size: 20px;
          cursor: pointer;
        }

        .star {
          color: #ffa116;
          font-size: 20px;
          cursor: pointer;
        }

        .icon:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>