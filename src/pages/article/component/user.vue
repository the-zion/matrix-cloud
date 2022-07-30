<template>
  <el-row class="user-list" id="user-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
    <el-row class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('article', {id:item.id})">
        <el-row class="article-card">
          <el-space class="main" fill>
            <el-space class="head">
              <el-avatar class="avatar" :size="24" icon="UserFilled"
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
          </el-space>
        </el-row>
        <el-space class="operation" v-if="userId === uuid" :style="{'display':item['opShow'] || 'none'}">
          <el-space :size="3" @click.stop="articleEdit(item)" class="op">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span class="word">编辑</span>
          </el-space>
          <el-popconfirm title="文章删除确认"
                         confirm-button-text="确定"
                         cancel-button-text="取消"
                         @confirm="articleDelete(item)"
                         @cancel="opCancel(item)"
          >
            <template #reference>
              <el-space :size="3" @click.stop="item['opShow'] = 'inline-flex'" class="op">
                <el-icon>
                  <Delete/>
                </el-icon>
                <span class="word">删除</span>
              </el-space>
            </template>
          </el-popconfirm>
        </el-space>
      </el-row>
    </el-row>
    <el-row class="foot" justify="center" v-if="data.length !== 0 || currentPage > 1">
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next"
          :total="pageTotal"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "ArticleUserList"
}
</script>

<script setup>
import {onMounted, ref, watch} from "vue"
import {goToPage} from "../../../utils/globalFunc";
import {baseMainStore, userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {axiosGetAll, get, post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";
import {useRoute} from "vue-router";
import {scrollTo} from "../../../utils/scroll";
import router from "../../../router";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)

let data = ref([])
let list = ref([])
let loading = ref(false)
let currentPage = ref(1)
let pageTotal = ref(1)
let userId = ref()
let request = null

function init() {
  initData()
  getData()
  getDataCount()
}

function initData() {
  userId.value = useRoute().query["id"]
}

function getData() {
  if (!userId.value) {
    return
  }
  data.value = []
  list.value = []
  loading.value = true
  if (userId.value === uuid.value) {
    getUserArticle()
  } else {
    getUserArticleVisitor()
  }
}

function getDataCount() {
  if (!userId.value) {
    return
  }
  if (userId.value === uuid.value) {
    getUserArticleCount()
  } else {
    getUserArticleVisitorCount()
  }
}

function getUserArticle() {
  post("/v1/get/user/article/list", {page: currentPage.value}).then(function (reply) {
    list.value = reply.data.article
    request = 2
    getStatistic()
    getIntroduce()
  })
}

function getUserArticleCount() {
  post("/v1/get/article/count", {}).then(function (reply) {
    pageTotal.value = reply.data.count
  })
}

function getStatistic() {
  let ids = []
  list.value.forEach(function (each) {
    ids.push("ids=" + each["id"])
  })
  get("/v1/get/article/list/statistic?" + ids.join("&")).then(function (reply) {
    reply.data.count.forEach(function (each) {
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
    request -= 1
    if (request === 0) {
      data.value = list.value
      loading.value = false
    }
  })
}

function getUserArticleVisitorCount() {
  get("/v1/get/article/count/visitor?uuid=" + userId.value).then(function (reply) {
    pageTotal.value = reply.data.count
  })
}

function getUserArticleVisitor() {
  get("/v1/get/user/article/list/visitor?page=" + currentPage.value + "&uuid=" + userId.value).then(function (reply) {
    list.value = reply.data.article
    request = 2
    getStatistic()
    getIntroduce()
  })
}

function articleEdit(item) {
  const {href} = router.resolve({name: "article.write", query: {mode: 'edit', id: item.id}});
  window.open(href, "_blank");
}

function articleDelete(item) {
  post("/v1/delete/article", {
    id: item.id,
  }).then(function () {
    success("删除成功")
    getData()
  }).catch(function () {
    error("删除失败")
  })
}

function opCancel(item) {
  setTimeout(function () {
    item['opShow'] = 'none'
  }, 400)
}

watch(currentPage, () => {
  scrollTo("user-list")
  getData()
})

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.user-list {
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
        display: none;
        top: 16px;
        right: 0;
        color: var(--el-text-color-placeholder);
        cursor: pointer;

        .op {
          .icon {
            font-size: 20px;
          }

          .word {
            font-size: 14px;
          }
        }

        .op:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .each:hover {
      .operation {
        display: inline-flex !important;
      }
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>