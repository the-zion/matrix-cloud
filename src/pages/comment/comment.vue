<template>
  <el-container class="comment-container" id="comment-container">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-row v-for="(item,index) in data" class="each" :key="item.id" :class="props.shape">
      <el-row class="header" justify="space-between" align="middle">
        <el-space>
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
          <span class="name">{{ item.username }}</span>
        </el-space>
        <span class="time">{{ item.update }}</span>
      </el-row>
      <el-row class="main">
        <div v-html="item.html"></div>
      </el-row>
      <el-row class="footer" justify="space-between" :class="'footer-' + props.shape">
        <el-space>
          <el-space class="icon-block" @click="agreeClick(item)">
            <el-icon class="iconfont icon-like icon"
                     :class="{'icon-like-fill icon-like-clicked':userAgree[item.id]}"></el-icon>
            <span class="num">{{
                item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree || 0
              }}</span>
          </el-space>
          <el-space class="icon-block" @click="item.comment > 0 && (item.fold = !item.fold)">
            <el-icon class="iconfont icon-message icon"></el-icon>
            <span class="num">{{
                item.comment > 1000 ? (item.comment / 1000).toFixed(1) + "k" : item.comment || 0
              }}</span>
          </el-space>
          <el-space class="icon-block" @click="doReply(item)">
            <el-icon class="icon">
              <EditPen/>
            </el-icon>
            <span class="num">添加回复</span>
          </el-space>
          <el-space class="icon-block" v-if="item.uuid === uuid || props.creationAuthor === uuid" @click="commentRemove(index,item)">
            <el-icon class="icon">
              <Delete/>
            </el-icon>
            <span class="num">评论删除</span>
          </el-space>
        </el-space>
      </el-row>
      <el-row class="reply-block" v-if="currentReply === item.id" :class="'reply-block-' + props.shape">
        <matrix-reply :rootId="item.id" :mode="'sub_comment'"></matrix-reply>
      </el-row>
      <el-row class="sub-comment-block" v-if="item.fold" id="sub-comment-block">
        <sub-comment :rootId="item.id" :rootUser="item.uuid"></sub-comment>
      </el-row>
    </el-row>
    <el-row v-show="isBottom && data.length" class="isBottom" justify="center" align="middle">
      <el-divider class="bottom-divider"></el-divider>
      <span class="word">我是有底线的</span>
      <el-divider class="bottom-divider"></el-divider>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="3" animated/>
  </el-container>
</template>

<script>
export default {
  name: "MatrixComment"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import SubComment from "./sub-comment.vue";
import {scrollToBottomListen, throttle} from "../../utils/scroll";
import {confirm, getAssets, goToPage} from "../../utils/globalFunc";
import {axiosGetAll, get, post} from "../../utils/axios";
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {warning, error} from "../../utils/message";
import Prism from 'prismjs';

const props = defineProps({
  shape: String,
  creationId: Number,
  creationType: Number,
  creationAuthor: String
})
const baseStore = baseMainStore()
const {avatar, comment} = storeToRefs(baseStore)
const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let userAgree = ref({})
let currentReply = ref()
let loading = ref(false)
let creationId = null
let creationType = null
let isBottom = ref(false)
let mode = "hot"
let currentPage = 1
let agreeLock = false
let removeLock = false
let getDataLock = false

function init() {
  initData()
  getData()
  getUserAgree()
}

function initData() {
  scrollToBottomListen(throttle(scrollToBottom, 1000))
  creationId = props.creationId
  creationType = props.creationType
}

function scrollToBottom() {
  getData()
}

function doReply(item) {
  if (currentReply.value === item.id) {
    currentReply.value = null
    return
  }
  currentReply.value = item.id
}

function getData() {
  if (isBottom.value || !creationId || !creationType || getDataLock) {
    return
  }

  loading.value = true
  getDataLock = true
  get((mode === "new" ? "/v1/get/comment/list?page=" : "/v1/get/comment/list/hot?page=") + currentPage + "&creationId=" + creationId + "&creationType=" + creationType).then(function (reply) {
    list.value = reply.data.comment
    let size = reply.data.comment.length
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

function getUserAgree() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/user/comment/agree").then(function (reply) {
    userAgree.value = reply.data.agree
  })
}

function getContent() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(comment.value.baseUrl + item["uuid"] + "/" + item["id"] + "/content")
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
    setTimeout(function () {
      Prism.highlightAll()
    }, 50)
  })
}

