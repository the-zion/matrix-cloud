<template>
  <el-container class="article-container" v-loading="loading">
    <el-backtop></el-backtop>
    <collections-choose v-model:visible="collectionsVisible" :id="articleId"
                        :uuid="authorUuid" :mode="'article'"
                        @collected="collected"></collections-choose>
    <el-row class="main" v-show="!loading">
      <el-image v-if="data.cover" fit="cover" class="cover" :src="data.cover"></el-image>
      <el-row class="header">
        <el-row class="title-area" justify="space-between">
          <el-row class="title" align="top">
            <el-avatar class="avatar" :size="32" icon="UserFilled" :src="avatar.baseUrl + authorUuid + '/avatar.webp'"
                       @click="goToPage('user', {id:authorUuid,menu:'article'})"></el-avatar>
            <el-row class="label" align="middle">{{ data.title }}</el-row>
          </el-row>
        </el-row>
        <el-row class="info" align="middle">
          <span class="name">{{ user.username }}</span>
          <el-space>
            <span class="word">{{ data.update }}</span>
            <span class="point"></span>
            <span class="word">{{
                (statistic.view > 1000 ? (statistic.view / 1000).toFixed(1) + "k" : statistic.view) + "阅读"
              }}</span>
            <span class="point"></span>
            <span class="word" @click="reproduce(data.source, data.url)"
                  :class="{'reproduce':data.source === 2}">{{ data.source === 1 ? "原创" : "转载" }}</span>
          </el-space>
        </el-row>
      </el-row>
      <Editor
          class="editor"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
      <el-affix position="bottom" @change="affixChange" :offset="5">
        <el-row class="footer" justify="space-between">
          <el-space>
            <el-space :size="5" class="icon-block">
              <div ref="iconAgree" @click="agreeClick" :class="{'agree-select':userArticleAgree[articleId]}"
                   class="icon agree-transform">
                <svg class="symbol-icon" aria-hidden="true" v-show="!userArticleAgree[articleId]">
                  <use :xlink:href="'#icon-like'"></use>
                </svg>
                <svg class="symbol-icon" aria-hidden="true" v-show="userArticleAgree[articleId]">
                  <use :xlink:href="'#icon-like-fill'"></use>
                </svg>
              </div>
              <span class="num">{{
                  statistic.agree > 1000 ? (statistic.agree / 1000).toFixed(1) + "k" : statistic.agree || 0
                }}</span>
            </el-space>
            <el-space :size="5" class="icon-block">
              <div ref="iconCollect" @click="collectClick" :class="{'collect-select':userArticleCollect[articleId]}"
                   class="icon collect-transform">
                <svg class="symbol-icon" aria-hidden="true" v-show="!userArticleCollect[articleId]">
                  <use :xlink:href="'#icon-star'"></use>
                </svg>
                <svg class="symbol-icon" aria-hidden="true" v-show="userArticleCollect[articleId]">
                  <use :xlink:href="'#icon-star-fill'"></use>
                </svg>
              </div>
              <span class="num">{{ userArticleCollect[articleId] ? '已收藏' : '收藏' }}</span>
            </el-space>
          </el-space>
          <el-button icon="EditPen" type="primary" v-show="visible" @click="commentClick">评论</el-button>
        </el-row>
      </el-affix>
      <el-space class="tags-block" wrap>
        <span class="label">相关标签</span>
        <el-tag type="info" v-if="data.tags" v-for="item in data.tags.split(';')" round>{{ item }}</el-tag>
      </el-space>
      <el-row class="reply-block" id="reply-block" v-if="data['auth'] !== 2">
        <el-row class="reply-header" justify="space-between">
          <el-space>
            <span class="num">{{
                statistic.comment > 1000 ? (statistic.comment / 1000).toFixed(1) + "k" : statistic.comment || 0
              }}</span>
            <span class="word">条评论</span>
          </el-space>
          <el-select class="select" v-model="select" @change="selectChange">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-row>
        <matrix-reply :creationId="articleId" :creationType="1"></matrix-reply>
      </el-row>
      <el-row class="comment-block" v-if="data['auth'] !== 2">
        <matrix-comment :creationId="articleId" :creationType="1" ref="commentRef"></matrix-comment>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {removeScrollToBottomListen, scrollTo} from "../../utils/scroll";
