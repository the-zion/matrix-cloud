<template>
  <el-container class="talk-container">
    <el-image-viewer v-if="imageUrlList.length" :url-list="imageUrlList" @close="imageViewerClose"></el-image-viewer>
    <el-backtop></el-backtop>
    <collections-choose v-model:visible="collectionsVisible" :id="talkId"
                        :uuid="authorUuid" :mode="'talk'"
                        @collected="collected"></collections-choose>
    <el-row class="talk-main">
      <el-row class="talk-block">
        <el-row class="header">
          <el-row class="title-area" justify="space-between">
            <el-row class="title" align="top">
              <el-avatar :size="32" :src="avatar.baseUrl + authorUuid + '/avatar.webp'" icon="UserFilled" class="avatar"
                         @click="goToPage('user', {id:authorUuid,menu:'timeline'})"></el-avatar>
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
            </el-space>
          </el-row>
        </el-row>
        <el-row class="main">
          <Editor
              class="editor"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
          />
        </el-row>
        <el-affix position="bottom" :offset="0" class="affix" @change="affixChange">
          <el-row class="footer" justify="space-between">
            <el-space>
              <el-space :size="5" class="icon-block">
                <div ref="iconAgree" @click="agreeClick" :class="{'agree-select':userTalkAgree[talkId]}"
                     class="icon agree-transform">
                  <svg class="symbol-icon" aria-hidden="true" v-show="!userTalkAgree[talkId]">
                    <use :xlink:href="'#icon-like'"></use>
                  </svg>
                  <svg class="symbol-icon" aria-hidden="true" v-show="userTalkAgree[talkId]">
                    <use :xlink:href="'#icon-like-fill'"></use>
                  </svg>
                </div>
                <span class="num">{{
                    statistic.agree > 1000 ? (statistic.agree / 1000).toFixed(1) + "k" : statistic.agree || 0
                  }}</span>
              </el-space>
              <el-space :size="5" class="icon-block">
                <div ref="iconCollect" @click="collectClick" :class="{'collect-select':userTalkCollect[talkId]}"
                     class="icon collect-transform">
                  <svg class="symbol-icon" aria-hidden="true" v-show="!userTalkCollect[talkId]">
                    <use :xlink:href="'#icon-star'"></use>
                  </svg>
                  <svg class="symbol-icon" aria-hidden="true" v-show="userTalkCollect[talkId]">
                    <use :xlink:href="'#icon-star-fill'"></use>
                  </svg>
                </div>
                <span class="num">{{ userTalkCollect[talkId] ? '已收藏' : '收藏' }}</span>
              </el-space>
            </el-space>
            <el-row class="reply" @click="comment" v-if="data['auth'] !== 2">
              <el-icon class="icon" :size="20" color="var(--el-text-color-placeholder)">
                <EditPen/>
              </el-icon>
              <span class="word">添加回复</span>
            </el-row>
          </el-row>
        </el-affix>
        <el-row class="reply-block" v-if="visible && data['auth'] !== 2" id="reply-block">
          <matrix-reply :creationId="talkId" :creationType="3"></matrix-reply>
        </el-row>
      </el-row>
      <el-row class="statistic-block" justify="space-between" align="middle" v-if="data['auth'] !== 2">
        <span class="word">{{ "共" + (statistic.comment || 0) + "个回复" }}</span>
        <el-select class="select" v-model="select" @change="selectChange">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-row>
      <el-row class="comment-block" v-if="data['auth'] !== 2">
        <matrix-comment shape="card" :creationId="talkId" :creationType="3" ref="commentRef"></matrix-comment>
      </el-row>
    </el-row>
    <el-affix>
      <el-row class="talk-aside">
        <Aside :info="data" :statistic="statistic"></Aside>
      </el-row>
    </el-affix>
  </el-container>
</template>

