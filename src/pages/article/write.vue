<template>
  <el-container class="article-container">
    <el-drawer
        v-model="drawer"
        custom-class="drawer"
        direction="rtl"
        @closed="drawer = false"
        destroy-on-close
    >
      <template #title>
        <!--        todo 2.2.0版本以上换成header-->
        <el-row class="title">发布文章</el-row>
      </template>
      <Form :title="title" :editor="editorRef" :id="draftId" :mode="mode"></Form>
    </el-drawer>
    <el-row class="head">
      <el-row class="base" align="middle" justify="space-between">
        <el-space :size="20">
          <el-image class="logo" @click="backToHome"
                    :src="logo"
                    fit="contain"
          ></el-image>
        </el-space>
        <el-space :size="18">
          <el-space v-if="mode === 'create'">
            <el-icon :color="'var(--el-text-color-placeholder)'">
              <Clock/>
            </el-icon>
            <span class="time">{{ time }}</span>
          </el-space>
          <el-button v-if="mode === 'create'" icon="Tickets" @click="draft = true">草稿</el-button>
          <el-button type="primary" icon="Promotion" @click="drawer = true">发布</el-button>
        </el-space>
      </el-row>
      <el-affix :offset="0" class="affix" target=".article-container" ref="affixRef">
        <el-row class="block">
          <Toolbar
              class="toolbar"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              mode="default"
          />
          <el-progress v-show="uploading" :duration="10" class="process" :percentage="percentage"
                       :show-text="false"/>
        </el-row>
      </el-affix>
    </el-row>
    <el-row class="catalog">
      <span class="title" v-if="headers">文章目录</span>
      <ul id="header-container" class="header-container"></ul>
    </el-row>
    <el-row class="main" id="article-write-main">
      <el-row class="area" id="area">
        <el-drawer
            v-model="draft"
            title="我的草稿"
            direction="rtl"
            destroy-on-close
        >
          <draft @draftSelect="draftSelect"></draft>
        </el-drawer>
        <el-input :maxlength="50" placeholder="请输入标题" class="title" v-model="title"/>
        <Editor
            v-loading="loading"
            class="editor"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            mode="default"
            @onCreated="handleCreated"
            @onMaxLength="onMaxLength"
            @customAlert="customAlert"
            @onChange="editChange"
        />
        <span class="bottom" id="bottom"></span>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
import {backToHome, getAssets, setTitle} from "../../utils/globalFunc";
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {SlateNode} from '@wangeditor/editor'
import {success, info, warning, error} from "../../utils/message";
import {customCheckVideoFn, customParseVideoSrc} from "../../utils/video";
import {get, post} from "../../utils/axios"
import Draft from './component/draft.vue'
import Form from './component/form.vue'
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {useRoute} from "vue-router";
import {scrollToContainer, throttle} from "../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {article} = storeToRefs(baseStore)
const editorRef = shallowRef()
const valueHtml = ref('')
const toolbarConfig = {
  excludeKeys: [
    'fullScreen',
    'insertImage',
    'uploadVideo',
    "bgColor",
    "fontSize",
    "lineHeight",
    'group-video',
    "|",
  ]
}
const editorConfig = {
  placeholder: '请输入内容...',
  scroll: false,
  maxLength: 10000,
  autoFocus: false,
  MENU_CONF: {
    insertVideo: {
      checkVideo: customCheckVideoFn,
      parseVideoSrc: customParseVideoSrc
    },
    uploadImage: {
      maxFileSize: 2 * 1024 * 1024,
      allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      customUpload: imageUpload
    }
  }
}
const logo = getAssets('matrix.svg')

let title = ref("")
let draftId = ref()
let affixRef = ref()
let time = ref("文章将自动保存至草稿箱")
let userRouteValue = useRoute()
let mode = ref("create")
let draft = ref(false)
let drawer = ref(false)
let loading = ref(false)
let uploading = ref(false)
let percentage = ref(0)
let headers = ref(false)
let headerContainer = null
let body = null
let draftMarked = false
let uploadBox = {}
let uploadParams = {
  Bucket: article.value.bucket,
  Region: article.value.region,
}
let token = null
let delayEdit = null

function handleCreated(editor) {
  editorRef.value = editor
}

function customAlert(s, t) {
  switch (t) {
    case 'success':
      success(s)
      break
    case 'info':
      info(s)
      break
    case 'warning':
      warning(s)
      break
    case 'error':
      error(s)
      break
    default:
      info(s)
      break
  }
}

