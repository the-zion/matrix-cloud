<template>
  <el-row class="reply">
    <el-row class="reply-editor">
      <Editor
          class="editor"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
    </el-row>
    <el-row class="reply-toolbar" align="middle" justify="space-between">
      <Toolbar
          class="toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <el-button class="button" type="primary" size="small">评论</el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixReply"
}
</script>

<script setup>
import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()
const valueHtml = ref('')
const mode = ref('default')
const toolbarConfig = {
  excludeKeys: [
    "headerSelect",
    "blockquote",
    "|",
    "bold",
    "underline",
    "italic",
    "group-more-style",
    "color",
    "bgColor",
    "fontSize",
    "fontFamily",
    "lineHeight",
    "todo",
    'group-justify',
    'group-indent',
    'group-image',
    'group-video',
    "insertTable",
    "divider",
    "undo",
    "redo",
    "fullScreen"
  ]
}
const editorConfig = {
  placeholder: '请输入内容...',
  scroll: true,
  maxLength: 1000,
}

function handleCreated(editor) {
  editorRef.value = editor
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped lang="scss">
.reply {
  width: 100%;
  height: fit-content;
  border: 1px solid var(--el-border-color);

  .reply-editor {
    width: 100%;
    min-height: 50px;
    max-height: 200px;
    background-color: var(--el-color-white);


    .editor {
      width: 100%;
    }
  }

  .reply-toolbar {
    width: 100%;
    border-top: 1px solid var(--el-border-color);
    background-color: var(--el-color-white);

    .toolbar {
      width: calc(100% - 150px);
    }

    .button {
      margin: 0 5px;
    }
  }
}
</style>