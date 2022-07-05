<template>
  <el-row class="blog-list" id="blog-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-row class="data" fill :size="props.gap || 0">
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
              <el-row class="title">{{ introduce[item.id].title }}</el-row>
            </el-space>
            <el-space class="info">
              <!--              <el-row class="name">{{ item.name }}</el-row>-->
              <el-row class="time">{{ "发布于 " + introduce[item.id].update }}</el-row>
              <el-tag round v-show="introduce[item.id].tags" type="info"
                      v-for="tag in introduce[item.id].tags.split(';')" :key="tag">{{
                  tag
                }}
              </el-tag>
            </el-space>
            <el-space class="body" alignment="flex-start">
              <el-image v-if="introduce[item.id].cover" class="image" fit="cover" :src="introduce[item.id].cover"
                        lazy></el-image>
              <span class="content">{{ introduce[item.id].text }}</span>
            </el-space>
          </el-space>
          <el-space class="foot">
            <el-space :size="3">
              <el-icon class="iconfont icon-like icon"></el-icon>
              <span class="num">{{
                  count[item.id].agree > 1000 ? (count[item.id].agree / 1000).toFixed(1) + "k" : count[item.id].agree
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-eye icon"></el-icon>
              <span
                  class="num">{{
                  count[item.id].view > 1000 ? (count[item.id].view / 1000).toFixed(1) + "k" : count[item.id].view
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-message icon"></el-icon>
              <span
                  class="num">{{
                  count[item.id].comment > 1000 ? (count[item.id].comment / 1000).toFixed(1) + "k" : count[item.id].comment
                }}</span>
            </el-space>
            <el-space :size="3">
              <el-icon class="iconfont icon-star icon"></el-icon>
              <span
                  class="num">{{
                  count[item.id].collect > 1000 ? (count[item.id].collect / 1000).toFixed(1) + "k" : count[item.id].collect
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
import {get} from "../../../utils/axios";
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
let count = ref({})
let introduce = ref({})
let currentPage = ref(1)
let loading = ref(false)
let isBottom = false
let request = 0


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
  get("/v1/get/article/list?page=" + currentPage.value).then(function (reply) {
    let list = reply.data.article
    let size = list.length
    if (size === 0) {
      isBottom = true
      info("到最底部啦～")
      loading.value = false
      return
    }
    request = size + 1
    currentPage.value += 1
    getStatistic(list)
    getIntroduce(list)
  })
}

function getStatistic(list) {
  let ids = []
  list.forEach(function (each) {
    ids.push("ids=" + each.id)
  })
  get("/v1/get/article/list/statistic?" + ids.join("&")).then(function (reply) {
    reply.data.count.forEach(function (each) {
      count.value[each.id] = each
    })
    request -= 1
  }).catch(function () {
    request -= 1
  }).then(function () {
    if (request === 0) {
      data.value = data.value.concat(list)
      loading.value = false
    }
  })
}


function getIntroduce(list) {
  let request = list.length
  list.forEach(function (item) {
    let url = article.value.baseUrl + item.id + "/" + item.uuid + "-introduce"
    get(url).then(function (reply) {
      introduce.value[item.id] = reply.data
      request -= 1
    }).catch(function () {
      request -= 1
    }).then(function () {
      if (request === 0) {
        data.value = data.value.concat(list)
        loading.value = false
      }
    })
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

defineExpose({
  getData
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