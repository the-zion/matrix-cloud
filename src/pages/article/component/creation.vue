<template>
  <el-row class="creation-list" id="creation-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" :class="{'simple-empty': mode === 'simple'}"
              description=" "
              :image-size="250" :image="noData"
    />
    <el-row class="data">
      <el-row v-for="(item,index) in data" class="each" :class="{'simple-each': mode === 'simple'}" :key="item.id"
              @click="goToPage('article', {id:item.id})">
        <el-row class="article-card">
          <el-space class="main" fill>
            <el-space class="head">
              <el-avatar class="avatar" :size="32" icon="UserFilled"
                         :src="avatar.baseUrl + item.uuid + '/avatar.webp'"/>
              <el-row class="title">{{ item.title }}</el-row>
            </el-space>
            <el-space class="info">
              <el-row class="time">{{ "发布于 " + item.update }}</el-row>
              <el-tag round v-show="item.tags" type="info"
                      v-for="tag in (item.tags?item.tags.split(';'):[])" :key="tag">{{
                  tag
                }}
              </el-tag>
            </el-space>
            <el-space class="body" alignment="flex-start">
              <el-image v-if="item.cover" class="image" fit="cover" :src="item.cover"
                        lazy></el-image>
              <span class="content">{{ item.text }}</span>
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
            <el-space :size="3" @click.stop="articleEdit(item)" v-if="mode !== 'simple'">
              <el-icon class="icon">
                <EditPen/>
              </el-icon>
              <span class="word">编辑</span>
            </el-space>
            <el-space :size="3" @click.stop="articleDeleteConfirm(item,index)" v-if="mode !== 'simple'">
              <el-icon class="icon">
                <Delete/>
              </el-icon>
              <span class="word">删除</span>
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
  name: "ArticleCreationList"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {getAssets, goToPage} from "../../../utils/globalFunc";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {axiosGetAll, post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";
import router from "../../../router";
import {confirm} from "../../../utils/globalFunc";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  mode: {
    type: String,
    default: ""
  },
})
const emits = defineEmits(["row-delete"])
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let loading = ref(false)
let currentPage = 1
let request = null
let getDataLock = false
let isBottom = false
let mode = ref("")
let statistic = ref(0)

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
  getDataLock = true
  post(mode.value === 'simple' ? "/v1/get/user/article/list/simple" : "/v1/get/user/article/list", {page: currentPage}).then(function (reply) {
    list.value = reply.data.article
    let size = reply.data.article.length
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
    endpoints.push(article.value.baseUrl + item["uuid"] + "/" + item["id"] + "/introduce")
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

function articleEdit(item) {
  const {href} = router.resolve({name: "article.write", query: {mode: 'edit', id: item.id}});
  window.open(href, "_blank");
}

function articleDeleteConfirm(item, index) {
  confirm("文章删除", "确认删除该文章吗").then(function () {
    articleDelete(item, index)
  })
}

function articleDelete(item, index) {
  post("/v1/delete/article", {
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

  .skeleton {
    padding: 16px;
  }

  .data {
    width: 100%;

    .each:last-child {
      border-bottom: unset;
    }

    .simple-each {
      .article-card {
        padding: 16px 0 !important;
      }
    }

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

          .num, .word {
            font-size: 14px;
            color: var(--el-text-color-secondary)
          }
        }
      }
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }

  .skeleton {
    padding: 16px;
  }
}
</style>