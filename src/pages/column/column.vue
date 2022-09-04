<template>
  <el-container class="column-container">
    <el-backtop></el-backtop>
    <collections-choose v-model:visible="collectionsVisible" :id="columnId"
                        :uuid="authorUuid" :mode="'column'"
                        @collected="collected"></collections-choose>
    <includes-add v-model:visible="includesVisible" :id="columnId"></includes-add>
    <el-main class="main">
      <el-row class="column-block">
        <el-row class="header">
          <el-row class="column-card" align="middle">
            <el-image class="image" fit="cover" :src="data.cover" lazy></el-image>
            <el-row class="container" align="top">
              <el-space class="main">
                <el-avatar class="avatar" :size="32" icon="UserFilled"
                           :src="avatar.baseUrl + authorUuid + '/avatar.webp'"
                           @click="goToPage('user', {id:authorUuid,menu:'article'})"></el-avatar>
                <el-row class="title">{{ data.name }}</el-row>
                <el-space class="info">
                  <el-tag round v-show="data.tags" type="info" v-for="tag in (data.tags?data.tags.split(';'):[])"
                          :key="tag">{{
                      tag
                    }}
                  </el-tag>
                </el-space>
              </el-space>
              <el-row class="content">{{ data.introduce }}</el-row>
              <el-row class="foot" justify="space-between">
                <el-space>
                  <el-space :size="5" class="icon-block">
                    <div ref="iconAgree" @click="agreeClick" :class="{'agree-select':userColumnAgree[columnId]}"
                         class="icon agree-transform">
                      <svg class="symbol-icon" aria-hidden="true" v-show="!userColumnAgree[columnId]">
                        <use :xlink:href="'#icon-like'"></use>
                      </svg>
                      <svg class="symbol-icon" aria-hidden="true" v-show="userColumnAgree[columnId]">
                        <use :xlink:href="'#icon-like-fill'"></use>
                      </svg>
                    </div>
                    <span class="num">{{
                        statistic.agree > 1000 ? (statistic.agree / 1000).toFixed(1) + "k" : statistic.agree
                      }}</span>
                  </el-space>
                  <el-space :size="5" class="icon-block">
                    <el-icon class="iconfont icon-eye icon"></el-icon>
                    <span class="num">{{
                        statistic.view > 1000 ? (statistic.view / 1000).toFixed(1) + "k" : statistic.view
                      }}</span>
                  </el-space>
                  <el-space :size="5" class="icon-block">
                    <div ref="iconCollect" @click="collectClick" :class="{'collect-select':userColumnCollect[columnId]}"
                         class="icon collect-transform">
                      <svg class="symbol-icon" aria-hidden="true" v-show="!userColumnCollect[columnId]">
                        <use :xlink:href="'#icon-star'"></use>
                      </svg>
                      <svg class="symbol-icon" aria-hidden="true" v-show="userColumnCollect[columnId]">
                        <use :xlink:href="'#icon-star-fill'"></use>
                      </svg>
                    </div>
                    <span class="num">{{ userColumnCollect[columnId] ? '已收藏' : '收藏' }}</span>
                  </el-space>
                </el-space>
                <el-button type="primary" v-if="authorUuid === uuid" @click="includesVisible = true">文章添加</el-button>
                <el-button :type="userSubscribeColumn[columnId]?'info':'primary'"
                           :icon="userSubscribeColumn[columnId]?'':'Plus'" v-else
                           :loading="subscribeLoading"
                           @click="subscribe()" :text="userSubscribeColumn[columnId]"
                           :bg="userSubscribeColumn[columnId]">
                  {{ userSubscribeColumn[columnId] ? '取消订阅' : '订阅专栏' }}
                </el-button>
              </el-row>
            </el-row>
          </el-row>
        </el-row>
        <el-row class="body">
          <el-row class="header">
            <el-row class="word" align="middle">收录文章</el-row>
          </el-row>
          <article-column-list></article-column-list>
        </el-row>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import {goToPage} from "../../utils/globalFunc";
