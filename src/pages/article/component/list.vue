<template>
  <el-row class="blog-list" id="blog-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-row class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('article', item.id)">
        <el-row class="blog-card">
          <el-space class="main" fill>
            <el-space class="head">
              <el-popover placement="top-start" :show-arrow="false" :width="312" trigger="hover" popper-class="popover">
                <template #reference>
                  <el-avatar @click="goToPage('user', 1)" class="avatar" :size="24"
                             :src="avatar.baseUrl + item.uuid + '.webp'"/>
                </template>
                <matrix-user-mini-card></matrix-user-mini-card>
              </el-popover>
              <el-row class="title">{{ item.title }}</el-row>
            </el-space>
            <el-space class="info">
              <!--              <el-row class="name">{{ item.name }}</el-row>-->
              <el-row class="time">{{ "发布于 " + item.update }}</el-row>
              <el-tag round v-show="item.tags" type="info"
                      v-for="tag in item.tags.split(';')" :key="tag">{{
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
          </el-space>
        </el-row>
        <el-space class="operation" size="large">
          <div v-for="op in props.operation" :key="op">
            <el-icon v-show="op === 'delete'" class="icon" @click="doDelete(item)">
              <delete/>
            </el-icon>
            <el-icon v-show="op === 'star'" class="iconfont icon-star-fill star" @click="doCollect(item)"></el-icon>
          </div>
        </el-space>
      </el-row>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="3" animated/>
  </el-row>
</template>

<script>
export default {
  name: "MatrixArticleList"
}
</script>

<script setup>
import {ref, watch, onMounted} from "vue";
import {throttle, scrollToBottomListen} from "../../../utils/scroll";
import {goToPage} from "../../../utils/globalFunc";
import {confirm} from "../../../utils/globalFunc";
import {error, info, success} from "../../../utils/message";
import {axiosGetAll, get} from "../../../utils/axios";
import {baseMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

const emits = defineEmits(["current-page"])
const props = defineProps({
  operation: {
    type: Array,
    default: []
  },
})
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)

let data = ref([])
let list = ref([])
let count = ref({})
let introduce = ref({})
let currentPage = 1
let loading = ref(false)
let isBottom = false
let request = 0
let mode = "new"

function init() {
  scrollToBottomListen(throttle(scrollToBottom, 1000))
  getData()
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (isBottom) {
    info("到最底部啦～")
    return
  }

  loading.value = true
  get((mode === "new" ? "/v1/get/article/list?page=" : "/v1/get/article/list/hot?page=") + currentPage).then(function (reply) {
    list.value = reply.data.article
    let size = reply.data.article.length
    if (size === 0) {
      isBottom = true
      info("到最底部啦～")
      loading.value = false
      return
    }
    request = 2
    currentPage += 1
    getStatistic()
    getIntroduce()
  })
}

function getStatistic() {
  let ids = []
  list.value.forEach(function (each) {
    ids.push("ids=" + each["id"])
  })
  get("/v1/get/article/list/statistic?" + ids.join("&")).then(function (reply) {
    reply.data.count.forEach(function (each) {
      // count.value[each.id] = each
      list.value.forEach(function (item, index) {
        each.id === item["id"] && (list.value[index] = Object.assign(item, each))
      })
    })
  }).catch(function () {
  }).then(function () {
    request -= 1
    if (request === 0) {
      data.value = list.value
      loading.value = false
    }
  })
}


function getIntroduce() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(article.value.baseUrl + item["id"] + "/" + item["uuid"] + "-introduce")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each, index) {
      list.value[index] = Object.assign(list.value[index], each.data)
    })
  }, function () {
  }, function () {
    request -= 1
    if (request === 0) {
      data.value = list.value
      loading.value = false
      console.log(data.value)
    }
  })

}

function doDelete(item) {
  confirm("删除", "确定删除" + "：\"" + item.title + "\" 吗？").then(function () {
    success("删除成功")
  }).catch(() => {
  })
}

function doCollect(item) {
  confirm("取消收藏", "确定取消收藏" + "：\"" + item.title + "\" 吗？").then(function () {
    success("取消成功")
  }).catch(() => {
  })
}

function modeChange(m) {
  mode = m
  isBottom = false
  currentPage = 1
  count.value = {}
  introduce.value = {}
  data.value = []
  getData()
}

defineExpose({
  modeChange
})

onMounted(() => {
  init()
})

</script>

<style scoped lang="scss">
.blog-list {
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

      .blog-card {
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
              height: 100%;
              width: 120px;
              border-radius: 6px;
            }

            .content {
              font-size: 14px;
              line-height: 24px;
              color: var(--el-text-color-regular);
              word-break: break-word;
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

      .operation {
        position: absolute;
        top: 16px;
        right: 0;

        .icon {
          color: var(--el-text-color-placeholder);
          font-size: 20px;
          cursor: pointer;
        }

        .star {
          color: #ffa116;
          font-size: 20px;
          cursor: pointer;
        }

        .icon:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .each:last-child {
      border-bottom: unset;
    }
  }

  .skeleton {
    padding: 16px;
  }

  .list-foot {
    margin: 1rem;
    width: 100%;
  }
}
</style>