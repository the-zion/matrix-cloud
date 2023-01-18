<template>
  <el-row class="subscribe-list" id="subscribe-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-space class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('column', {id:item.id})">
        <el-row class="column-card" align="middle">
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
        <el-space class="operation" size="large">
          <el-button :type="userSubscribeColumn[item.id]?'info':'primary'"
                     :icon="userSubscribeColumn[item.id]?'':'Plus'"
                     :loading="item['subscribeLoading']"
                     @click.stop="subscribe(item)" :text="userSubscribeColumn[item.id]"
                     :bg="userSubscribeColumn[item.id]">
            {{ userSubscribeColumn[item.id] ? '取消订阅' : '订阅' }}
          </el-button>
        </el-space>
      </el-row>
    </el-space>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "ColumnSubscribeList"
}
</script>

<script setup>
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {getAssets, goToPage} from "../../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onBeforeMount, ref} from "vue";
import {axiosGetAll, get, post} from "../../../utils/axios";
import {error, success, warning} from "../../../utils/message";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const userStore = userMainStore()
const emits = defineEmits(["row-delete"])
const baseStore = baseMainStore()
const {avatar, column} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let count = ref({})
let introduce = ref({})
let loading = ref(false)
let visible = ref(false)
let userSubscribeColumn = ref({})
let request = 0
let currentPage = 1
let isBottom = ref(false)
let getDataLock = false

function init() {
  initData()
  getData()
  getUserSubscribe()
}

function initData() {
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (!uuid.value || isBottom.value || getDataLock) {
    return
  }
  data.value = []
  list.value = []
  loading.value = true
  getDataLock = true
  getSubscribe()
}

function getSubscribe() {
  post("/v1/get/subscribe/list", {
    page: currentPage,
  }).then(function (reply) {
    list.value = reply.data.subscribe
    let size = reply.data.subscribe.length
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
    data.value = data.value.concat(list.value)
    loading.value = false
    getDataLock = false
  })
}

function getUserSubscribe() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/user/subscribe/column").then(function (reply) {
    userSubscribeColumn.value = reply.data.subscribe
  })
}

function subscribe(item) {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (item.uuid === uuid.value) {
    warning("自己的专栏不能订阅")
    return
  }

  if (userSubscribeColumn.value[item.id]) {
    cancelSubscribe(item)
  } else {
    setSubscribe(item)
  }
}

function setSubscribe(item) {
  item['subscribeLoading'] = true
  post("/v1/subscribe/column", {id: item.id}).then(function () {
    success("已订阅")
    userSubscribeColumn.value[item.id] = true
    emits("row-delete", -1)
  }).catch(function () {
    error("订阅出错，请稍后再试")
  }).then(function () {
    item['subscribeLoading'] = false
  })
}

function cancelSubscribe(item) {
  item['subscribeLoading'] = true
  post("/v1/cancel/subscribe/column", {id: item.id}).then(function () {
    success("已取消订阅")
    userSubscribeColumn.value[item.id] = false
    emits("row-delete", 1)
  }).catch(function () {
    error("取消出错，请稍后再试")
  }).then(function () {
    item['subscribeLoading'] = false
  })
}

onBeforeMount(function () {
  init()
})
</script>


<style scoped lang="scss">
.subscribe-list {
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
          width: 360px;
          height: 40px;
          font-size: 12px;
          line-height: 20px;
          color: var(--el-text-color-secondary);
          word-break: break-all;
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
        right: 14px;
      }
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>