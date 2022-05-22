<template>
  <el-container class="talk-container">
    <el-main class="talk-main">
      <el-row class="talk-block">
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
              <span class="word">{{
                  (data.view > 1000 ? (data.view / 1000).toFixed(1) + "k" : data.view) + "阅读"
                }}</span>
            </el-space>
          </el-row>
        </el-row>
        <el-row class="main">
          <Editor
              class="editor"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
          />
        </el-row>
        <el-affix position="bottom" :offset="16" class="affix">
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
            <el-button icon="EditPen" type="primary" @click="">回复评论</el-button>
          </el-row>
        </el-affix>
      </el-row>
      <Comment></Comment>
    </el-main>
    <el-aside class="talk-aside"></el-aside>
  </el-container>
</template>

<script setup>
import {ref, onBeforeUnmount, shallowRef, onMounted} from "vue";
import {Editor} from '@wangeditor/editor-for-vue'
import Comment from "./component/comment.vue";

const editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')
const mode = ref('default')
const editorConfig = {
  scroll: false,
  readOnly: true
}

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

function handleCreated(editor) {
  editorRef.value = editor
}

onBeforeUnmount(function () {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped lang="scss">
.talk-container {
  margin: auto;
  width: fit-content;

  .talk-main {
    padding: 5px;
    width: 734px;

    .talk-block {
      padding: 16px;
      background-color: var(--el-color-white);
      box-shadow: var(--el-box-shadow-lighter);
      border-radius: 8px;

      .header {
        width: 100%;

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
            font-size: 13px;
            margin-right: 10px;
          }

          .word {
            font-size: 13px;
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

      .main {
        width: 100%;

        .editor {
          width: 100%;
          min-height: 676px;
        }
      }

      .affix {
        width: 100%;

        .footer {
          width: 100%;
          padding-top: 16px;
          border-top: 1px solid var(--el-border-color);
          background-color: var(--el-color-white);

          .icon-block {
            cursor: pointer;

            .num {
              color: var(--el-text-color-secondary);
            }
          }
        }
      }
    }
  }

  .talk-aside {
    width: 256px;
    margin-left: 10px;
  }
}
</style>