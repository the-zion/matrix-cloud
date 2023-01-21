<template>
  <el-row class="collect-list" id="talk-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
    <el-space class="data" fill :size="0">
      <el-row v-for="(item, index) in data" class="each" :key="item.id"
              @click="goToPage('talk', {id:item.id})">
        <el-row class="talk-card" align="top">
          <el-image v-show="item.cover" class="image" fit="cover" :src="item.cover" lazy :preview-src-list="[item.cover]" @click.stop="" preview-teleported></el-image>
          <el-row class="container" :class="{'full':!item.cover}">
            <el-space class="main" fill>
              <el-space class="head">
                <el-popover placement="top-start" :show-arrow="false" :width="312" trigger="hover"
                            popper-class="popover" @before-enter="item['showUserCard'] = true"
                            @after-leave="item['showUserCard'] = false">
                  <template #reference>
                    <el-avatar @click.stop="goToPage('user', {id:item.uuid,menu:'timeline'})" class="avatar"
                               :size="32" icon="UserFilled"
                               :src="avatar.baseUrl + item.uuid + '/avatar.webp'"/>
                  </template>
                  <matrix-user-mini-card :uuid="item.uuid" v-if="item['showUserCard']"></matrix-user-mini-card>
                </el-popover>
                <el-row class="title">{{ item.title }}</el-row>
              </el-space>
              <el-space class="info">
                <el-row class="time">{{ "发布于 " + item.update }}</el-row>
                <el-tag round v-show="item.tags" type="info" v-for="tag in (item.tags?item.tags.split(';'):[])"
                        :key="tag">{{
                    tag
                  }}
                </el-tag>
              </el-space>
              <span class="content">{{ item.text }}</span>
            </el-space>
            <el-space class="foot">
              <el-space :size="3">
                <el-icon class="iconfont icon-like icon"></el-icon>
                <span class="num">{{ item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree }}</span>
              </el-space>
              <el-space :size="3">
                <el-icon class="iconfont icon-eye icon"></el-icon>
                <span class="num">{{ item.view > 1000 ? (item.view / 1000).toFixed(1) + "k" : item.view }}</span>
              </el-space>
              <el-space :size="3">
                <el-icon class="iconfont icon-message icon"></el-icon>
                <span class="num">{{
                    item.comment > 1000 ? (item.comment / 1000).toFixed(1) + "k" : item.comment
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
  </el-row>
</template>

<script>
export default {
  name: "TalkCollectList"
}
</script>

<script setup>
import {confirm, getAssets, goToPage} from "../../../utils/globalFunc";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {axiosGetAll, get, post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, talk} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  userId: String
})
const emits = defineEmits(["row-delete"])
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let count = ref({})
let introduce = ref({})
let loading = ref(false)
let userId = ref()
let collectionsId = null
let currentPage = 1
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
  get("/v1/get/collect/talk/list?id=" + collectionsId + "&page=" + currentPage).then(function (reply) {
    list.value = reply.data.talk
    let size = reply.data.talk.length
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
    endpoints.push(talk.value.baseUrl + item["uuid"] + "/" + item["id"] + "/introduce")
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
  post("/v1/cancel/talk/collect", {
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

  .data {
    width: 100%;

    .each {
      position: relative;
      border-bottom: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      cursor: pointer;

      .talk-card {
        width: 100%;
        padding: 16px;

        .image {
          height: 135px;
          width: 200px;
          border-radius: 6px;
          margin-right: 16px;

        }

        .container {
          width: calc(100% - 216px);

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

              .time {
                font-size: 14px;
                color: var(--el-text-color-regular)
              }
            }

            .content {
              text-align: left;
              width: 100%;
              height: 43px;
              font-size: 14px;
              line-height: 24px;
              color: var(--el-text-color-regular);
              word-break: break-all;
              align-self: stretch;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
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

        .full {
          width: 100%;
        }
      }
    }
  }

  .skeleton {
    padding: 16px;
  }
}
</style>