<template>
  <el-row class="collect-list" id="user-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
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
        <el-space class="operation" v-if="props.userId === uuid">
          <el-popconfirm title="取消收藏确认"
                         confirm-button-text="确定"
                         cancel-button-text="取消"
                         @confirm="cancelCollect(item)"
          >
            <template #reference>
              <el-space :size="3" @click.stop="">
                <el-icon class="iconfont icon-star icon"></el-icon>
                <span class="word">取消收藏</span>
              </el-space>
            </template>
          </el-popconfirm>
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
  name: "ColumnCollectList"
}
</script>

<script setup>
import {baseMainStore, userMainStore} from "../../../store";
import {goToPage} from "../../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {axiosGetAll, get, post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, column} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  userId: String
})

let data = ref([])
let list = ref([])
let loading = ref(false)
let currentPage = ref(1)
let pageTotal = ref(1)
let collectionsId = null
let request = 0

function init() {
  initData()
  getData()
  getDataCount()
}

function initData() {
  collectionsId = useRoute().query["id"]
}


function getData() {
  if (!collectionsId) {
    return
  }
  data.value = []
  list.value = []
  loading.value = true
  get("/v1/get/collect/column?id=" + collectionsId + "&page=" + currentPage.value).then(function (reply) {
    list.value = reply.data.column
    request = 2
    getStatistic()
    getIntroduce()
  }).catch(function (){
    loading.value = false
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
    allData.forEach(function (each, index) {
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

function getDataCount() {
  if (!collectionsId) {
    return
  }
  get("/v1/get/collect/column/count?id=" + collectionsId).then(function (reply) {
    pageTotal.value = reply.data.count
  })
}

function cancelCollect(item) {
  post("/v1/cancel/column/collect", {
    id: item.id,
    uuid: item.uuid,
  }).then(function () {
    success("收藏已取消")
    getData()
  }).catch(function () {
    error("取消收藏失败")
  })
}


onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.collect-list {
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
        bottom: 16px;
        right: 16px;
        color: var(--el-text-color-placeholder);
        cursor: pointer;

        .icon {
          font-size: 20px;
        }

        .word {
          font-size: 14px;
        }
      }

      .operation:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>