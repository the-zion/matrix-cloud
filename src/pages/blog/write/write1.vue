<template>
  <el-container class="write-container" id="write-container">
    <!--    <el-button @click="click">click</el-button>-->
    <cube-dialog :visible="visible" :define="dialogDefine"></cube-dialog>
    <el-header class="write-header">
      <el-row align="middle" justify="space-between" class="header-block">
        <Toolbar
            :editorId="editorId"
            :defaultConfig="toolbarConfig"
            :editor="editorRef"
            class="toolbar"
        />
        <el-row class="button">
          <el-tooltip
              class="box-item"
              effect="dark"
              content="随手保存，养成好习惯"
              placement="bottom-end"
          >
            <el-button type="primary" size="default" icon="message-box" @click="save">保存</el-button>
          </el-tooltip>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="点击发送"
              placement="bottom-end"
          >
            <el-button type="primary" size="default" icon="promotion" @click="send">发送</el-button>
          </el-tooltip>
        </el-row>
      </el-row>
    </el-header>
    <el-main class="write-main">
      <!--      <el-backtop target=".write-main" ref="backTop" :right="backTopRight"></el-backtop>-->
      <el-row class="edit-container">
        <el-space fill class="body">
          <el-row class="title-container">
            <input placeholder="请输入标题" class="title-input">
          </el-row>
          <Editor
              id="edit-container"
              :defaultConfig="editorConfig"
              v-model="valueHtml"
              @onCreated="handleCreated"
              class="editor-container"
          />
        </el-space>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import router from "../../../router";
import {ElMessageBox, ElMessage} from 'element-plus'
import {initData} from "./initData";
import {controller} from "./controller";
import {scrollTo} from "../../../utils/scroll";

let editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  const e = editorRef.value
  const node = { type: 'paragraph', children: [{ text: 'simple text' }] }
  e.insertNode(node)
}

let oldHeight = null

const {
  input,
  routerJumpConfirm,
  editorId,
  defaultHtml,
  toolbarConfig,
  editorConfig,
  visible,
  dialogDefine,
  backTopRight
} = initData()

const {save, send} = controller(visible, dialogDefine)

function click() {
  const editor = getEditor(editorId)
  const toolbar = DomEditor.getToolbar(editor)
  console.log(toolbar.getConfig().toolbarKeys)
}

onBeforeUnmount(() => {
  const editor = getEditor(editorId)
  if (editor == null) return

  editor.destroy()
  removeEditor(editorId)
})

var callback = function (mutations, observer) {
  console.log(mutations)
  // mutations.forEach(function (mutation) {
  //   console.log(mutation);
  // });
}

var mo = new MutationObserver(callback);
var element = null

router.beforeEach(function (to, from) {
  console.log(element.clientHeight)
  console.log(mo.takeRecords())

  if (routerJumpConfirm.value) {
    return true
  } else {
    ElMessageBox.confirm(
        '是否保存草稿？（如果已保存请忽略）',
        '页面正在跳转...',
        {
          confirmButtonText: '现在保存',
          cancelButtonText: '我已保存',
          type: 'warning',
        }
    ).then(() => {
      ElMessage({
        type: 'success',
        message: '保存成功',
      })
      routerJumpConfirm.value = true
      router.push({name: to.name})
    }).catch(() => {
      routerJumpConfirm.value = true
      router.push({name: to.name})
    })
  }
  return false
})

onMounted(() => {


  // element = document.getElementById("edit-container")
  // element = document.body
  //
  // var options = {
  //   attributes: true,
  //   attributeOldValue: true,
  // }
  //
  // mo.observe(element, options);

  const ro = new ResizeObserver(res => {
    if(!oldHeight){
      oldHeight = res[0].contentRect.height
    }
    let newHeight = res[0].contentRect.height
    scrollTo(window.scrollY + newHeight - oldHeight)
    oldHeight = newHeight
  })

  ro.observe(document.getElementById("edit-container"));

})
</script>
<style scoped lang="scss">

.write-container {
  height: 100%;

  .write-header {
    padding: unset;
    height: fit-content;
    border-bottom: 1px solid var(--el-border-color-base);

    .header-block {
      height: 50px;

      .toolbar {
        flex-grow: 1;

        ::v-deep(.w-e-toolbar) {
          justify-content: space-between;
        }
      }

      .button {
        margin: 0 10px;
      }
    }
  }

  .write-main {
    background: rgb(245, 245, 245);

    .edit-container {
      width: 780px;
      //min-height: 1070px;
      background: #FFFFFF;
      margin: 20px auto;
      padding: 20px 50px 50px 50px;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);

      .body {
        width: 100%;
        height: fit-content;

        .title-container {
          padding: 20px 0;
          border-bottom: 1px solid #e8e8e8;

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

        .editor-container {
          width: 100%;
          //height: 300px !important;
          //overflow-y: hidden;
          //min-height: 900px;

          ::v-deep(.w-e-text-placeholder) {
            font-style: unset;
          }
        }
      }
    }
  }
}
</style>