<script setup>
import Aside from "./component/aside.vue"
import {goToPage, setTitle} from "../../utils/globalFunc"
import {removeScrollToBottomListen, scrollTo} from "../../utils/scroll";
import {onBeforeRouteLeave, useRoute} from "vue-router";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {warning} from "../../utils/message";
import {get, post} from "../../utils/axios";
import {animationAgree, animationCollect} from "../../utils/animation";
import {ref, onBeforeUnmount, shallowRef, onBeforeMount, onMounted} from "vue"
import {Editor} from '@wangeditor/editor-for-vue'
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import router from "../../router";
import CollectionsChoose from "../collect/component/choose.vue";

const editorRef = shallowRef()
const mode = ref('default')
const editorConfig = {
  scroll: false,
  readOnly: true
}
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar, talk} = storeToRefs(baseStore)

let talkId = ref()
let authorUuid = ref()
let commentRef = ref()
let user = ref({})
let affix = ref(false)
let visible = ref(false)
let iconAgree = ref(null)
let iconCollect = ref(null)
let loading = ref(false)
let collectionsVisible = ref(false)
let select = ref("hot")
let agreeBounce = ref(1);
let collectBounce = ref(1);
let imageUrlList = ref([])
let agreeAnimation = null
let collectAnimation = null
let clickLock = false


let data = ref({
  "title": "暂无数据",
  "username": "暂无数据",
  "update": "0000-00-00"
})

let statistic = ref({
  "agree": 0,
  "view": 0,
})

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
let userTalkAgree = ref({})
let userTalkCollect = ref({})

function init() {
  initData()
  getData()
}

function animation() {
  agreeAnimation = animationAgree(iconAgree, agreeBounce)
  collectAnimation = animationCollect(iconCollect, collectBounce)
}

function initData() {
  let i = useRoute()
  talkId.value = i.query["id"]
  if (!talkId.value) {
    talkNotExist()
  }
}

function talkNotExist() {
  router.push({name: "result", query: {type: "error", title: '获取讨论失败', description: "讨论不存在或已被删除"}})
}

function getData() {
  getStatistic()
}

function getStatistic() {
  loading.value = true
  get("/v1/get/talk/statistic?id=" + talkId.value + "&uuid=" + (uuid.value || "")).then(function (reply) {
    authorUuid.value = reply.data.uuid
    statistic.value = reply.data
    setView()
    getUserInfo()
  }).catch(function () {
    talkNotExist()
  })
}

function setView() {
  post("/v1/set/talk/view", {
    id: talkId.value,
    uuid: authorUuid.value
  })
}

function getUserInfo() {
  get("/v1/get/user/info/visitor?uuid=" + authorUuid.value).then(function (reply) {
    user.value = reply.data
    getTalk()
  }).catch(function () {
    talkNotExist()
  })
}

function getTalk() {
  let url = talk.value.baseUrl + authorUuid.value + "/" + talkId.value + "/content"
  get(url).then(function (reply) {
    data.value = reply.data
    editorRef.value.setHtml(data.value["html"])
    setTitle(reply.data["title"])
    getUserTalkAgree()
    getUserTalkCollect()
    addClickListenToImg()
  }).catch(function () {
    talkNotExist()
  }).then(function () {
    loading.value = false
  })
}

function getUserTalkAgree() {
  if (!talkId.value || !uuid.value) {
    return
  }
  get("/v1/get/user/talk/agree").then(function (reply) {
    userTalkAgree.value = reply.data.agree
  })
}

function getUserTalkCollect() {
  if (!talkId.value || !uuid.value) {
    return
  }
  get("/v1/get/user/talk/collect").then(function (reply) {
    userTalkCollect.value = reply.data.collect
  })
}


function addClickListenToImg(){
  const images = document.getElementsByClassName("w-e-image-container")
  Array.prototype.forEach.call(images, function (image) {
    image.addEventListener("click",function (){
      imageUrlList.value = [image.lastElementChild.currentSrc]
    })
  });
}

