<template>
  <el-row class="creation-list" id="creation-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" :class="{'simple-empty': mode === 'simple'}"
              description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-row class="data">
      <el-row v-for="(item,index) in data" class="each" :key="item.id" :class="{'simple-each': mode === 'simple'}"
              @click="goToPage('talk', {id:item.id})">
        <el-row class="talk-card" align="top">
          <el-image v-show="item.cover" class="image" fit="cover" :src="item.cover" lazy></el-image>
          <el-row class="container" :class="{'full':!item.cover}">
            <el-space class="main" fill>
              <el-space class="head">
                <el-avatar class="avatar" :size="24" icon="UserFilled"
                           :src="avatar.baseUrl + item.uuid + '/avatar.webp'"/>
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
              <el-space :size="3" @click.stop="talkEdit(item)" v-if="mode !== 'simple'">
                <el-icon class="icon">
                  <EditPen/>
                </el-icon>
                <span class="word">编辑</span>
              </el-space>
              <el-space :size="3" @click.stop="talkDeleteConfirm(item,index)" v-if="mode !== 'simple'">
                <el-icon class="icon">
                  <Delete/>
                </el-icon>
                <span class="word">删除</span>
              </el-space>
            </el-space>
          </el-row>
        </el-row>
      </el-row>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "TalkCreationList"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue";
import {confirm, goToPage} from "../../../utils/globalFunc";
import {baseMainStore, userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {axiosGetAll, post} from "../../../utils/axios";
import router from "../../../router";
import {error, success} from "../../../utils/message";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, talk} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  mode: {
    type: String,
    default: ""
  }
})
const emits = defineEmits(["row-delete"])

let data = ref([])
let list = ref([])
let count = ref({})
let introduce = ref({})
let loading = ref(false)
let mode = ref("")
let currentPage = 1
let request = 0
let getDataLock = false
let isBottom = false

function init() {
  initData()
  getData()
}

function initData() {
  mode.value = props.mode
  !mode.value && scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (!uuid.value || isBottom || getDataLock) {
    return
  }
  list.value = []
  loading.value = true
  post(mode.value === "simple" ? "/v1/get/user/talk/list/simple" : "/v1/get/user/talk/list", {page: currentPage}).then(function (reply) {
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

function talkEdit(item) {
  const {href} = router.resolve({name: "talk.write", query: {mode: 'edit', id: item.id}});
  window.open(href, "_blank");
}

function talkDeleteConfirm(item, index) {
  confirm("讨论删除", "确认删除该讨论吗").then(function () {
    talkDelete(item, index)
  })
}

function talkDelete(item, index) {
  post("/v1/delete/talk", {
    id: item.id,
  }).then(function () {
    success("删除成功")
    data.value.splice(index, 1);
    emits("row-delete")
  }).catch(function () {
    error("删除失败")
  })
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.creation-list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .simple-empty {
    padding: unset;
  }

  .data {
    width: 100%;

    .each:last-child {
      border-bottom: unset;
    }

    .simple-each {
      .talk-card {
        padding: 16px 0 !important;
      }
    }

    .each {
      position: relative;
      border-bottom: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      cursor: pointer;
      width: 100%;

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
              line-height: 24px;
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