import {useRoute} from "vue-router";
import {error, success, warning} from "../../utils/message";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {ref, onBeforeMount} from "vue";
import {get, post} from "../../utils/axios";
import {animationAgree, animationCollect} from "../../utils/animation";
import {baseMainStore, userMainStore} from "../../store";
import router from "../../router";
import ArticleColumnList from "../article/component/column.vue";
import IncludesAdd from "./component/add.vue";
import CollectionsChoose from "../collect/component/choose.vue";


const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar, column} = storeToRefs(baseStore)

let columnId = ref()
let authorUuid = ref()
let backgroundImage = ref()
let visible = ref(false)
let includesVisible = ref(false)
let iconAgree = ref(null)
let iconCollect = ref(null)
let loading = ref(false)
let collectionsVisible = ref(false)
let subscribeLoading = ref(false)
let agreeBounce = ref(1);
let collectBounce = ref(1);
let agreeAnimation = null
let collectAnimation = null
let clickLock = false

let data = ref({
  "name": "暂无数据",
  "introduce": "暂无数据",
  "update": "0000-00-00"
})

let statistic = ref({
  "agree": 0,
  "view": 0,
})
let userColumnAgree = ref({})
let userColumnCollect = ref({})
let userSubscribeColumn = ref({})

function init() {
  animation()
  initData()
  getUserSubscribe()
  getData()
}

function animation() {
  agreeAnimation = animationAgree(iconAgree, agreeBounce)
  collectAnimation = animationCollect(iconCollect, collectBounce)
}

function initData() {
  let i = useRoute()
  columnId.value = i.query["id"]
  if (!columnId.value) {
    columnNotExist()
  }
}

function getUserSubscribe() {
  if (!columnId.value || !uuid.value) {
    return
  }
  get("/v1/get/user/subscribe/column").then(function (reply) {
    userSubscribeColumn.value = reply.data.subscribe
  })
}

function getData() {
  getStatistic()
}

function getStatistic() {
  loading.value = true
  get("/v1/get/column/statistic?id=" + columnId.value + "&uuid=" + (uuid.value || "")).then(function (reply) {
    authorUuid.value = reply.data.uuid
    statistic.value = reply.data
    setView()
    getColumn()
  }).catch(function () {
    columnNotExist()
  })
}

function setView() {
  post("/v1/set/column/view", {
    id: columnId.value,
    uuid: authorUuid.value
  })
}

function getColumn() {
  let url = column.value.baseUrl + authorUuid.value + "/" + columnId.value + "/content"
  get(url).then(function (reply) {
    data.value = reply.data
    getUserArticleAgree()
    getUserArticleCollect()
    background(data.value["cover"])
  }).catch(function () {
    columnNotExist()
  }).then(function () {
    loading.value = false
  })
}

function getUserArticleAgree() {
  if (!columnId.value || !uuid.value) {
    return
  }
  get("/v1/get/user/column/agree").then(function (reply) {
    userColumnAgree.value = reply.data.agree
  })
}

function getUserArticleCollect() {
  if (!columnId.value || !uuid.value) {
    return
  }
  get("/v1/get/user/column/collect").then(function (reply) {
    userColumnCollect.value = reply.data.collect
  })
}

function background(cover) {
  backgroundImage.value = "url(" + cover + ")"
}

function columnNotExist() {
  router.push({name: "result", query: {type: "error", title: '获取专栏失败', description: "专栏不存在或已被删除"}})
}

function agreeClick() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
  }

  if (!columnId.value || !authorUuid.value || clickLock) {
    return
  }

  clickLock = true
  if (!userColumnAgree.value[columnId.value]) {
    agreeAdd()
  } else {
    agreeCancel()
  }
}

