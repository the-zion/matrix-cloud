<template>
  <el-container class="reply-sub-container">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-row v-for="(item,index) in data" class="each" :key="item.id">
      <el-space class="title-block" @click="goToPage(creation, {id:item['creationId']})">
        <el-tag type="info" effect="light">
          {{ creation === "article" ? "文章" : "讨论" }}
        </el-tag>
        <span>{{ item.title }}</span>
      </el-space>
      <el-row class="origin-block">
        <el-row class="header" justify="space-between" align="middle">
          <el-space>
            <el-avatar @click.stop="goToPage('user', {id:item['uuid'],menu:'timeline'})" class="avatar"
                       :size="32" icon="UserFilled"
                       :src="avatar.baseUrl + item['uuid'] + '/avatar.webp'"/>
            <span class="name">{{ item['userName'] }}</span>
            <span class="name reply" v-show="item['replyName']">{{ "@" + item['replyName'] }}</span>
          </el-space>
          <span class="time">{{ item.update }}</span>
        </el-row>
        <el-row class="main">
          <div v-html="item.html"></div>
        </el-row>
        <el-row class="footer" justify="space-between">
          <el-space>
            <el-space class="icon-block" @click="doReply(item)">
              <el-icon class="icon">
                <EditPen/>
              </el-icon>
              <span class="num">添加回复</span>
            </el-space>
            <el-space class="icon-block" @click="commentRemove(index,item)" v-if="item['uuid'] === uuid || item['rootUser'] === uuid">
              <el-icon class="icon">
                <Delete/>
              </el-icon>
              <span class="num">评论删除</span>
            </el-space>
          </el-space>
        </el-row>
        <el-row class="reply-block" v-if="currentReply === item.id">
          <matrix-reply :rootId="item.rootId" :parentId="item.id" :mode="'sub_comment'"></matrix-reply>
        </el-row>
      </el-row>
      <el-row class="origin-block parent" v-if="item['parentId']">
        <el-row class="header" justify="space-between" align="middle">
          <el-space>
            <el-avatar @click.stop="goToPage('user', {id: item.reply,menu:'timeline'})" class="avatar"
                       :size="32" icon="UserFilled"
                       :src="avatar.baseUrl + item.reply + '/avatar.webp'"/>
            <span class="name">{{ item["replyName"] }}</span>
          </el-space>
          <span class="time">{{ parentComment[item['parentId']].update }}</span>
        </el-row>
        <el-row class="main">
          <div v-html="parentComment[item['parentId']].html"></div>
        </el-row>
      </el-row>
      <el-row class="origin-block root" v-if="!item['parentId']">
        <el-row class="header" justify="space-between" align="middle">
          <el-space>
            <el-avatar @click.stop="goToPage('user', {id:item['rootUser'],menu:'timeline'})" class="avatar"
                       :size="32" icon="UserFilled"
                       :src="avatar.baseUrl + item['rootUser'] + '/avatar.webp'"/>
            <span class="name">{{ item["rootName"] }}</span>
          </el-space>
          <span class="time">{{ rootComment[item['rootId']].update }}</span>
        </el-row>
        <el-row class="main">
          <div v-html="rootComment[item['rootId']].html"></div>
        </el-row>
      </el-row>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-container>
</template>

<script>
export default {
  name: "RepliedSub"
}
</script>

<script setup>

import {onBeforeMount, ref} from "vue";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";
import {axiosGetAll, post} from "../../../utils/axios";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {confirm, getAssets, goToPage} from "../../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import Prism from "prismjs";
import {error, warning} from "../../../utils/message";

const props = defineProps({
  creation: {
    default: "article",
    type: String
  }
})
const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article, talk, comment} = storeToRefs(baseStore)
const {uuid, username} = storeToRefs(userStore)
const noData = getAssets("no_data.svg")

let creation = ref("article")
let data = ref([])
let list = ref([])
let currentReply = ref()
let rootComment = ref({})
let parentComment = ref({})
let loading = ref(false)
let currentPage = 1
let request = null
let removeLock = false
let getDataLock = false
let isBottom = false
let statistic = ref(0)
let baseUrlMap = {
  "article": article.value.baseUrl,
  "talk": talk.value.baseUrl,
}
let urlMap = {
  "article": "/v1/get/user/subcomment/article/replied/list",
  "talk": "/v1/get/user/subcomment/talk/replied/list"
}

