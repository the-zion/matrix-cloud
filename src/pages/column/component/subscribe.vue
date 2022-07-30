<template>
  <el-row class="subscribe-list" id="subscribe-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
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
          <el-button :type="item['subscribeJudge'] === 1?'info':'primary'"
                     :icon="item['subscribeJudge'] === 1?'':'Plus'"
                     :loading="item['subscribeLoading']"
                     @click.stop="subscribe(item)" :text="item['subscribeJudge'] === 1"
                     :bg="item['subscribeJudge'] === 1">
            {{ item['subscribeJudge'] === 1 ? '取消订阅' : '订阅' }}
          </el-button>
        </el-space>
      </el-row>
    </el-space>
    <el-row class="foot" justify="center" v-if="data.length !== 0 || currentPage > 1">
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next"
          :total="pageTotal"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "ColumnSubscribeList"
}
</script>

<script setup>
import ColumnCreate from "../../column/component/create.vue";
import {baseMainStore, userMainStore} from "../../../store";
import {goToPage} from "../../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {axiosGetAll, get, post} from "../../../utils/axios";
import {error, success, warning} from "../../../utils/message";
import {scrollTo} from "../../../utils/scroll";

const userStore = userMainStore()
const emits = defineEmits(["current-page"])
const baseStore = baseMainStore()
const {avatar, column} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)

let data = ref([])
let list = ref([])
let count = ref({})
let introduce = ref({})
let userId = ref()
let currentPage = ref(1)
let pageTotal = ref(1)
let loading = ref(false)
let visible = ref(false)
let request = 0

function init() {
  initData()
  getData()
  getDataCount()
}

function initData() {
  userId.value = useRoute().query["id"]
}

function getData() {
  if (!userId.value) {
    return
  }
  data.value = []
  list.value = []
  loading.value = true
  getUserSubscribe()
}

function getDataCount() {
  if (!userId.value) {
    return
  }
  getUserSubscribeCount()
}

function getUserSubscribe() {
  get("/v1/get/subscribe/list?page=" + currentPage.value + "&uuid=" + userId.value).then(function (reply) {
    list.value = reply.data.subscribe
    request = 3
    getStatistic()
    getIntroduce()
    getUserSubscribes()
  })
}

function getUserSubscribeCount() {
  get("/v1/get/subscribe/list/count?uuid=" + userId.value).then(function (reply) {
    pageTotal.value = reply.data.count
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
      data.value = list.value
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
      data.value = list.value
      loading.value = false
    }
  })
}

function getUserSubscribes() {
  if (!userId.value) {
    return
  }

  let ids = []
  list.value.forEach(function (each) {
    ids.push(each["id"])
  })
  post("/v1/get/column/subscribes", {ids: ids}).then(function (reply) {
    reply.data["subscribes"].forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.id === item["id"] && (list.value[index] = Object.assign(item, each))
      })
    })
  }).catch(function () {
  }).then(function () {
    request -= 1
    if (request === 0) {
      data.value = list.value
      loading.value = false
    }
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

  if (item['subscribeJudge'] === 1) {
    cancelSubscribe(item)
  } else {
    setSubscribe(item)
  }
}

function setSubscribe(item) {
  item['subscribeLoading'] = true
  post("/v1/subscribe/column", {id: item.id, author: item.uuid}).then(function () {
    success("已订阅")
    item['subscribeJudge'] = 1
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
    item['subscribeJudge'] = 2
  }).catch(function () {
    error("取消出错，请稍后再试")
  }).then(function () {
    item['subscribeLoading'] = false
  })
}

watch(currentPage, () => {
  scrollTo("subscribe-list")
  getData()
})

onMounted(function () {
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