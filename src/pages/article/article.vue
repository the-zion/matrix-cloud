<template>
  <el-container class="article-container" v-loading="loading">
    <el-backtop></el-backtop>
    <collections-choose v-model:visible="collectionsVisible" v-model:judge="statisticJudge" :id="articleId"
                        :uuid="authorUuid"
                        @collected="collected"></collections-choose>
    <el-row class="main" v-show="!loading">
      <el-image fit="cover" class="cover" :src="data.cover"></el-image>
      <el-row class="header">
        <el-row class="title-area" justify="space-between">
          <el-row class="title" align="top">
            <el-avatar :size="32" icon="UserFilled" :src="avatar.baseUrl + authorUuid + '/avatar.webp'"></el-avatar>
            <el-row class="label" align="middle">{{ data.title }}</el-row>
          </el-row>
          <el-button type="primary" icon="Plus">关注TA</el-button>
        </el-row>
        <el-row class="info" align="middle">
          <span class="name">{{ data.username }}</span>
          <el-space>
            <span class="word">{{ data.update }}</span>
            <span class="point"></span>
            <span class="word">{{
                (statistic.view > 1000 ? (statistic.view / 1000).toFixed(1) + "k" : statistic.view) + "阅读"
              }}</span>
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
              <div ref="iconAgree" @click="agreeClick" :class="{'agree-select':statisticClicked['agree']}"
                   class="icon agree-transform">
                <svg class="symbol-icon" aria-hidden="true" v-show="!statisticClicked['agree']">
                  <use :xlink:href="'#icon-like'"></use>
                </svg>
                <svg class="symbol-icon" aria-hidden="true" v-show="statisticClicked['agree']">
                  <use :xlink:href="'#icon-like-fill'"></use>
                </svg>
              </div>
              <span class="num">{{
                  statistic.agree > 1000 ? (statistic.agree / 1000).toFixed(1) + "k" : statistic.agree
                }}</span>
            </el-space>
            <el-space :size="5" class="icon-block">
              <div ref="iconCollect" @click="collectClick" :class="{'collect-select':statisticClicked['collect']}"
                   class="icon collect-transform">
                <svg class="symbol-icon" aria-hidden="true" v-show="!statisticClicked['collect']">
                  <use :xlink:href="'#icon-star'"></use>
                </svg>
                <svg class="symbol-icon" aria-hidden="true" v-show="statisticClicked['collect']">
                  <use :xlink:href="'#icon-star-fill'"></use>
                </svg>
              </div>
              <span class="num">{{ statisticClicked['collect'] ? '已收藏' : '收藏' }}</span>
            </el-space>
          </el-space>
          <el-button icon="EditPen" type="primary" v-show="visible" @click="comment">评论</el-button>
        </el-row>
      </el-affix>
      <el-space class="tags-block" wrap>
        <span class="label">相关标签</span>
        <el-tag type="info" v-if="data.tags" v-for="item in data.tags.split(';')" round>{{ item }}</el-tag>
      </el-space>
      <el-row class="reply-block" id="reply-block">
        <el-row class="reply-header" justify="space-between">
          <el-space>
            <span class="num">{{ count }}</span>
            <span class="word">条评论</span>
          </el-space>
          <el-select class="select" v-model="select">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-row>
        <matrix-reply></matrix-reply>
      </el-row>
      <el-row class="comment-block">
        <matrix-comment></matrix-comment>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onBeforeUnmount, shallowRef, onMounted} from "vue";
import {Editor} from '@wangeditor/editor-for-vue'
import {scrollTo} from "../../utils/scroll";
import {useRoute} from "vue-router";
import router from "../../router";
import {get, post} from "../../utils/axios";
import {baseMainStore, userMainStore} from "../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {warning} from "../../utils/message";
import {animationAgree, animationCollect} from "../../utils/animation";
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
})
let articleId = ref()
let iconAgree = ref(null)
let iconCollect = ref(null)
let loading = ref(false)
let visible = ref(false)
let collectionsVisible = ref(false)
let agreeBounce = ref(1);
let collectBounce = ref(1);
let count = ref(153)
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
let statisticJudge = ref({
  agree: false,
  collect: false
})
let statisticClicked = ref({
  agree: false,
  collect: false
})

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
  background()
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
  get("/v1/get/article/statistic?id=" + articleId.value).then(function (reply) {
    authorUuid.value = reply.data.uuid
    statistic.value = reply.data
    setView()
    getUserInfo()
  }).catch(function () {
    articleNotExist()
  })
}

function getUserInfo() {
  get("/v1/get/user/info?uuid=" + authorUuid.value).then(function (reply) {
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
    getStatisticJudge()
  }).then(function () {
    loading.value = false
  })
}

function getStatisticJudge() {
  if (!articleId.value || !uuid.value) {
    return
  }
  post("/v1/article/statistic/judge", {
    id: articleId.value
  }).then(function (reply) {
    statisticJudge.value = reply.data
    statisticClicked.value = reply.data
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
  if (!statisticJudge.value["agree"]) {
    agreeAdd()
  } else {
    agreeCancel()
  }
}

function agreeAdd() {
  agreeAnimation.play()
  statisticClicked.value["agree"] = true
  statistic.value["agree"] += 1
  post("/v1/set/article/agree", {
    id: articleId.value,
    uuid: authorUuid.value,
  }).then(function () {
    statisticJudge.value["agree"] = true
  }).catch(function () {
    statisticClicked.value["agree"] = false
    statistic.value["agree"] -= 1
  }).then(function () {
    clickLock = false
  })
}

function agreeCancel() {
  agreeAnimation.play()
  statisticClicked.value["agree"] = false
  statistic.value["agree"] -= 1
  post("/v1/cancel/article/agree", {
    id: articleId.value,
    uuid: authorUuid.value,
  }).then(function () {
    statisticJudge.value["agree"] = false
  }).catch(function () {
    statisticClicked.value["agree"] = true
    statistic.value["agree"] += 1
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

  if (!statisticJudge.value['collect']) {
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
  collectAnimation.play()
  statisticClicked.value["collect"] = false
  statistic.value["collect"] -= 1
  post("/v1/cancel/article/collect", {
    id: articleId.value,
    uuid: authorUuid.value,
  }).then(function () {
    collectAnimation.play()
  }).catch(function () {
    statisticClicked.value["collect"] = true
    statistic.value["collect"] += 1
  }).then(function () {
    clickLock = false
  })
}

function collected() {
  collectAnimation.play()
  statisticClicked.value["collect"] = true
  statistic.value["collect"] += 1
}

function handleCreated(editor) {
  editorRef.value = editor
}

function affixChange(value) {
  visible.value = value
}

function comment() {
  scrollTo("reply-block")
}


onMounted(function () {
  init()
})

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
      padding: 0px 20px
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
            margin-right: 15px;
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
    }
  }
}
</style>