function init() {
  initData()
  getData()
}

function initData() {
  creation.value = props.creation
  scrollToBottomListen(throttle(scrollToBottom, 1000))
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
  getDataLock = true
  post(urlMap[creation.value], {page: currentPage}).then(function (reply) {
    list.value = reply.data.list
    let size = reply.data.list.length
    if (size === 0) {
      isBottom = true
      loading.value = false
      getDataLock = false
      return
    }
    currentPage += 1
    request = 4
    getCreationIntroduce()
    getComment()
    getRootComment()
    getParentComment()
  }).catch(function () {
    loading.value = false
    getDataLock = false
  })
}

function getCreationIntroduce() {
  let endpoints = []
  let set = {}
  list.value.forEach(function (item) {
    if (!set[item["creationId"]]) {
      endpoints.push(baseUrlMap[creation.value] + item["creationAuthor"] + "/" + item["creationId"] + "/introduce")
      set[item["creationId"]] = true
    }
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each, index) {
      list.value[index]["title"] = each.data["title"]
    })
  }, function () {
  }, function () {
    request -= 1
    if (request === 0) {
      data.value = data.value.concat(list.value)
      loading.value = false
      getDataLock = false
      setTimeout(function () {
        Prism.highlightAll()
      }, 50)
    }
  })
}

function getComment() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(comment.value.baseUrl + item["uuid"] + "/" + item["id"] + "/content")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each, index) {
      list.value[index] = Object.assign(list.value[index], each.data)
    })
  }, function () {
  }, function () {
    request -= 1
    if (request === 0) {
      data.value = data.value.concat(list.value)
      loading.value = false
      getDataLock = false
      setTimeout(function () {
        Prism.highlightAll()
      }, 50)
    }
  })
}

function getRootComment() {
  let endpoints = []
  let set = {}
  list.value.forEach(function (item) {
    if (!set[item["rootId"]]) {
      endpoints.push(comment.value.baseUrl + item["rootUser"] + "/" + item["rootId"] + "/content")
      set[item["rootId"]] = true
    }
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      rootComment.value[each.data.id] = each.data
    })
  }, function () {
  }, function () {
    request -= 1
    if (request === 0) {
      data.value = data.value.concat(list.value)
      loading.value = false
      getDataLock = false
      setTimeout(function () {
        Prism.highlightAll()
      }, 50)
    }
  })
}

function getParentComment() {
  let endpoints = []
  let set = {}
  list.value.forEach(function (item) {
    if (item["parentId"] !== 0 && !set[item["parentId"]]) {
      endpoints.push(comment.value.baseUrl + item["reply"] + "/" + item["parentId"] + "/content")
      set[item["parentId"]] = true
    }
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      parentComment.value[each.data.id] = each.data
    })
  }, function () {
  }, function () {
    request -= 1
    if (request === 0) {
      data.value = data.value.concat(list.value)
      loading.value = false
      getDataLock = false
      setTimeout(function () {
        Prism.highlightAll()
      }, 50)
    }
  })
}

function doReply(item) {
  if (currentReply.value === item.id) {
    currentReply.value = null
    return
  }
  currentReply.value = item.id
}

function commentRemove(index, item) {
  if (removeLock) {
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
.reply-sub-container {
  width: 100%;
  flex-direction: column;

  .each {
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .title-block {
      width: 100%;
      margin-bottom: 20px;
      cursor: pointer;
    }

    .title-block:hover {
      color: var(--el-color-primary)
    }

    .origin-block {
      width: 100%;
    }

    .root, .parent {
      background-color: #f7f7f7;
      padding: 20px;
    }

    .header {
      width: 100%;

      .avatar{
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

      .reply {
        color: var(--el-color-primary)
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
      padding: 0 0 16px;

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

  .footer {
    width: 100%;
  }

  .skeleton {
    width: unset;
    margin: 16px;
  }
}
</style>