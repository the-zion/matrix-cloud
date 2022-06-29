<template>
  <el-container class="blog-container">
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
      <Form></Form>
    </el-drawer>
    <el-row class="head">
      <el-row class="base" align="middle" justify="space-between">
        <el-space :size="20">
          <el-image class="logo" @click="backToHome"
                    :src="'../../src/assets/images/matrix.svg'"
                    fit="contain"
          ></el-image>
        </el-space>
        <el-space :size="18">
          <el-space>
            <el-icon :color="'var(--el-text-color-placeholder)'">
              <Clock/>
            </el-icon>
            <span class="time">{{ time }}</span>
          </el-space>
          <el-button icon="Tickets" @click="draft = true">草稿</el-button>
          <el-button type="primary" icon="Promotion" @click="drawer = true">发布</el-button>
        </el-space>
      </el-row>
      <Toolbar
          class="toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
    </el-row>
    <el-row class="area" id="area">
      <el-drawer
          v-model="draft"
          title="我的草稿"
          direction="rtl"
          destroy-on-close
      >
        <draft></draft>
      </el-drawer>
      <el-input placeholder="请输入标题" class="title" v-model="title"/>
      <Editor
          class="editor"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
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
import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import router from "../../router";
import {scrollTo} from "../../utils/scroll";
import {success, info, warning, error} from "../../utils/message";
import {customCheckVideoFn, customParseVideoSrc} from "../../utils/video";
import {get, post} from "../../utils/axios"
import {initCos} from "../../utils/cos";
import Draft from './component/draft.vue'
import Form from './component/form.vue'
import {loginTimeOut} from "../../utils/globalFunc";
import {userMainStore, baseMainStore} from "../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";


const cos = initCos()
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {article} = storeToRefs(baseStore)
const editorRef = shallowRef()
const valueHtml = ref('')
const mode = ref('default')
const toolbarConfig = {
  excludeKeys: [
    'fullScreen',
    'insertImage',
    'uploadVideo',
    "bgColor",
    "fontSize",
    "fontFamily",
    "lineHeight",
    "|",
  ]
}
const editorConfig = {
  placeholder: '请输入内容...',
  scroll: false,
  maxLength: 5000,
  autoFocus: false,
  MENU_CONF: {
    insertVideo: {
      checkVideo: customCheckVideoFn,
      parseVideoSrc: customParseVideoSrc
    },
    uploadImage: {
      maxFileSize: 5 * 1024 * 1024,
      allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
      customUpload: imageUpload
    }
  }
}

let title = ref()
let draftId = ref()
let time = ref("文章将自动保存至草稿箱")
let draft = ref(false)
let drawer = ref(false)
let body = null
let resizeObserver = null
let draftMarked = false
let uploadBox = {}
let uploadParams = {
  Bucket: baseStore.article.bucket,
  Region: baseStore.article.region,
}


function backToHome() {
  router.push({name: "home"})
}

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

function editChange(editor) {
  uploadBox["title"] = title.value
  uploadBox["html"] = editor.getHtml()
  editSave(function () {
    time.value = "最近保存：" + new Date().toLocaleString()
  })
  draftMark()
}

function draftMark() {
  if (!draftId.value || !uuid.value || draftMarked) {
    return
  }
  post("/v1/article/draft/mark", {id: draftId.value}).then(function () {
    draftMarked = true
  })
}

function imageUpload(file, insertFn) {
  if (!draftId.value || !uuid.value) {
    time.value = "文章自动保存失败"
    return
  }
  let imageId = +new Date();
  let filetype = file.type.split("/")[1]
  uploadParams["Key"] = baseStore.article.key  + draftId.value + "/" + imageId + "." + filetype
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
  }
  uploadParams["Body"] = file
  cos.uploadFile(uploadParams, function (err) {
    if (err) {
      error("图片上传失败，请稍后再试")
      return
    }
    insertFn(baseStore.article.baseUrl + draftId.value + "/" + imageId + "." + filetype)
  })
}

function editSave(fn) {
  if (!draftId.value || !uuid.value) {
    time.value = "文章自动保存失败"
    return
  }
  time.value = "文章保存中......"
  uploadParams["Key"] = baseStore.article.key + draftId.value + "/" + uuid.value
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
  }
  uploadParams["Body"] = JSON.stringify(uploadBox)
  cos.uploadFile(uploadParams, fn)
}

function throttle(callback, delay) {
  let pre = 0
  return function (res) {
    const current = Date.now()
    if (current - pre > delay) {
      callback.call(this, res)
      pre = current
    }
  }
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
  body.style.backgroundColor = "rgb(247 248 250)"
})

function init() {
  getBaseInform()
  getLastDraft()
}

function getBaseInform() {
  userStore.getUserProfile()
}

function getLastDraft() {
  get("/v1/get/last/article/draft").then(function (reply) {
    if (reply.data.status === 3) {
      CreateDraft()
    } else {
      draftId.value = reply.data.id
    }
  }).catch(function (err) {
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "TOKEN_EXPIRED":
          loginTimeOut()
          return
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

onMounted(() => {
  resizeObserver = new ResizeObserver(throttle(function (res) {
    scrollTo("bottom")
  }, 100))
  resizeObserver.observe(document.getElementById("area"));
  body = document.body
  body.style.backgroundColor = "var(--el-color-white)"

  init()
})
</script>

<style scoped lang="scss">
.blog-container {
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
    border-bottom: 1px solid var(--el-border-color-lighter);

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

    .toolbar {
      width: 1000px;
      margin: auto;

      ::v-deep(.w-e-toolbar) {
        justify-content: center;
      }
    }
  }

  .area {
    width: 700px;
    margin: auto;

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

      ::v-deep(.w-e-max-length-info) {
        position: absolute;
        top: 0;
      }
    }

    .bottom {
      width: 100%;
    }
  }
}
</style>