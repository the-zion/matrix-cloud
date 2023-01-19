<template>
  <el-row class="collect-list" id="user-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-space class="data" fill :size="0">
      <el-row v-for="(item, index) in data" class="each" :key="item.id"
              @click="goToPage('column', {id:item.id})">
        <el-row class="column-card" align="top">
          <el-image class="image" fit="cover" :src="item.cover" lazy :preview-src-list="[item.cover]" @click.stop="" preview-teleported></el-image>
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
              <el-space :size="3" @click.stop="collectDeleteConfirm(item, index)" v-if="props.userId === uuid">
                <el-icon class="iconfont icon-star icon"></el-icon>
                <span class="word">取消收藏</span>
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
  name: "ColumnCollectList"
}
</script>

<script setup>
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {confirm, getAssets, goToPage} from "../../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {axiosGetAll, get, post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, column} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  userId: String
})
const emits = defineEmits(["row-delete"])
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let loading = ref(false)
let currentPage = 1
let collectionsId = null
let request = 0
let isBottom = false
let getDataLock = false

function init() {
  initData()
  getData()
}

function initData() {
  collectionsId = useRoute().query["id"]
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (!collectionsId || isBottom || getDataLock) {
    return
  }
  loading.value = true
  getDataLock = true
  get("/v1/get/collect/column/list?id=" + collectionsId + "&page=" + currentPage).then(function (reply) {
    list.value = reply.data.column
    let size = reply.data.column.length
    if (size === 0) {
      isBottom = true
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
    allData.forEach(function (each, index) {
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

function collectDeleteConfirm(item, index) {
  confirm("收藏取消", "确认取消该收藏吗").then(function () {
    cancelCollect(item, index)
  })
}

function cancelCollect(item, index) {
  post("/v1/cancel/column/collect", {
    id: item.id,
    uuid: item.uuid,
  }).then(function () {
    success("收藏已取消")
    data.value.splice(index, 1);
    emits("row-delete")
  }).catch(function () {
    error("取消收藏失败")
  })
}


onBeforeMount(function () {
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
            display: unset;
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

          .num, .word {
            font-size: 14px;
            color: var(--el-text-color-secondary)
          }
        }
      }
    }
  }
}
</style>