<template>
  <el-container class="sub-comment-container">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-row v-for="(item,index) in data" class="each" :key="item.id">
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
          <span class="name reply" v-show="item['replyName']">{{ "@" + item['replyName'] }}</span>
        </el-space>
        <span class="time">{{ item.update }}</span>
      </el-row>
      <el-row class="main">
        <div v-html="item.html"></div>
      </el-row>
      <el-row class="footer" justify="space-between">
        <el-space>
          <el-space class="icon-block" @click="agreeClick(item)">
            <el-icon class="iconfont icon-like icon"
                     :class="{'icon-like-fill icon-like-clicked':userAgree[item.id]}"></el-icon>
            <span class="num">{{
                item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree || 0
              }}</span>
          </el-space>
          <el-space class="icon-block" @click="doReply(item)">
            <el-icon class="icon">
              <EditPen/>
            </el-icon>
            <span class="num">添加回复</span>
          </el-space>
          <el-space class="icon-block" v-if="item.uuid === uuid || props.rootUser === uuid" @click="commentRemove(index,item)">
            <el-icon class="icon">
              <Delete/>
            </el-icon>
            <span class="num">评论删除</span>
          </el-space>
        </el-space>
      </el-row>
      <el-row class="reply-block" v-if="currentReply === item.id">
        <matrix-reply :rootId="props.rootId" :parentId="item.id" :mode="'sub_comment'"></matrix-reply>
      </el-row>
    </el-row>
    <el-row v-show="!isBottom && data.length" class="load-more">
      <el-button type="primary" link @click="getData()">{{ "点击加载更多" }}</el-button>
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
  name: "SubComment"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {confirm, getAssets, goToPage} from "../../utils/globalFunc";
import {axiosGetAll, get, post} from "../../utils/axios";
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {warning, error} from "../../utils/message";
import Prism from 'prismjs';

const props = defineProps({
  rootId: Number,
  rootUser: String
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
let rootId = null
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
  rootId = props.rootId
}

function doReply(item) {
  if (currentReply.value === item.id) {
    currentReply.value = null
    return
  }
  currentReply.value = item.id
}

function getData() {
  if (isBottom.value || !rootId || getDataLock) {
    return
  }

  loading.value = true
  getDataLock = true
  get("/v1/get/subcomment/list?page=" + currentPage + "&id=" + rootId).then(function (reply) {
    list.value = reply.data.comment
    let size = reply.data.comment.length
    if (size === 0) {
      isBottom.value = true
      loading.value = false
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

function agreeClick(item) {
  if (agreeLock) {
    return
  }

  if (!uuid.value) {
    warning("请先登录")
    return
  }

  agreeLock = true
  post(userAgree.value[item.id] ? "/v1/cancel/subcomment/agree" : "/v1/set/subcomment/agree", {
    id: item.id,
    uuid: item.uuid,
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
  if (removeLock || !rootId) {
    return
  }

  if (!uuid.value) {
    warning("请先登录")
    return
  }

  confirm("评论删除", "确认删除该评论吗？").then(function () {
    removeLock = true
    post("/v1/remove/subcomment", {
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

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.sub-comment-container {
  width: 100%;
  flex-direction: column;

  .each {
    width: 100%;
    padding: 8px 16px 0;
    margin-bottom: 12px;
    border-radius: 8px;
    background-color: #f7f7f7;

    .header {
      width: 100%;

      .name {
        font-size: 14px;
        color: var(--el-text-color-regular);
      }

      .time {
        font-size: 14px;
        color: var(--el-text-color-disabled);
      }

      .reply {
        color: var(--el-color-primary)
      }
    }

    .main {
      width: 100%;
      word-break: break-word;

      ::v-deep(div) {
        width: 100%;
        pre[class*="language-"]{
          font-size: 14px;
        }
      }
    }

    .footer {
      width: 100%;
      padding: 12px 0 16px;
      border-top: 1px solid var(--el-border-color-lighter);

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

    .reply-block {
      margin-bottom: 20px;
      width: 100%
    }
  }

  .load-more {
    padding: 10px 0;
  }

  .isBottom {
    margin: 20px 0;

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

  .footer {
    width: 100%;
  }

  .skeleton {
    padding: 16px 0;
  }
}
</style>