<template>
  <el-row class="search-list" id="search-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
    <el-space class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('user', {id:item.uuid,menu:'timeline'})">
        <el-row class="user-card" align="middle">
          <el-row class="container">
            <el-space class="main" size="large">
              <el-avatar class="avatar" icon="UserFilled" :size="50"
                         :src="avatar.baseUrl + item.uuid + '/avatar.webp'"/>
              <el-space direction="vertical" alignment="flex-start" :size="1">
                <el-row class="nickname" v-html="item.username"></el-row>
                <el-row class="name">{{ item.introduce || '此人很懒，没有任何简介～' }}</el-row>
              </el-space>
            </el-space>
            <el-space class="foot">
              <el-space :size="3">
                <span class="word">被阅读</span>
                <span class="num">{{ item.view > 1000 ? (item.view / 1000).toFixed(1) + "k" : item.view || 0 }}</span>
              </el-space>
              <el-space :size="3">
                <span class="word">被赞同</span>
                <span
                    class="num">{{ item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree || 0 }}</span>
              </el-space>
              <el-space :size="3">
                <span class="word">被关注</span>
                <span class="num">{{
                    item["followed"] > 1000 ? (item["followed"] / 1000).toFixed(1) + "k" : item["followed"] || 0
                  }}</span>
              </el-space>
              <el-space :size="3">
                <span class="word">关注</span>
                <span class="num">{{
                    item["follow"] > 1000 ? (item["follow"] / 1000).toFixed(1) + "k" : item["follow"] || 0
                  }}</span>
              </el-space>
            </el-space>
          </el-row>
        </el-row>
        <el-space class="operation" size="large">
          <el-button :type="follows[item.uuid]?'info':'primary'" :icon="follows[item.uuid]?'':'Plus'"
                     :loading="item['followLoading']"
                     @click.stop="follow(item)" :text="follows[item.uuid]" :bg="follows[item.uuid]">
            {{ follows[item.uuid] ? '取消关注' : '关注' }}
          </el-button>
        </el-space>
      </el-row>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "UserSearchList"
}
</script>

<script setup>
import {onBeforeMount, ref, watch} from "vue"
import {goToPage} from "../../../utils/globalFunc";
import {baseMainStore, userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {get, post} from "../../../utils/axios";
import {scrollTo, scrollToBottomListen, throttle} from "../../../utils/scroll";
import {error, success, warning} from "../../../utils/message";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  search: String,
})

let data = ref([])
let list = ref([])
let loading = ref(false)
let follows = ref({})
let currentPage = 1
let search = ""
let request = null
let getDataLock = false
let isBottom = false

function init() {
  initData()
  getData()
}

function initData() {
  search = props.search
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (isBottom || getDataLock) {
    return
  }
  getDataLock = true
  loading.value = true
  getUserSearch()
  getUserFollows()
}

function getUserFollows() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/user/follows").then(function (reply) {
    follows.value = reply.data["follows"]
  })
}

function getUserSearch() {
  get("/v1/get/user/search?page=" + currentPage + "&search=" + search).then(function (reply) {
    data.value = data.value.concat(reply.data.list)
    let size = reply.data.list.length
    if (size === 0) {
      isBottom = true
      return
    }
    currentPage += 1
  }).catch(function () {
  }).then(function () {
    loading.value = false
    getDataLock = false
  })
}

function searchChange(s) {
  search = s
  currentPage = 1
  data.value = []
  isBottom = false
  getData()
}

function follow(item) {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (item.uuid === uuid.value) {
    warning("不要自己关注自己哦～")
    return
  }

  if (follows.value[item.uuid]) {
    cancelFollow(item)
  } else {
    setFollow(item)
  }
}

function setFollow(item) {
  item['followLoading'] = true
  post("/v1/set/user/follow", {uuid: item.uuid}).then(function () {
    success("已关注")
    follows.value[item.uuid] = true
  }).catch(function () {
    error("关注出错，请稍后再试")
  }).then(function () {
    item['followLoading'] = false
  })
}

function cancelFollow(item) {
  item['followLoading'] = true
  post("/v1/cancel/user/follow", {uuid: item.uuid}).then(function () {
    success("已取消关注")
    follows.value[item.uuid] = false
  }).catch(function () {
    error("取消出错，请稍后再试")
  }).then(function () {
    item['followLoading'] = false
  })
}

defineExpose({
  searchChange
})

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.search-list {
  width: 100%;

  .skeleton {
    padding: 16px;
  }

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

      .user-card {
        width: 100%;
        padding: 16px;

        .container {
          width: calc(100% - 216px);

          .main {
            width: 100%;

            ::v-deep(.el-avatar--circle) {
              border: 1px solid var(--el-border-color-lighter);
            }

            .avatar {
              font-size: 25px;
              border: 1px solid var(--el-border-color-lighter);
            }

            .nickname {
              font-size: 16px;
              color: var(--el-text-color-primary)
            }

            .name {
              font-size: 14px;
              color: var(--el-text-color-secondary)
            }
          }

          .foot {
            width: 100%;
            margin-top: 20px;

            .word {
              font-size: 13px;
              color: var(--el-text-color-secondary)
            }

            .num {
              font-size: 14px;
              color: var(--el-text-color-regular)
            }
          }
        }

        .full {
          width: 100%;
        }
      }

      .operation {
        position: absolute;
        top: 16px;
        right: 14px;
      }
    }
  }
}
</style>