<template>
  <el-container class="talk-container">
    <el-backtop></el-backtop>
    <el-row class="talk-main">
      <el-row class="talk-block">
        <el-row class="header">
          <el-row class="title-area" justify="space-between">
            <el-row class="title" align="top">
              <el-avatar :size="32" :src="data.image" class="avatar" @click="goToPage('user', 1)"></el-avatar>
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
        <el-affix position="bottom" :offset="16" class="affix" @change="affixChange">
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
            <el-row class="reply" @click="comment">
              <el-icon class="icon" :size="20" color="var(--el-text-color-placeholder)">
                <EditPen/>
              </el-icon>
              <span class="word">添加回复</span>
            </el-row>
          </el-row>
        </el-affix>
        <el-row class="reply-block" v-if="visible" id="reply-block">
          <matrix-reply></matrix-reply>
        </el-row>
      </el-row>
      <el-row class="statistic-block" justify="space-between" align="middle">
        <span class="word">{{ "共" + data.comment + "个回复" }}</span>
        <el-select class="select" v-model="select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-row>
      <el-row class="comment-block">
        <matrix-comment shape="card"></matrix-comment>
      </el-row>
    </el-row>
    <el-affix>
      <el-row class="talk-aside">
        <Aside :data="data"></Aside>
      </el-row>
    </el-affix>
  </el-container>
</template>

<script setup>
import {ref, onBeforeUnmount, shallowRef, onMounted} from "vue"
import {Editor} from '@wangeditor/editor-for-vue'
import Aside from "./component/aside.vue"
import {goToPage} from "../../utils/globalFunc"
import {scrollTo} from "../../utils/scroll";

const editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')
const mode = ref('default')
const editorConfig = {
  scroll: false,
  readOnly: true
}

let affix = ref(false)
let visible = ref(false)
let select = ref("hot")

let data = ref({
  cover: "../../../../src/assets/images/cover.jpg",
  image: "../../../../src/assets/images/boy.png",
  title: "某科学的龙傲天dp分析法",
  name: "刘小圆sama",
  time: "发布于 2022-05-21",
  view: 2000,
  collect: 2000,
  comment: 2000,
  agree: 2000,
  tags: ["Go", "kubernetes", "云原生", "Go", "kubernetes", "云原生"]
})
let options = ref([
  {
    label: "最热",
    value: "hot"
  },
  {
    label: "最新",
    value: "new"
  }
])

function handleCreated(editor) {
  editorRef.value = editor
}

function affixChange(value) {
  affix.value = value
}

function comment() {
  visible.value = !visible.value
  if (affix.value) {
    setTimeout(function () {
      scrollTo("reply-block")
    }, 50)
  }
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
    width: 734px;

    .talk-block {
      padding: 16px;
      margin-bottom: 10px;
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
              cursor: pointer;
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

        .reply {
          .icon {
            margin-right: 5px;
          }

          .word {
            font-size: 14px;
            color: var(--el-text-color-secondary);
            cursor: pointer;
          }
        }
      }

      .reply-block {
        width: 100%;
        padding: 16px 0;
      }
    }

    .statistic-block {
      width: 100%;
      border-radius: 8px;
      box-shadow: var(--el-box-shadow-lighter);
      background-color: var(--el-color-white);
      margin-bottom: 10px;
      padding: 10px 15px;

      .word {
        font-size: 12px;
        color: var(--el-text-color-disabled)
      }

      .select {
        width: 75px;

        ::v-deep(.el-input__wrapper) {
          box-shadow: unset !important;
          height: 20px;
        }
      }
    }

    .comment-block {
      width: 100%;
    }
  }

  .talk-aside {
    width: 256px;
    margin-left: 10px;
    height: fit-content;
  }
}
</style>