<template>
  <el-container class="talk-container">
    <el-drawer
        v-model="drawer"
        custom-class="drawer"
        direction="rtl"
        @closed="drawer = false"
        destroy-on-close
    >
      <template #title>
        <!--        todo 2.2.0版本以上换成header-->
        <el-row class="title">讨论发起</el-row>
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
          <span class="title">讨论发起</span>
          <span class="time">{{ time }}</span>
        </el-space>
        <el-space :size="15">
          <el-button type="primary" icon="Promotion" @click="drawer = true">发布</el-button>
        </el-space>
      </el-row>
    </el-row>
    <el-progress v-show="uploading" :duration="10" class="process" :percentage="percentage"
                 :show-text="false"/>
    <el-row class="area" id="area">
      <el-input :maxlength="50" placeholder="请输入标题" class="title" v-model="title"/>
      <Toolbar
          class="toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          mode="default"
      />
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
  </el-container>
</template>

<script setup>
import {onBeforeUnmount, ref, shallowRef, onBeforeMount} from 'vue'
import {backToHome, getAssets, setTitle} from "../../utils/globalFunc";
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {success, info, warning, error} from "../../utils/message";
import {customCheckVideoFn, customParseVideoSrc} from "../../utils/video";
import Form from './component/form.vue'
import {useRoute} from "vue-router";
import {get, post} from "../../utils/axios";
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {xssFilter} from "../../utils/xss";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {talk} = storeToRefs(baseStore)
const logo = getAssets('matrix.svg')
const editorRef = shallowRef()
const valueHtml = ref('')
const mode = ref('create')
const toolbarConfig = {
  excludeKeys: [
    "blockquote",
    "|",
    "bgColor",
    "fontSize",
    "fontFamily",
    "lineHeight",
    "underline",
    "group-more-style",
    "fullScreen",
    'insertImage',
    'uploadVideo',
    'group-justify',
    'group-indent',
    'group-video',
  ]
}

const editorConfig = {
  placeholder: '请输入内容...',
  maxLength: 2000,
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

let title = ref()
let drawer = ref(false)
let draftId = ref()
let time = ref("自动保存至草稿箱")
let loading = ref(false)
let uploading = ref(false)
let percentage = ref(0)
let uploadBox = {}
let uploadParams = {
  Bucket: talk.value.bucket,
  Region: talk.value.region,
}
let token = null

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
  editor.alert('最多不超过2000个字', 'info')
}

function init() {
  setTitle("讨论发起")
  initData()
  mode.value === 'create' && getLastDraft()
  mode.value === 'edit' && getDataEdit()
}

function getLastDraft() {
  get("/v1/get/last/talk/draft").then(function (reply) {
    draftId.value = reply.data.id
    getData()
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
  post("/v1/create/talk/draft", {}).then(function (reply) {
    draftId.value = reply.data.id
    let editor = editorRef.value
    if (editor == null) return
    editor.setHtml(" ")
  }).catch(function () {
    error("稿件创建失败，请稍后再试")
  })
}

function editChange(editor) {
  uploadBox["title"] = title.value
  uploadBox["html"] = xssFilter(editor.getHtml())
  uploadBox["update"] = new Date().toLocaleDateString()
  editSave(function () {
    time.value = "最近保存：" + uploadBox["update"]
  })
}

function editSave(fn) {
  if (!uuid.value) {
    time.value = "账号未登录，请先登录"
    return
  }

  if (!draftId.value) {
    time.value = "自动保存失败"
    return
  }
  time.value = "保存中......"
  uploadBox["id"] = draftId.value
  uploadParams["Key"] = talk.value.key + uuid.value + "/" + draftId.value + "/content" + (mode.value === "edit" ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
  }
  uploadParams["Body"] = JSON.stringify(uploadBox)
  cos.value.uploadFile(uploadParams, fn)
}

function imageUpload(file, insertFn) {
  if (!uuid.value || !token) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    time.value = "自动保存失败"
    return
  }

  let imageId = +new Date()
  let filetype = file.type.split("/")[1]
  percentage.value = 0
  uploading.value = true
  uploadParams["Key"] = talk.value.key + uuid.value + "/" + draftId.value + "/" + imageId + "." + filetype
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
    let url = talk.value.baseUrl + uuid.value + "/" + draftId.value + "/" + imageId + ".webp"
    insertFn(url, "网络不佳或图片涉及敏感", url)
  })
}

function initData() {
  mode.value = useRoute().query["mode"]
  draftId.value = parseInt(useRoute().query["id"])
  token = localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
}

function getData() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("草稿获取失败")
    return
  }

  loading.value = true
  let url = talk.value.baseUrl + uuid.value + "/" + draftId.value + "/content"
  get(url).then(function (reply) {
    let data = reply.data
    let editor = editorRef.value
    if (editor == null) return
    title.value = data.title
    editor.setHtml(data.html)
    uploadBox = data
  }).catch(function () {
    error("草稿获取失败")
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
    error("草稿获取失败")
    return
  }

  loading.value = true
  let url = talk.value.baseUrl + uuid.value + "/" + draftId.value + "/content-edit"
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

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onBeforeMount(() => {
  setTimeout(function (){
    init()
  }, 1000)
})

</script>

<style scoped lang="scss">
.talk-container {
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

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
    background-color: var(--el-color-white);

    .base {
      width: 100%;
      height: 50px;
      padding: 0 40px;
      border-bottom: 1px solid var(--el-border-color);

      .logo {
        width: 95px;
        cursor: pointer;
      }

      .title {
        font-size: 16px;
        color: var(--el-text-color-primary);
      }

      .time {
        font-size: 12px;
        color: var(--el-text-color-placeholder);
      }
    }
  }

  .area {
    width: 737px;
    background-color: var(--el-color-white);
    margin: auto;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.12);
    height: calc(100% - 50px);

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
      margin: 15px 0;

      ::v-deep(.el-input__wrapper) {
        box-shadow: unset;
        font-size: 20px;
        font-weight: 500;
        color: var(--el-text-color-primary);
      }
    }

    .title::-webkit-input-placeholder {
      color: var(--el-text-color-placeholder);
    }

    .toolbar {
      width: 100%;
      border-top: 1px solid var(--el-border-color-lighter);
      border-bottom: 1px solid var(--el-border-color-lighter);

      ::v-deep(.w-e-toolbar) {
        justify-content: space-between;
      }
    }

    .editor {
      width: 100%;
      height: calc(100% - 105px) !important;

    }

    .bottom {
      width: 100%;
    }
  }
}
</style>