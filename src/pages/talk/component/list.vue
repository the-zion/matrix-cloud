<template>
  <el-row class="talk-list" id="talk-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-space class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('talk', {id:item.id})">
        <el-row class="talk-card" align="top">
          <el-image v-show="item.cover" class="image" fit="cover" :src="item.cover" lazy></el-image>
          <el-row class="container" :class="{'full':!item.cover}">
            <el-space class="main" fill :size="5">
              <el-space class="head">
                <el-popover placement="top-start" :show-arrow="false" :width="312" trigger="hover"
                            popper-class="popover" @before-enter="item['showUserCard'] = true"
                            @after-leave="item['showUserCard'] = false">
                  <template #reference>
                    <el-avatar @click.stop="goToPage('user', {id:item.uuid,menu:'timeline'})" class="avatar"
                               :size="24" icon="UserFilled"
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
  name: "MatrixTalkList"
}
</script>

<script setup>
import {ref, onBeforeMount} from "vue";
import {goToPage} from "../../../utils/globalFunc";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";
import {baseMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {info} from "../../../utils/message";
import {axiosGetAll, get} from "../../../utils/axios";

const emits = defineEmits(["current-page"])
const baseStore = baseMainStore()
const {avatar, talk} = storeToRefs(baseStore)

let data = ref([])
let list = ref([])
let loading = ref(false)
let isBottom = false
let currentPage = 1
let mode = "new"
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
  if (isBottom) {
    info("到最底部啦～")
    return
  }

  if (getDataLock) {
    return
  }

  loading.value = true
  getDataLock = true
  get((mode === "new" ? "/v1/get/talk/list?page=" : "/v1/get/talk/list/hot?page=") + currentPage).then(function (reply) {
    list.value = reply.data.talk
    let size = reply.data.talk.length
    if (size === 0) {
      isBottom = true
      info("到最底部啦～")
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

onBeforeMount(() => {
  init()
})
</script>

<style scoped lang="scss">
.talk-list {
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
          height: 125px;
          width: 180px;
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
                font-size: 14px;
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

              .time {
                font-size: 14px;
                color: var(--el-text-color-regular)
              }
            }

            .content {
              width: 100%;
              height: 43px;
              font-size: 14px;
              line-height: 20px;
              color: var(--el-text-color-regular);
              word-break: break-word;
              align-self: stretch;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }

          .foot {
            width: 100%;
            margin-top: 5px;

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

        .full {
          width: 100%;
        }
      }
    }
  }

  .skeleton {
    padding: 16px;
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>