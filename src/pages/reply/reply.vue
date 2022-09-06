<template>
  <el-row class="reply">
    <el-row class="reply-editor">
      <Editor
          class="editor"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="'default'"
          @onCreated="handleCreated"
      />
    </el-row>
    <el-row class="reply-toolbar" align="middle" justify="space-between">
      <Toolbar
          class="toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="'default'"
      />
      <el-button class="button" type="primary" size="small" :loading="sending" @click="commit">评论</el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixReply"
}
</script>

<script setup>
import {onBeforeUnmount, ref, shallowRef, onBeforeMount} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {get, post} from "../../utils/axios";
import {success, error, warning} from "../../utils/message";
import {initCos} from "../../utils/cos";
import {baseMainStore, userMainStore} from "../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

const editorRef = shallowRef()
const valueHtml = ref('')
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
const props = defineProps({
  creationId: Number,
  creationType: Number,
  mode: {
    type: String,
    default: "comment"
  },
  rootId: Number,
  parentId: {
    type: Number,
    default: 0
  }
})
const cos = initCos()
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {comment} = storeToRefs(baseStore)

let draftId = ref()
let sending = ref(false)
let creationId = null
let creationType = null
let rootId = null
let parentId = null
let mode = null
let token = null
let commentParams = {}
let uploadParams = {
  Bucket: comment.value.bucket,
  Region: comment.value.region,
}

function handleCreated(editor) {
  editorRef.value = editor
}

function init() {
  initData()
  getLastDraft()
}

function initData() {
  creationId = props.creationId
  creationType = props.creationType
  rootId = props.rootId
  parentId = props.parentId
  mode = props.mode
  token = localStorage.getItem("matrix-token")
}

function getLastDraft() {
  get("/v1/get/last/comment/draft").then(function (reply) {
    if (reply.data.status !== 1) {
      CreateDraft()
    } else {
      draftId.value = reply.data.id
    }
  }).catch(function (err) {
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "RECORD_NOT_FOUND":
          CreateDraft()
          return
      }
    }
  })
}

function CreateDraft() {
  post("/v1/create/comment/draft", {}).then(function (reply) {
    draftId.value = reply.data.id
  })
}

function commit() {
  if (!uuid.value && !token) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("评论发布失败")
    return
  }

  if (mode === 'comment' && (!creationId || !creationType)) {
    error("评论发布失败")
    return
  }

  if (mode === 'sub_comment' && (!rootId)) {
    error("评论发布失败")
    return
  }

  if (editorRef.value.getText().length === 0) {
    error("评论内容不能为空白")
    return
  }

  setCommentParams()
  commitContent()
}

function setCommentParams() {
  commentParams["html"] = editorRef.value.getHtml()
  commentParams["update"] = new Date().toLocaleDateString()
  commentParams["id"] = draftId.value
}

function commitContent() {
  sending.value = true
  uploadParams["Key"] = comment.value.key + uuid.value + "/" + draftId.value + "/content"
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
    'x-cos-meta-id': draftId.value + ""
  }
  if (mode === 'comment') {
    uploadParams["Headers"]['x-cos-meta-creationId'] = creationId
    uploadParams["Headers"]['x-cos-meta-creationType'] = creationType
  }

  if (mode === 'sub_comment') {
    uploadParams["Headers"]['x-cos-meta-rootId'] = rootId
    uploadParams["Headers"]['x-cos-meta-parentId'] = parentId
  }

  uploadParams["Body"] = JSON.stringify(commentParams)
  cos.uploadFile(uploadParams, function (err) {
    if (err) {
      error("评论发布失败")
      return
    }
    sendComment()
  })
}

function sendComment() {
  post(mode === "comment" ? "/v1/send/comment" : "/v1/send/subcomment", {id: draftId.value}).then(function () {
    success('评论已提交审核，审核通过即发布到评论区中')
    draftId.value = null
    getLastDraft()
    editorRef.value.clear()
  }).catch(function (err) {
    error("评论发布失败")
  }).then(function () {
    sending.value = false
  })
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onBeforeMount(function () {
  init()
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