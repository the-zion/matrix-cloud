<template>
  <el-container class="article-container" v-loading="loading">
    <el-backtop></el-backtop>
    <el-row class="main" v-show="!loading">
      <el-image fit="cover" class="cover" :src="data.cover"></el-image>
      <el-row class="header">
        <el-row class="title-area" justify="space-between">
          <el-row class="title" align="top">
            <el-avatar :size="32" icon="UserFilled" :src="avatar.baseUrl + uuid + '.webp'"></el-avatar>
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
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
      <el-affix position="bottom" @change="affixChange" :offset="5">
        <el-row class="footer" justify="space-between">
          <el-space>
            <el-space :size="5" class="icon-block">
              <div ref="iconAgree" @click="agreeClick" :class="{'agree-select':agreeSelect}"
                   class="icon agree-transform">
                <svg class="symbol-icon" aria-hidden="true" v-show="!agreeSelect">
                  <use :xlink:href="'#icon-like'"></use>
                </svg>
                <svg class="symbol-icon" aria-hidden="true" v-show="agreeSelect">
                  <use :xlink:href="'#icon-like-fill'"></use>
                </svg>
              </div>
              <span class="num">{{
                  statistic.agree > 1000 ? (statistic.agree / 1000).toFixed(1) + "k" : statistic.agree
                }}</span>
            </el-space>
            <el-space :size="5" class="icon-block">
              <div ref="iconCollect" @click="collectClick" :class="{'collect-select':collectSelect}"
                   class="icon collect-transform">
                <svg class="symbol-icon" aria-hidden="true" v-show="!collectSelect">
                  <use :xlink:href="'#icon-star'"></use>
                </svg>
                <svg class="symbol-icon" aria-hidden="true" v-show="collectSelect">
                  <use :xlink:href="'#icon-star-fill'"></use>
                </svg>
              </div>
              <span class="num">{{collectSelect?'已收藏':'收藏'}}</span>
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
import {ref, computed, onBeforeUnmount, shallowRef, onMounted} from "vue";
import {Editor} from '@wangeditor/editor-for-vue'
import {scrollTo} from "../../utils/scroll";
import {useRoute} from "vue-router";
import router from "../../router";
import {get} from "../../utils/axios";
import {baseMainStore} from "../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {error} from "../../utils/message";
import {animationAgree, animationCollect} from "../../utils/animation";

let e = null
let agreeAnimation = null
let collectAnimation = null
let uuid = ref()
let user = ref({})
let data = ref({})
let statistic = ref({})
let articleId = ref()
let iconAgree = ref(null)
let iconCollect = ref(null)
let agreeSelect = ref(false)
let collectSelect = ref(false)
let loading = ref(false)
let visible = ref(false)
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

const editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')
const mode = ref('default')
const editorConfig = {
  scroll: false,
  readOnly: true
}
const baseStore = baseMainStore()
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
    uuid.value = reply.data.uuid
    statistic.value = reply.data
    getUserInfo()
  }).catch(function () {
    articleNotExist()
  })
}

function getUserInfo() {
  get("/v1/get/user/info?uuid=" + uuid.value).then(function (reply) {
    user.value = reply.data
    getArticle()
  }).catch(function () {
    articleNotExist()
  })
}

function getArticle() {
  let url = article.value.baseUrl + articleId.value + "/" + uuid.value
  get(url).then(function (reply) {
    data.value = reply.data
    editorRef.value.setHtml(data.value["html"])
  }).then(function () {
    loading.value = false
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
  agreeAnimation.play()
  agreeSelect.value = !agreeSelect.value
}

function collectClick() {
  collectAnimation.play()
  collectSelect.value = !collectSelect.value
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

// onBeforeMount(function () {
//   initData()
// })
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