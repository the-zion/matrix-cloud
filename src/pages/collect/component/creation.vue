<template>
  <el-row class="creation-list" id="creation-list">
    <collections-create v-model:visible="visible" v-bind:mode="'edit'" v-bind:id="collectionsId"
                        @editAfter="editAfter"></collections-create>
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-space class="data" fill :size="0">
      <el-row v-for="(item, index) in data" class="each" :key="item.id"
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
        <el-space class="operation" size="large">
          <el-space :size="3" @click.stop="collectionsEdit(item)" class="op">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span class="word">编辑</span>
          </el-space>
          <el-space :size="3" @click.stop="collectionsDeleteConfirm(item,index)" class="op">
            <el-icon>
              <Delete/>
            </el-icon>
            <span class="word">删除</span>
          </el-space>
        </el-space>
      </el-row>
    </el-space>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "CollectCreationList"
}
</script>

<script setup>
import {ref, onBeforeMount} from "vue";
import {confirm, getAssets, goToPage} from "../../../utils/globalFunc";
import {error, success} from "../../../utils/message";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {post, get, axiosGetAll} from "../../../utils/axios";
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
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (!uuid.value || isBottom.value || getDataLock) {
    return
  }
  loading.value = true
  getDataLock = true
  post("/v1/get/collections/list", {
    page: currentPage,
  }).then(function (reply) {
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
    endpoints.push(collections.value.baseUrl + uuid.value + "/" + item["id"] + "/content")
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

function collectionsEdit(item) {
  visible.value = true
  collectionsId.value = item.id
}

function collectionsDelete(item, index) {
  post("/v1/delete/collections", {
    id: item.id
  }).then(function () {
    success("收藏集已删除")
    data.value.splice(index, 1);
    emits("row-delete")
  }).catch(function () {
    error("收藏集删除失败")
  })
}

function collectionsDeleteConfirm(item, index) {
  confirm("收藏集删除", "确认删除该收藏集吗").then(function () {
    collectionsDelete(item, index)
  })
}

function editAfter() {
  getData()
}

onBeforeMount(() => {
  init()
})
</script>

<style scoped lang="scss">
.creation-list {
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
            max-height: 70px;

            .image {
              height: 100%;
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
      }

      .operation {
        position: absolute;
        top: 16px;
        right: 0;
        color: var(--el-text-color-placeholder);
        cursor: pointer;

        .op {
          .icon {
            font-size: 20px;
          }

          .word {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>