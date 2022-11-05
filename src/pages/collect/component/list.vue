<template>
  <el-row class="collect-list" id="collect-list">
    <collections-create v-model:visible="visible" v-bind:mode="'edit'" v-bind:id="collectionsId"></collections-create>
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-space class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('collect', {id:item.id})">
        <el-row class="collect-card">
          <el-space class="main" fill>
            <el-space class="head">
              <el-row class="title">{{ item.name }}</el-row>
            </el-space>
            <el-space class="body">
              <span class="content">{{ item.introduce }}</span>
            </el-space>
          </el-space>
        </el-row>
      </el-row>
    </el-space>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "MatrixCollectList"
}
</script>

<script setup>
import {ref, onBeforeMount} from "vue";
import {getAssets, goToPage} from "../../../utils/globalFunc";
import {useRoute} from "vue-router";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {get, axiosGetAll} from "../../../utils/axios";
import CollectionsCreate from "./create.vue";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const baseStore = baseMainStore()
const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar, collections} = storeToRefs(baseStore)
const emits = defineEmits(["row-delete"])
const noData = getAssets("no_data.svg")

let visible = ref(false)
let data = ref([])
let list = ref([])
let currentPage = 1
let loading = ref(false)
let userId = ref()
let collectionsId = ref()
let isBottom = ref(false)
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
  loading.value = true
  getDataLock = true
  get("/v1/get/collections/list/visitor?uuid=" + userId.value + "&page=" + currentPage).then(function (reply) {
    list.value = reply.data.collections
    let size = reply.data.collections.length
    if (size === 0) {
      isBottom.value = true
      loading.value = false
      getDataLock = false
      return
    }
    currentPage += 1
    getContent()
  }).catch(function () {
    loading.value = false
    getDataLock = false
  })
}

function getContent() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(collections.value.baseUrl + userId.value + "/" + item["id"] + "/content")
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

function opCancel(item) {
  setTimeout(function () {
    item['opShow'] = 'none'
  }, 400)
}

onBeforeMount(() => {
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

      .collect-card {
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
            max-height: 70px;

            .image {
              height: 100%;
              width: 120px;
              border-radius: 6px;
            }

            .content {
              font-size: 14px;
              line-height: 24px;
              color: var(--el-text-color-regular);
              word-break: break-word;
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
</style>