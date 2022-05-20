<template>
  <el-container class="blog-container">
    <send v-model:visible="sendVisible" title="发布文章" mode="blog"></send>
    <el-row class="head">
      <el-row class="base" align="middle" justify="space-between">
        <el-space :size="20">
          <el-image class="logo" @click="backToHome"
                    :src="'../../src/assets/images/matrix.svg'"
                    fit="contain"
          ></el-image>
          <span class="title">{{ title || "无标题" }}</span>
          <el-space>
            <el-icon :color="'var(--el-text-color-placeholder)'">
              <Clock/>
            </el-icon>
            <span class="time">{{ "最近保存：" + time }}</span>
          </el-space>
        </el-space>
        <el-space :size="15">
          <el-button icon="Tickets" @click="draft = true">草稿</el-button>
          <el-button type="primary" icon="Promotion" @click="sendVisible = true">发布</el-button>
        </el-space>
      </el-row>
      <Toolbar
          class="toolbar"
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
    </el-row>
    <el-row class="body" id="body">
      <el-drawer
          v-model="draft"
          title="我的草稿"
          direction="rtl"
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
      />
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
import Send from './component/send.vue'
import Draft from './component/draft.vue'

const editorRef = shallowRef()
const valueHtml = ref('')
const mode = ref('default')
const toolbarConfig = {
  excludeKeys: [
    'fullScreen',
    'insertImage',
    'uploadVideo'
  ]
}
const editorConfig = {
  placeholder: '请输入内容...',
  scroll: false,
  maxLength: 5000,
  MENU_CONF: {
    insertVideo: {
      checkVideo: customCheckVideoFn,
      parseVideoSrc: customParseVideoSrc
    }
  }
}

let title = ref()
let sendVisible = ref(false)
let time = ref("20:00")
let draft = ref(false)
let resizeObserver = null
let oldHeight = null


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
})

onMounted(() => {
  resizeObserver = new ResizeObserver(throttle(function (res) {
    if (!oldHeight) {
      oldHeight = res[0].contentRect.height
    }
    let newHeight = res[0].contentRect.height
    scrollTo(window.scrollY + newHeight - oldHeight + 50)
    oldHeight = newHeight
  }, 100))

  resizeObserver.observe(document.getElementById("body"));
})


</script>

<style scoped lang="scss">
.blog-container {
  flex-direction: column;

  ::v-deep(.send-class) {
    border-radius: 8px;
  }

  .head {
    width: 100%;

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
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      .time {
        font-size: 12px;
        color: var(--el-text-color-placeholder);
      }
    }

    .toolbar {
      width: 100%;

      ::v-deep(.w-e-toolbar) {
        justify-content: space-between;
      }
    }
  }

  .body {
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
  }
}
</style>