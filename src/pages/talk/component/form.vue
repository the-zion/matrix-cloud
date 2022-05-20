<template>
  <el-container class="form-container">
    <el-row class="header" justify="space-between">
      <el-input class="title-input" v-model="title" placeholder="此处输入标题..."></el-input>
    </el-row>
    <el-row class="tag-block" justify="space-between">
      <el-space wrap>
        <el-popover placement="bottom-start" :width="432" trigger="hover" :show-arrow="false">
          <template #reference>
            <el-button icon="Plus" round class="tag-button" type="info" text
                       bg>添加标签
            </el-button>
          </template>
          <matrix-tag v-model:selectedTags="tags"></matrix-tag>
        </el-popover>
        <el-tag
            round
            closable
            type="info"
            size="large"
            v-for="tag in tags"
            :key="tag"
            :disable-transitions="true"
            @close="tagClose(tag)"
        >
          {{ tag }}
        </el-tag>
      </el-space>
    </el-row>
    <el-radio-group v-model="radio" class="radio-group">
      <el-radio :label="1">公开</el-radio>
      <el-radio :label="2">关注者可见</el-radio>
    </el-radio-group>
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
  </el-container>
</template>

<script>
export default {
  name: "Form",
}
</script>

<script setup>
import {onBeforeUnmount, ref, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {error, info, success, warning} from "../../../utils/message";
import {customParseVideoSrc, customCheckVideoFn} from "../../../utils/video";

let title = ref("")
let tags = ref([])
let radio = ref(1)

const props = defineProps({
  verify: Boolean
})

defineExpose({
  title, tags, radio
})

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
  maxLength: 1000,
  MENU_CONF: {
    insertVideo: {
      checkVideo: customCheckVideoFn,
      parseVideoSrc: customParseVideoSrc
    }
  }
}

function tagClose(tag) {
  tags.value.splice(tags.value.indexOf(tag), 1)
}

function handleCreated(editor) {
  editorRef.value = editor
}

function onMaxLength(editor) {
  editor.alert('最多不超过1000个字', 'info')
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

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped lang="scss">
.form-container {
  width: 100%;
  height: 100%;
  flex-direction: column;

  .header {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid var(--el-border-color-lighter);
    padding: 0 15px;

    .title-input {
      width: calc(100% - 200px);

      ::v-deep(.el-input__wrapper) {
        box-shadow: unset;
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
    }

    .title-input::-webkit-input-placeholder {
      color: var(--el-text-color-placeholder);
    }
  }

  .tag-block {
    width: 100%;
    height: 45px;
    padding: 6px 15px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .tag-button {
      font-weight: 400;
    }
  }

  .radio-group {
    padding: 6px 25px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .toolbar {
    height: 40px;
    width: 100%;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .editor {
    height: calc(100% - 160px) !important;
    width: 100%;
  }
}
</style>