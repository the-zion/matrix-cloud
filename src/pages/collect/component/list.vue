<template>
  <el-row class="collect-list" id="collect-list">
    <collections-create v-model:visible="visible" v-bind:mode="'edit'" v-bind:id="collectionsId"
                        @editAfter="editAfter"></collections-create>
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
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
        <el-space class="operation" v-if="userId === uuid" size="large" :style="{'display':item['opShow'] || 'none'}">
          <el-space :size="3" @click.stop="collectionsEdit(item)" class="op">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span class="word">编辑</span>
          </el-space>
          <el-popconfirm title="确认删除该收藏集"
                         confirm-button-text="确定"
                         cancel-button-text="取消"
                         @confirm="collectionsDelete(item)"
                         @cancel="opCancel(item)"
          >
            <template #reference>
              <el-space :size="3" @click.stop="item['opShow'] = 'inline-flex'" class="op">
                <el-icon>
                  <Delete/>
                </el-icon>
                <span class="word">删除</span>
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
  name: "MatrixCollectList"
}
</script>

<script setup>
import {ref, watch, onMounted} from "vue";
import {goToPage, loginTimeOut} from "../../../utils/globalFunc";
import {error, success} from "../../../utils/message";
import {scrollTo} from "../../../utils/scroll";
import {useRoute} from "vue-router";
import {userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {post, get} from "../../../utils/axios";
import CollectionsCreate from "./create.vue";

const emits = defineEmits(["current-page"])
const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)

let visible = ref(false)
let data = ref([])
let currentPage = ref(1)
let pageTotal = ref(1)
let loading = ref(false)
let userId = ref()
let collectionsId = ref()

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
  loading.value = true
  data.value = []
  if (userId.value === uuid.value) {
    getCollections()
  } else {
    getCollectionsVisitor()
  }
}

function getDataCount() {
  if (!userId.value) {
    return
  }
  if (userId.value === uuid.value) {
    getCollectionsCount()
  } else {
    getCollectionsVisitorCount()
  }
}

function getCollections() {
  post("/v1/get/collections", {
    page: currentPage.value
  }).then(function (reply) {
    data.value = reply.data.collections
    loading.value = false
  }).catch(function () {
    error("获取收藏集失败")
  })
}

function getCollectionsVisitor() {
  get("/v1/get/collections/visitor?uuid=" + userId.value + "&page=" + currentPage.value).then(function (reply) {
    data.value = reply.data.collections
    loading.value = false
  }).catch(function () {
  })
}

function getCollectionsCount() {
  post("/v1/get/collections/count", {}).then(function (reply) {
    pageTotal.value = reply.data.count
  })
}

function getCollectionsVisitorCount() {
  get("/v1/get/collections/visitor/count?uuid=" + userId.value).then(function (reply) {
    pageTotal.value = reply.data.count
  })
}

function createAfter() {
  currentPage.value = 1;
  getData()
  getDataCount()
}

function opCancel(item) {
  setTimeout(function () {
    item['opShow'] = 'none'
  }, 400)
}

function collectionsEdit(item) {
  visible.value = true
  collectionsId.value = item.id
}

function collectionsDelete(item) {
  post("/v1/delete/collections", {
    id: item.id
  }).then(function () {
    success("收藏集已删除")
    getData()
  }).catch(function (err) {
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "NOT_EMPTY":
          error("只允许删除空的收藏集")
          return
      }
    }
    error("收藏级删除失败")
  })
}

function editAfter() {
  getData()
}

defineExpose({
  createAfter
})

watch(currentPage, () => {
  scrollTo("collect-list")
  getData()
})

onMounted(() => {
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

      .operation {
        position: absolute;
        display: none;
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

        .op:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .each:hover {
      .operation {
        display: inline-flex !important;
      }
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>