function agreeAdd() {
  post("/v1/set/column/agree", {
    id: columnId.value,
    uuid: authorUuid.value,
  }).then(function () {
    agreeAnimation.play()
    userColumnAgree.value[columnId.value] = true
    statistic.value["agree"] += 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function agreeCancel() {
  post("/v1/cancel/column/agree", {
    id: columnId.value,
    uuid: authorUuid.value,
  }).then(function () {
    agreeAnimation.play()
    userColumnAgree.value[columnId.value] = false
    statistic.value["agree"] -= 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function collectClick() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
  }

  if (!columnId.value || !authorUuid.value) {
    return
  }

  if (!userColumnCollect.value[columnId.value]) {
    collectAdd()
  } else {
    collectCancel()
  }
}

function collectAdd() {
  collectionsVisible.value = true
}

function collectCancel() {
  clickLock = true
  post("/v1/cancel/column/collect", {
    id: columnId.value,
    uuid: authorUuid.value,
  }).then(function () {
    collectAnimation.play()
    userColumnCollect.value[columnId.value] = false
    statistic.value["collect"] -= 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function collected() {
  collectAnimation.play()
  userColumnCollect.value[columnId.value] = true
  statistic.value["collect"] += 1
}

function subscribe() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!columnId.value || !authorUuid.value) {
    return
  }

  if (userSubscribeColumn.value[columnId.value]) {
    cancelSubscribe()
  } else {
    setSubscribe()
  }
}

function setSubscribe() {
  subscribeLoading.value = true
  post("/v1/subscribe/column", {id: columnId.value}).then(function () {
    success("已订阅")
    userSubscribeColumn.value[columnId.value] = true
  }).catch(function () {
    error("订阅出错，请稍后再试")
  }).then(function () {
    subscribeLoading.value = false
  })
}

function cancelSubscribe() {
  subscribeLoading.value = true
  post("/v1/cancel/subscribe/column", {id: columnId.value}).then(function () {
    success("已取消订阅")
    userSubscribeColumn.value[columnId.value] = false
  }).catch(function () {
    error("取消出错，请稍后再试")
  }).then(function () {
    subscribeLoading.value = false
  })
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.column-container:before {
  content: "";
  height: 800px;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), v-bind(backgroundImage);
  background-position: 50% 17%;
  opacity: 0.2;
  background-size: cover;
  filter: blur(20px);
  z-index: -1;
}

.column-container {
  width: 100%;

  ::v-deep(.collections-choose) {
    border-radius: 4px;
    margin-top: 10vh;

    .el-dialog__body {
      padding: 0 20px
    }
  }

  ::v-deep(.includes-add) {
    border-radius: 4px;
    margin-top: 10vh;

    .el-dialog__header {
      .header {
        width: 100%;

        .search {
          width: 200px;
          margin-right: 20px;
        }
      }
    }

    .el-dialog__body {
      padding: 0 20px 80px 20px;
    }
  }

  .main {
    width: 100%;

    .column-block {
      width: 800px;
      margin: auto;

      .header {
        width: 100%;
        height: 200px;
        background-color: var(--el-color-white);

        .column-card {
          width: 100%;
          padding: 16px;

          .image {
            height: 160px;
            width: 230px;
            border-radius: 6px;
            margin-right: 16px;
          }

          .container {
            width: calc(100% - 246px);
            height: 100%;
          }

          .main {
            width: 100%;
            height: fit-content;

            .avatar {
              cursor: pointer;
              margin-right: 10px;
            }

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
            width: 100%;
            height: 85px;
            font-size: 12px;
            line-height: 20px;
            color: var(--el-text-color-secondary);
            word-break: break-word;
            align-self: stretch;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
          }

          .foot {
            width: 100%;
            margin-top: 8px;

            .icon-block {
              cursor: pointer;

              .agree-select {
                color: var(--el-color-primary) !important;
              }

              .collect-select {
                color: #ffa500 !important;
              }

              .icon {
                display: inline-flex;
                position: relative;
                height: 20px;
                font-size: 20px;
                color: var(--el-text-color-placeholder);
              }

              .agree-transform {
                transform: scale3d(v-bind(agreeBounce), v-bind(agreeBounce), 1);
              }

              .collect-transform {
                transform: scale3d(v-bind(collectBounce), v-bind(collectBounce), 1)
              }

              .num {
                color: var(--el-text-color-secondary);
              }
            }
          }
        }
      }

      .body {
        width: 100%;
        margin-top: 24px;
        background-color: var(--el-color-white);

        .header {
          width: 100%;
          height: fit-content;
          border-bottom: 1px solid var(--el-border-color-lighter);

          .word {
            color: var(--el-color-primary);
            font-weight: 500;
            height: 46px;
            line-height: 44px;
            font-size: 16px;
            margin: 0 20px;
            border-bottom: 2px solid var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>