function modeChange(m) {
  mode = m
  isBottom.value = false
  agreeLock = false
  removeLock = false
  getDataLock = false
  currentPage = 1
  data.value = []
  userAgree.value = {}
  getData()
  getUserAgree()
}

function agreeClick(item) {
  if (agreeLock || !creationId || !creationType) {
    return
  }

  if (!uuid.value) {
    warning("请先登录")
    return
  }

  agreeLock = true
  post(userAgree.value[item.id] ? "/v1/cancel/comment/agree" : "/v1/set/comment/agree", {
    id: item.id,
    uuid: item.uuid,
    creationId: creationId,
    creationType: creationType,
  }).then(function () {
    userAgree.value[item.id] && (item.agree -= 1)
    userAgree.value[item.id] || (item.agree += 1)
    userAgree.value[item.id] = !userAgree.value[item.id]
  }).catch(function () {
  }).then(function () {
    agreeLock = false
  })
}

function commentRemove(index, item) {
  if (removeLock || !creationId || !creationType) {
    return
  }

  if (!uuid.value) {
    warning("请先登录")
    return
  }

  confirm("评论删除", "确认删除该评论吗？").then(function () {
    removeLock = true
    post("/v1/remove/comment", {
      id: item.id,
    }).then(function () {
      data.value.splice(index, 1);
    }).catch(function () {
      error("评论删除出错")
    }).then(function () {
      removeLock = false
    })
  })
}

defineExpose({
  modeChange
})

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.comment-container {
  width: 100%;
  flex-direction: column;
  grid-gap: unset;

  .each {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .header {
      width: 100%;

      .avatar {
        cursor: pointer;
      }

      .name {
        font-size: 14px;
        color: var(--el-text-color-regular);
      }

      .time {
        font-size: 14px;
        color: var(--el-text-color-disabled);
      }
    }

    .main {
      width: 100%;
      word-break: break-all;

      ::v-deep(div) {
        width: 100%;

        pre[class*="language-"] {
          font-size: 14px;
        }
      }
    }

    .footer {
      width: 100%;

      .icon-block {
        cursor: pointer;

        .icon {
          color: var(--el-text-color-secondary);
          cursor: pointer;
          font-size: 20px;
        }

        .num {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          cursor: pointer;
        }

        .icon-like-clicked {
          color: var(--el-color-primary);
        }
      }
    }

    .footer-card {
      margin-top: unset;
      padding: 12px 0 16px;
      border-top: 1px solid var(--el-border-color-lighter);
    }

    .reply-block {
      margin-top: 20px;
      width: 100%
    }

    .reply-block-card {
      margin-top: unset;
      margin-bottom: 20px;
    }

    .sub-comment-block {
      margin-top: 20px;
      width: 100%;

      .word {
        position: absolute;
        bottom: 28px;
        color: var(--el-text-color-placeholder);
        font-size: 14px;
        cursor: pointer;
        z-index: 1;
      }
    }
  }

  .card {
    background-color: var(--el-color-white);
    padding: 16px 16px 0;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid var(--el-border-color-lighter);
  }

  .skeleton {
    padding: 16px 0;
  }

  .isBottom {
    margin: 50px 0;

    .bottom-divider {
      border-top: 1px solid var(--el-border-color-lighter);
      width: calc((100% - 100px) / 2);
    }

    .word {
      width: 100px;
      text-align: center;
      font-size: 14px;
      color: var(--el-text-color-disabled)
    }
  }
}
</style>