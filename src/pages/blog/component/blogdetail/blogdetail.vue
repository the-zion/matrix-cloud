<template>
  <el-row class="edit-container">
    <el-space fill class="body">
      <el-row class="title-container">
        <el-row class="title-input">{{ props.title }}</el-row>
      </el-row>
      <el-space>
        <el-avatar :size="props.avatarSize || 34" :src="'../../src/assets/images/user1.png'"></el-avatar>
        <el-row class="author">刘思圆</el-row>
        <el-row class="date">2022-03-05</el-row>
      </el-space>
      <el-image class="image" :src="'../../src/assets/images/background1.jpg'" fit="cover"
                :preview-src-list="['../../src/assets/images/background1.jpg']"></el-image>
      <Editor
          :editorId="editorId"
          :defaultConfig="Object.assign({readOnly:true},props.editorConfig)"
          :defaultHtml="props.defaultHtml"
          class="editor-container"
      />
      <cube-comment></cube-comment>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "CubeBlogDetail",
}
</script>

<script setup>
import "@wangeditor/editor/dist/css/style.css"
import {onBeforeUnmount} from 'vue'
import {Editor, getEditor, removeEditor} from '@wangeditor/editor-for-vue'

const editorId = `w-e-${Math.random().toString().slice(-5)}` //【注意】编辑器 id ，要全局唯一


const props = defineProps({
  editorConfig: {
    type: Object,
    default: {}
  },
  defaultHtml: String,
  title: String
})


onBeforeUnmount(() => {
  const editor = getEditor(editorId)
  if (editor == null) return

  editor.destroy()
  removeEditor(editorId)
})
</script>

<style scoped lang="scss">
.edit-container {
  width: 780px;
  min-height: 1070px;
  background: #FFFFFF;
  margin: 20px auto;
  padding: 20px 50px 50px 50px;

  .body {
    width: 100%;
    height: fit-content;

    .title-container {
      margin: 20px 0;

      .title-input {
        font-size: 28px;
        border: 0;
        outline: none;
        width: 100%;
        line-height: 1;
        font-weight: 500;
        color: #404040;
      }

      .title-input::-webkit-input-placeholder {
        color: var(--w-e-textarea-slight-color);
      }
    }

    .author, .date {
      color: var(--el-text-color-secondary);
    }

    .image {
      width: 680px;
      height: 380px;
      border-radius: 8px;
      margin: 15px 0 0 0;
    }

    .editor-container {
      width: 100%;
      overflow-y: hidden;
      //min-height: 900px;

      ::v-deep(.w-e-text-placeholder) {
        font-style: unset;
      }
    }
  }
}
</style>