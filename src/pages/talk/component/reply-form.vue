<template>
  <el-row class="form-container">
    <Toolbar
        class="toolbar"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <el-row class="editor">
      <Editor
          style="width: 100%;"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "ReplyForm"
}
</script>

<script setup>
import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {error} from "../../../utils/message";

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
.form-container {
  width: 100%;
  height: 100%;
  flex-direction: column;

  .toolbar {
    width: 100%;
    border-top: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
  }

  .editor {
    width: 100%;
    height: calc(100% - 45px);
  }
}
</style>