import {onBeforeRouteLeave, useRoute} from "vue-router";
import {goToPage} from "../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {warning} from "../../utils/message";
import {get, post} from "../../utils/axios";
import {animationAgree, animationCollect} from "../../utils/animation";
import {ref, onBeforeUnmount, shallowRef, onBeforeMount, onMounted} from "vue";
import {Editor} from '@wangeditor/editor-for-vue'
import {baseMainStore, userMainStore} from "../../store";
import router from "../../router";
import CollectionsChoose from "../collect/component/choose.vue";

let e = null
let agreeAnimation = null
let collectAnimation = null
let clickLock = false
let authorUuid = ref()
let user = ref({})
let data = ref({
  "title": "暂无数据",
  "username": "暂无数据",
  "update": "0000-00-00"
})
let statistic = ref({
  "agree": 0,
  "view": 0,
  "comment": 0
})
let articleId = ref()
let commentRef = ref()
let iconAgree = ref(null)
let iconCollect = ref(null)
let loading = ref(false)
let visible = ref(false)
let collectionsVisible = ref(false)
let agreeBounce = ref(1);
let collectBounce = ref(1);
let comment = ref(0)
let select = ref("hot")
let options = ref([
  {
    label: "最热",
    value: "hot"
  },
  {
    label: "最新",
    value: "new"
  }
])
let userArticleAgree = ref({})
let userArticleCollect = ref({})

const editorRef = shallowRef()
const mode = ref('default')
const editorConfig = {
  scroll: false,
  readOnly: true
}
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar, article} = storeToRefs(baseStore)

function init() {
  animation()
  initData()
  getData()
}

function initData() {
  let i = useRoute()
  articleId.value = i.query["id"]
  if (!articleId.value) {
    articleNotExist()
  }
}

function getData() {
  getStatistic()
}

function getStatistic() {
  loading.value = true
  get("/v1/get/article/statistic?id=" + articleId.value + "&uuid=" + (uuid.value || "")).then(function (reply) {
    authorUuid.value = reply.data.uuid
    statistic.value = reply.data
    setView()
    getUserInfo()
  }).catch(function () {
    articleNotExist()
  })
}

function getUserInfo() {
  get("/v1/get/user/info/visitor?uuid=" + authorUuid.value).then(function (reply) {
    user.value = reply.data
    getArticle()
  }).catch(function () {
    articleNotExist()
  })
}

function getArticle() {
  let url = article.value.baseUrl + authorUuid.value + "/" + articleId.value + "/content"
  get(url).then(function (reply) {
    data.value = reply.data
    editorRef.value.setHtml(data.value["html"])
    getUserArticleAgree()
    getUserArticleCollect()
  }).catch(function () {
    articleNotExist()
  }).then(function () {
    loading.value = false
  })
}

function getUserArticleAgree() {
  if (!articleId.value || !uuid.value) {
    return
  }
  get("/v1/get/user/article/agree").then(function (reply) {
    userArticleAgree.value = reply.data.agree
  })
}

function getUserArticleCollect() {
  if (!articleId.value || !uuid.value) {
    return
  }
  get("/v1/get/user/article/collect").then(function (reply) {
    userArticleCollect.value = reply.data.collect
  })
}

function setView() {
  post("/v1/set/article/view", {
    id: articleId.value,
    uuid: authorUuid.value
  })
}

function articleNotExist() {
  router.push({name: "result", query: {type: "error", title: '获取文章失败', description: "文章不存在或已被删除"}})
}

function background() {
  e = document.getElementsByClassName("main-body")[0]
  e.style["background-color"] = "var(--el-color-white)"
}

function animation() {
  agreeAnimation = animationAgree(iconAgree, agreeBounce)
  collectAnimation = animationCollect(iconCollect, collectBounce)
}

function agreeClick() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
  }

  if (!articleId.value || !authorUuid.value || clickLock) {
    return
  }

  clickLock = true
  if (!userArticleAgree.value[articleId.value]) {
    agreeAdd()
  } else {
    agreeCancel()
  }
}