function onMaxLength(editor) {
  editor.alert('最多不超过5000个字', 'info')
}

function draftSelect(id) {
  draftId.value = id
  getData()
}

function editChange(editor) {
  uploadBox["title"] = title.value
  uploadBox["html"] = editor.getHtml()
  uploadBox["update"] = new Date().toLocaleDateString()
  headerContainer.innerHTML = editor.getElemsByTypePrefix('header').map(header => {
    const text = SlateNode.string(header)
    const {id, type} = header
    return `<li id="catalog-${id}" class="li ${type}">${text}</li>`
  }).join('')
  headerContainer.innerHTML && (headers.value = true)
  mode.value === 'create' && draftMark()
  delayEdit ? delayEdit() : delayEdit= throttle(function (){
    editSave(function () {
      time.value = "最近保存：" + uploadBox["update"]
    })
  }, 1000)
}


function draftMark() {
  if (!draftId.value || draftMarked || !uuid.value) {
    return
  }
  post("/v1/article/draft/mark", {id: draftId.value}).then(function () {
    draftMarked = true
  })
}

function imageUpload(file, insertFn) {
  if (!uuid.value || !token) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    time.value = "文章自动保存失败"
    return
  }

  let imageId = +new Date()
  let filetype = file.type.split("/")[1]
  percentage.value = 0
  uploading.value = true
  uploadParams["Key"] = article.value.key + uuid.value + "/" + draftId.value + "/" + imageId + "." + filetype
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
    'x-cos-meta-id': draftId.value,
    'x-cos-meta-kind': "content",
    'x-cos-meta-uid': imageId,
    'Pic-Operations':
        '{"is_pic_info": 1, "rules": [{"fileid": ' + '"' + imageId + ".webp" + '", "rule": "imageMogr2/format/webp/interlace/0/quality/80"}]}',
  }
  uploadParams["Body"] = file
  uploadParams["onProgress"] = function (progressData) {
    percentage.value = progressData.percent * 100
  }
  cos.value.uploadFile(uploadParams, function (err) {
    uploading.value = false
    if (err) {
      error("图片上传失败，请稍后再试")
      return
    }
    let url = article.value.baseUrl + uuid.value + "/" + draftId.value + "/" + imageId + ".webp"
    insertFn(url, "网络不佳或图片涉及敏感", url)
  })
}

function editSave(fn) {
  if (!uuid.value) {
    time.value = "账号未登录，请先登录"
    return
  }

  if (!draftId.value) {
    time.value = "文章自动保存失败"
    return
  }
  time.value = "文章保存中......"
  uploadBox["id"] = draftId.value
  uploadParams["Key"] = article.value.key + uuid.value + "/" + draftId.value + "/content" + (mode.value === "edit" ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
  }
  uploadParams["Body"] = JSON.stringify(uploadBox)
  cos.value.uploadFile(uploadParams, fn)
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
  body.style.backgroundColor = "rgb(247 248 250)"
})

function init() {
  setTitle("写文章")
  initData()
  mode.value === 'create' && getLastDraft()
  mode.value === 'edit' && getDataEdit()
}

function initData() {
  mode.value = userRouteValue.query["mode"]
  draftId.value = parseInt(userRouteValue.query["id"])
  token = localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
  headerContainer = document.getElementById('header-container')
  headerContainer.addEventListener('mousedown', event => {
    if (event.target.tagName !== 'LI') return
    event.preventDefault()
    const id = event.target.id.slice(8)
    scrollToContainer("article-write-main", id)
  })
}

function heightToTop(container, ele){
  let root = container;
  let height = 0;
  do{
    height += ele.offsetTop;
    ele = ele.offsetParent;
  }while( ele && ele !== root )
  return height;
}

function getLastDraft() {
  get("/v1/get/last/article/draft").then(function (reply) {
    if (reply.data.status !== 1) {
      CreateDraft()
    } else {
      draftId.value = reply.data.id
    }
  }).catch(function (err) {
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "RECORD_NOT_FOUND":
          CreateDraft()
          return
      }
    }
    error("稿件创建失败，请稍后再试")
  })
}

function CreateDraft() {
  post("/v1/create/article/draft", {}).then(function (reply) {
    draftId.value = reply.data.id
  }).catch(function () {
    error("稿件创建失败，请稍后再试")
  })
}

