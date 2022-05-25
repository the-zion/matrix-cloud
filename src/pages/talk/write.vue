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
      <Form></Form>
    </el-drawer>
    <el-row class="head">
      <el-row class="base" align="middle" justify="space-between">
        <el-space :size="20">
          <el-image class="logo" @click="backToHome"
                    :src="'../../src/assets/images/matrix.svg'"
                    fit="contain"
          ></el-image>
          <span class="title">讨论发起</span>
        </el-space>
        <el-space :size="15">
          <el-button type="primary" icon="Promotion" @click="drawer = true">发布</el-button>
        </el-space>
      </el-row>
    </el-row>
    <el-row class="area" id="area">
      <el-input placeholder="请输入标题" class="title" v-model="title"/>
      <Toolbar
          class="toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          class="editor"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onMaxLength="onMaxLength"
          @customAlert="customAlert"
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
import Form from './component/form.vue'
import {SoldOut} from "@element-plus/icons-vue";

const editorRef = shallowRef()
const valueHtml = ref('')
const mode = ref('default')
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
    }
  }
}

let title = ref()
let drawer = ref(false)


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
  editor.alert('最多不超过2000个字', 'info')
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onMounted(() => {

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