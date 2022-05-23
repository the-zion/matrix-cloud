<template>
  <el-container class="blog-container">
    <el-backtop></el-backtop>
    <el-image fit="cover" class="cover" :src="data.cover"></el-image>
    <el-row class="header">
      <el-row class="title-area" justify="space-between">
        <el-row class="title" align="top">
          <el-avatar :size="32" :src="data.image" class="avatar"></el-avatar>
          <el-row class="label" align="middle">{{ data.title }}</el-row>
        </el-row>
        <el-button type="primary" icon="Plus">关注TA</el-button>
      </el-row>
      <el-row class="info" align="middle">
        <span class="name">{{ data.name }}</span>
        <el-space>
          <span class="word">{{ data.time }}</span>
          <span class="point"></span>
          <span class="word">{{ (data.view > 1000 ? (data.view / 1000).toFixed(1) + "k" : data.view) + "阅读" }}</span>
        </el-space>
      </el-row>
    </el-row>
    <Editor
        class="editor"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
    <el-affix position="bottom" @change="affixChange" :offset="11">
      <el-row class="footer" justify="space-between">
        <el-space>
          <el-space :size="5" class="icon-block">
            <el-icon class="iconfont icon-like" :size="20" color="var(--el-text-color-placeholder)"></el-icon>
            <span class="num">{{
                data.agree > 1000 ? (data.agree / 1000).toFixed(1) + "k" : data.agree
              }}</span>
          </el-space>
          <el-space :size="5" class="icon-block">
            <el-icon class="iconfont icon-star" :size="20" color="var(--el-text-color-placeholder)"></el-icon>
            <span class="num">收藏</span>
          </el-space>
        </el-space>
        <el-button icon="EditPen" type="primary" v-show="visible" @click="comment">评论</el-button>
      </el-row>
    </el-affix>
    <el-space class="tags-block" wrap>
      <span class="label">相关标签</span>
      <el-tag type="info" v-for="item in data.tags" round>{{ item }}</el-tag>
    </el-space>
    <Common></Common>
  </el-container>
</template>

<script setup>
import {ref, onBeforeUnmount, shallowRef, onMounted} from "vue";
import {Editor} from '@wangeditor/editor-for-vue'
import Common from './component/comment.vue'
import {scrollTo} from "../../utils/scroll";

const editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')
const mode = ref('default')
const editorConfig = {
  scroll: false,
  readOnly: true
}

let e = null

let data = ref({
  cover: "../../../../src/assets/images/cover.jpg",
  image: "../../../../src/assets/images/boy.png",
  title: "某科学的龙傲天dp分析法",
  name: "刘小圆sama",
  time: "发布于 2022-05-21",
  view: 2000,
  agree: 2000,
  tags: ["Go", "kubernetes", "云原生"]
})
let visible = ref(false)

function init() {
  background()
}


function background() {
  e = document.getElementsByClassName("main-body")[0]
  e.style["background-color"] = "var(--el-color-white)"
}

function handleCreated(editor) {
  editorRef.value = editor
}

function affixChange(value) {
  visible.value = value
}

function comment(){
  scrollTo("blog-comment")
}

onMounted(function () {
  init()
})

onBeforeUnmount(function () {
  e.style["background-color"] = "unset"
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped lang="scss">

.blog-container {
  width: 720px;
  margin: auto;
  flex-direction: column;

  .cover {
    margin-top: 35px;
    height: 200px;
    width: calc(100% - 20px);
    padding: 0 10px;
  }

  .header {
    width: 100%;
    margin-top: 25px;
    padding: 0 10px;

    .title-area {
      width: 100%;

      .title {
        width: calc(100% - 120px);

        .avatar {
          margin-right: 15px;
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
        font-size: 14px;
        margin-right: 10px;
      }

      .word {
        font-size: 12px;
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

  .editor {
    min-height: 676px;
  }

  .footer {
    width: 100%;
    padding: 11px 0;
    border-top: 1px solid var(--el-border-color);
    background-color: var(--el-color-white);

    .icon-block {
      cursor: pointer;

      .num {
        color: var(--el-text-color-secondary);
      }
    }
  }

  .tags-block {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px !important;

    .label {
      font-size: 13px;
      margin-right: 5px;
      color: var(--el-text-color-disabled);
    }
  }
}
</style>