function imageViewerClose(){
  imageUrlList.value = []
}

function agreeClick() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!talkId.value || !authorUuid.value || clickLock) {
    return
  }

  clickLock = true
  if (!userTalkAgree.value[talkId.value]) {
    agreeAdd()
  } else {
    agreeCancel()
  }
}

function agreeAdd() {
  post("/v1/set/talk/agree", {
    id: talkId.value,
    uuid: authorUuid.value,
  }).then(function () {
    agreeAnimation.play()
    userTalkAgree.value[talkId.value] = true
    statistic.value["agree"] += 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function agreeCancel() {
  post("/v1/cancel/talk/agree", {
    id: talkId.value,
    uuid: authorUuid.value,
  }).then(function () {
    agreeAnimation.play()
    userTalkAgree.value[talkId.value] = false
    statistic.value["agree"] -= 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function collectClick() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!talkId.value || !authorUuid.value) {
    return
  }

  if (!userTalkCollect.value[talkId.value]) {
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
  post("/v1/cancel/talk/collect", {
    id: talkId.value,
    uuid: authorUuid.value,
  }).then(function () {
    collectAnimation.play()
    userTalkCollect.value[talkId.value] = false
    statistic.value["collect"] -= 1
  }).catch(function () {
  }).then(function () {
    clickLock = false
  })
}

function collected() {
  collectAnimation.play()
  userTalkCollect.value[talkId.value] = true
  statistic.value["collect"] += 1
}

function handleCreated(editor) {
  editorRef.value = editor
}

function affixChange(value) {
  affix.value = value
}

function comment() {
  visible.value = !visible.value
  if (affix.value) {
    setTimeout(function () {
      scrollTo("reply-block")
    }, 50)
  }
}

function selectChange(value) {
  commentRef.value.modeChange(value)
}

onBeforeMount(function () {
  init()
})

onMounted(function () {
  animation()
})

onBeforeUnmount(function () {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})
</script>

<style scoped lang="scss">
.talk-container {
  margin: auto;
  width: fit-content;
  padding: 20px 0;

  ::v-deep(.collections-choose) {
    border-radius: 4px;
    margin-top: 10vh;

    .el-dialog__body {
      padding: 0 20px
    }
  }

  .talk-main {
    width: 734px;
    margin-bottom: 200px;

    .talk-block {
      width: 100%;
      padding: 16px 16px 0 16px;
      margin-bottom: 10px;
      background-color: var(--el-color-white);
      border-radius: 8px;
      border: 1px solid var(--el-border-color-lighter);

      .header {
        width: 100%;

        .title-area {
          width: 100%;

          .title {
            width: calc(100% - 120px);

            .avatar {
              margin-right: 10px;
              cursor: pointer;
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
            font-size: 13px;
            margin-right: 10px;
          }

          .word {
            font-size: 13px;
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

      .main {
        width: 100%;

        .editor {
          width: 100%;
          min-height: 676px;
        }
      }

      .affix {
        width: 100%;

        .footer {
          width: 100%;
          padding: 16px 0;
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

        .reply {
          .icon {
            margin-right: 5px;
          }

          .word {
            font-size: 14px;
            color: var(--el-text-color-secondary);
            cursor: pointer;
          }
        }
      }

      .reply-block {
        width: 100%;
        padding: 16px 0;
      }
    }

    .statistic-block {
      width: 100%;
      border-radius: 8px;
      border: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      margin-bottom: 10px;
      padding: 10px 15px;

      .word {
        font-size: 12px;
        color: var(--el-text-color-disabled)
      }

      .select {
        width: 75px;

        ::v-deep(.el-input__wrapper) {
          box-shadow: unset !important;
          height: 20px;
        }
      }
    }

    .comment-block {
      width: 100%;
    }
  }

  .talk-aside {
    width: 256px;
    margin-left: 10px;
    height: fit-content;
  }
}
</style>