function getData() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("稿件获取失败")
    return
  }

  loading.value = true
  let url = article.value.baseUrl + uuid.value + "/" + draftId.value + "/content"
  get(url).then(function (reply) {
    let data = reply.data
    let editor = editorRef.value
    if (editor == null) return
    title.value = data.title
    editor.setHtml(data.html)
    uploadBox = data
  }).catch(function () {
    error("稿件获取失败")
  }).then(function () {
    loading.value = false
  })
}

function getDataEdit() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("稿件获取失败")
    return
  }

  loading.value = true
  let url = article.value.baseUrl + uuid.value + "/" + draftId.value + "/content-edit"
  get(url).then(function (reply) {
    let data = reply.data
    let editor = editorRef.value
    if (editor == null) return
    title.value = data.title
    editor.setHtml(data.html)
    uploadBox = data
    loading.value = false
  }).catch(function () {
    getData()
  })
}

onMounted(() => {
  body = document.body
  body.style.backgroundColor = "var(--el-color-white)"
  setTimeout(function () {
    init()
  }, 1000)
})
</script>

<style scoped lang="scss">
.article-container {
  flex-direction: column;

  ::v-deep(.el-overlay) {
    background-color: unset;

    .drawer {
      background-color: var(--el-fill-color-lighter);
      box-shadow: var(--el-box-shadow-lighter);

      .el-drawer__header {
        margin-bottom: unset;
      }

      .title {
        font-size: 18px;
        font-weight: 400;
        color: var(--el-text-color-primary);
      }
    }
  }

  .head {
    width: 100%;

    .base {
      width: 1000px;
      height: 50px;
      margin: auto;

      .logo {
        width: 95px;
        cursor: pointer;
      }

      .title {
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      .time {
        font-size: 12px;
        color: var(--el-text-color-placeholder);
      }
    }

    .affix {
      width: 100%;

      .block {
        width: 100%;
        border-bottom: 1px solid var(--el-border-color-lighter);

        .toolbar {
          width: 1000px;
          margin: auto;

          ::v-deep(.w-e-toolbar) {
            justify-content: center;
          }
        }

        .process {
          width: 100%;
          position: absolute;
          z-index: 1;
        }
      }
    }
  }

  .catalog {
    position: absolute;
    top: 127px;
    bottom: 0;
    right: calc(52% + 360px);
    width: 250px;
    overflow-y: auto;
    z-index: 100;
    display: unset;

    .title{
      font-size: 25px;
      color: var(--el-text-color-regular)
    }

    .header-container {
      list-style-type: none;
      padding-left: 0;
      width: 100%;
      margin-top: 0;
      ::v-deep(.li) {
        color: var(--el-text-color-secondary);
        margin: 10px 0;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      ::v-deep(.li:hover) {
        color: var(--el-color-primary);
      }
      ::v-deep(.header1) {
        font-size: 20px;
      }
      ::v-deep(.header2) {
        font-size: 16px;
        padding-left: 15px;
      }
      ::v-deep(.header3) {
        font-size: 14px;
        padding-left: 30px;
      }
      ::v-deep(.header4) {
        font-size: 12px;
        padding-left: 45px;
      }
      ::v-deep(.header5) {
        font-size: 12px;
        padding-left: 60px;
      }
    }
  }


  .main {
    position: absolute;
    top: 91px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;

    .area {
      width: 720px;
      margin: 0 auto;
      height: fit-content;

      ::v-deep(.el-overlay) {
        top: 91px;
        background: unset;

        .el-drawer {
          box-shadow: unset;
          width: 280px !important;
          border-left: 1px solid var(--el-border-color);

          .el-drawer__header {
            margin-bottom: unset;
            padding: 10px 15px;
            border-bottom: 1px solid var(--el-border-color);
          }

          .el-drawer__body {
            padding: unset;
          }
        }
      }


      .title {
        margin: 36px 0 22px;

        ::v-deep(.el-input__wrapper) {
          box-shadow: unset;
          font-size: 28px;
          font-weight: 500;
          color: var(--el-text-color-primary);
        }
      }

      .title::-webkit-input-placeholder {
        color: var(--el-text-color-placeholder);
      }

      .editor {
        width: 100%;
        min-height: 300px;
        ::v-deep(a:-webkit-any-link){
          text-decoration: unset;
        }
      }

      .bottom {
        width: 100%;
      }
    }
  }
}
</style>