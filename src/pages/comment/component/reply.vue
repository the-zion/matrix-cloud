<template>
  <el-container class="reply-container" id="reply-container">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-row v-for="(item,index) in data" class="each" :key="item.id">
      <el-row class="header" justify="space-between" align="middle">
        <el-space class="title" @click="goToPage(creation, {id:item['creationId']})">
          <el-tag type="info" effect="light">
            {{ creation === "article" ? "文章" : "讨论" }}
          </el-tag>
          <span>{{ item.title }}</span>
        </el-space>
        <el-space>
          <el-avatar @click.stop="goToPage('user', {id:uuid,menu:'timeline'})" class="avatar"
                     :size="32" icon="UserFilled"
                     :src="avatar.baseUrl + uuid + '/avatar.webp'"/>
          <span class="name">{{ username }}</span>
        </el-space>
        <span class="time">{{ item.update }}</span>
      </el-row>
      <el-row class="main">
        <div v-html="item.html"></div>
      </el-row>
      <el-row class="footer" justify="space-between" :class="'footer-' + props.shape">
        <el-space>
          <el-space class="icon-block" @click="commentRemove(index,item)">
            <el-icon class="icon">
              <Delete/>
            </el-icon>
            <span class="num">评论删除</span>
          </el-space>
        </el-space>
      </el-row>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-container>
</template>

<script>
export default {
  name: "Reply"
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
import Prism from 'prismjs';
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
let loading = ref(false)
let currentPage = 1
let request = null
let getDataLock = false
let isBottom = false
let removeLock = false
let statistic = ref(0)
let baseUrlMap = {
  "article": article.value.baseUrl,
  "talk": talk.value.baseUrl,
}
let urlMap = {
  "article": "/v1/get/user/comment/article/reply/list",
  "talk": "/v1/get/user/comment/talk/reply/list"
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
    request = 2
    getCreationIntroduce()
    getComment()
  }).catch(function () {
    loading.value = false
    getDataLock = false
  })
}

function getCreationIntroduce() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(baseUrlMap[creation.value] + item["creationAuthor"] + "/" + item["creationId"] + "/introduce")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.data.id === item["creationId"] && (list.value[index]["title"] = each.data["title"])
      })
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
    endpoints.push(comment.value.baseUrl + uuid.value + "/" + item["id"] + "/content")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.data.id === item["id"] && (list.value[index] = Object.assign(item, each.data))
      })
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

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.reply-container {
  width: 100%;
  flex-direction: column;
  grid-gap: unset;

  .each {
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .header {
      width: 100%;

      .avatar {
        cursor: pointer;
      }

      .title {
        width: 100%;
        margin-bottom: 20px;
        cursor: pointer;
      }

      .title:hover {
        color: var(--el-color-primary)
      }

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
      word-break: break-word;

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
    width: unset;
    margin: 16px;
  }

  .isBottom {
    margin: 50px 0;

    .word {
      width: 100px;
      text-align: center;
      font-size: 14px;
      color: var(--el-text-color-disabled)
    }
  }
}
</style>