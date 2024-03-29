<template>
  <el-row class="search-list" id="search-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData"
    />
    <el-row class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('article', {id:item.id})">
        <el-row class="article-card">
          <el-space class="main" fill>
            <el-space class="head">
              <el-avatar class="avatar" :size="32" icon="UserFilled"
                         :src="avatar.baseUrl + item.uuid + '/avatar.webp'"/>
              <el-row class="title" v-html="item.title" align="middle"></el-row>
            </el-space>
            <el-space class="info">
              <el-row class="time">{{ "发布于 " + item.update }}</el-row>
              <el-tag round v-show="item.tags" :type="(tags.includes(tag) || [search].includes(tag))?'primary':'info'"
                      :effect="(tags.includes(tag) || [search].includes(tag)) && 'dark'"
                      v-for="tag in (item.tags?item.tags.split(';'):[])" :key="tag">{{
                  tag
                }}
              </el-tag>
            </el-space>
            <el-space class="body" alignment="flex-start">
              <el-image v-if="item.cover" class="image" fit="cover" :src="item.cover"
                        lazy :preview-src-list="[item.cover]" @click.stop="" preview-teleported></el-image>
              <span class="content" v-html="item.text" align="middle"></span>
            </el-space>
          </el-space>
          <el-space class="foot">
            <el-space :size="3">
              <el-icon class="iconfont icon-like icon"></el-icon>
              <span class="num">{{
                  item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree || 0
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-eye icon"></el-icon>
              <span
                  class="num">{{
                  item.view > 1000 ? (item.view / 1000).toFixed(1) + "k" : item.view || 0
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-message icon"></el-icon>
              <span
                  class="num">{{
                  item.comment > 1000 ? (item.comment / 1000).toFixed(1) + "k" : item.comment || 0
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-star icon"></el-icon>
              <span
                  class="num">{{
                  item.collect > 1000 ? (item.collect / 1000).toFixed(1) + "k" : item.collect || 0
                }}</span>
            </el-space>
          </el-space>
        </el-row>
      </el-row>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "ArticleSearchList"
}
</script>

<script setup>
import {onBeforeMount, ref, watch} from "vue"
import {getAssets, goToPage} from "../../../utils/globalFunc";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {get} from "../../../utils/axios";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  search: String,
  time: String,
  tags: {
    type: Array,
    default: [],
  }
})
const noData = getAssets("no_data.svg")

let data = ref([])
let tags = ref([])
let loading = ref(false)
let search = ref("")
let currentPage = 1
let time = "new"
let request = null
let getDataLock = false
let isBottom = false

function init() {
  initData()
  getData()
}

function initData() {
  search.value = props.search
  time = props.time
  tags.value = props.tags
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
  getArticleSearch()
}

function getArticleSearch() {
  get("/v1/get/article/search?page=" + currentPage + "&search=" + search.value + "&time=" + time).then(function (reply) {
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

function searchChange(s, t, selectTags) {
  search.value = s
  time = t
  currentPage = 1
  data.value = []
  tags.value = selectTags
  isBottom = false
  getData()
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
      width: 100%;

      .article-card {
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
            max-height: 80px;

            .image {
              height: 80px;
              width: 120px;
              border-radius: 6px;
            }

            .content {
              text-align: left;
              font-size: 14px;
              line-height: 24px;
              color: var(--el-text-color-regular);
              word-break: break-all;
              align-self: stretch;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            }
          }
        }

        .foot {
          width: 100%;
          margin-top: 1rem;

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
    }
  }
}
</style>