function agreeAdd() {
  post("/v1/set/article/agree", {
    id: articleId.value,
    uuid: authorUuid.value,
  }).then(function () {
    agreeAnimation.play()
    userArticleAgree.value[articleId.value] = true
    statistic.value["agree"] += 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function agreeCancel() {
  post("/v1/cancel/article/agree", {
    id: articleId.value,
    uuid: authorUuid.value,
  }).then(function () {
    agreeAnimation.play()
    userArticleAgree.value[articleId.value] = false
    statistic.value["agree"] -= 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function collectClick() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
  }

  if (!articleId.value || !authorUuid.value) {
    return
  }

  if (!userArticleCollect.value[articleId.value]) {
    collectAdd()
  } else {
    collectCancel()
  }
}

function collectAdd() {
  collectionsVisible.value = true
}

function collectCancel() {
  clickLock = true
  post("/v1/cancel/article/collect", {
    id: articleId.value,
    uuid: authorUuid.value,
  }).then(function () {
    collectAnimation.play()
    userArticleCollect.value[articleId.value] = false
    statistic.value["collect"] -= 1
  }).then(function () {
    clickLock = false
  })
}

function collected() {
  collectAnimation.play()
  userArticleCollect.value[articleId.value] = true
  statistic.value["collect"] += 1
}

function handleCreated(editor) {
  editorRef.value = editor
}

function affixChange(value) {
  visible.value = value
}

function commentClick() {
  scrollTo("reply-block")
}

function reproduce(source, url) {
  if (!source || source === 1 || !url) {
    return
  }
  window.open(url);
}

function selectChange(value) {
  commentRef.value.modeChange(value)
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onBeforeMount(function () {
  init()
})

onMounted(background)

onBeforeUnmount(function () {
  e.style["background-color"] = "unset"
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped lang="scss">

.article-container {
  width: 720px;
  margin: auto;
  flex-direction: column;
  min-height: 500px;

  ::v-deep(.collections-choose) {
    border-radius: 4px;
    margin-top: 10vh;

    .el-dialog__body {
      padding: 0 20px
    }
  }

  .main {
    width: 100%;
    flex-direction: column;

    .cover {
      margin-top: 35px;
      height: 200px;
      width: calc(100% - 20px);
      padding: 0 10px;
    }

    .header {
      width: 100%;
      margin-top: 25px;
      padding: 0 10px;

      .title-area {
        width: 100%;

        .title {
          width: calc(100% - 120px);

          .avatar {
            cursor: pointer;
            margin-right: 10px;
          }

          .label {
            width: calc(100% - 47px);
            font-size: 18px;
            line-height: 24px;
            color: var(--el-text-color-primary);
            font-weight: 500;
          }
        }
      }

      .info {
        width: 100%;
        height: 32px;

        .name {
          color: var(--el-text-color-secondary);
          font-size: 14px;
          margin-right: 10px;
        }

        .word {
          font-size: 12px;
          color: var(--el-text-color-disabled)
        }

        .reproduce {
          cursor: pointer;
          color: var(--el-color-primary)
        }

        .point {
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background: rgba(229, 229, 229, 1);
        }
      }
    }

    .editor {
      min-height: 676px;
    }

    .footer {
      width: 100%;
      padding: 11px 0;
      border-top: 1px solid var(--el-border-color);
      background-color: var(--el-color-white);

      .icon-block {
        cursor: pointer;

        .agree-select {
          color: var(--el-color-primary) !important;
        }

        .collect-select {
          color: #ffa500 !important;
        }

        .icon {
          display: inline-flex;
          position: relative;
          height: 20px;
          font-size: 20px;
          color: var(--el-text-color-placeholder);
        }

        .agree-transform {
          transform: scale3d(v-bind(agreeBounce), v-bind(agreeBounce), 1);
        }

        .collect-transform {
          transform: scale3d(v-bind(collectBounce), v-bind(collectBounce), 1)
        }

        .num {
          color: var(--el-text-color-secondary);
        }
      }
    }

    .tags-block {
      width: 100%;
      margin-top: 20px;

      .label {
        font-size: 13px;
        margin-right: 5px;
        color: var(--el-text-color-disabled);
      }
    }

    .reply-block {
      width: 100%;
      margin-top: 30px;

      .reply-header {
        width: 100%;
        margin-bottom: 5px;

        .num {
          font-size: 20px;
        }

        .word {
          color: var(--el-text-color-regular);
          font-size: 13px;
        }

        .select {
          width: 75px;

          ::v-deep(.el-input__wrapper) {
            box-shadow: unset !important;
          }
        }
      }
    }

    .comment-block {
      width: 100%;
      margin-top: 30px;
      margin-bottom: 200px;
    }
  }
}
</style>