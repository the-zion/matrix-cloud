<template>
  <el-row class="talk-form">
    <el-form :model="form" class="form" ref="formRef" label-position="top">
      <el-form-item prop="tags" label="文章标签" class="form-item" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-popover placement="bottom-start" :width="432" trigger="click" :show-arrow="false">
          <template #reference>
            <el-select
                class="select"
                size="large"
                v-model="form.tags"
                popper-class="tags-dropdown-select"
                multiple
                placeholder="请选择标签"
            >
            </el-select>
          </template>
          <matrix-tag v-model:selectedTags="form.tags"></matrix-tag>
        </el-popover>
      </el-form-item>
      <el-form-item v-if="mode === 'create'" prop="auth" label="创建方式" class="form-item">
        <el-radio-group v-model="form.auth">
          <el-radio class="radio" v-for="item in authRadio" :label="item.id">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button :loading="sending" class="button" type="primary" size="large" @click="commitCheck(formRef)">发布
    </el-button>
  </el-row>
</template>

<script>
export default {
  name: "Form"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {error, warning} from "../../../utils/message";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {get, post} from "../../../utils/axios";
import router from "../../../router";
import {textEmojiRemove} from "../../../utils/globalFunc";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {talk} = storeToRefs(baseStore)
const props = defineProps({
  mode: String,
  title: String,
  id: Number,
  editor: Object
})

let title = ref()
let editor = ref()
let draftId = ref()
let mode = ref()
let form = ref({
  auth: 1,
  text: "",
  tags: [],
})
let formRef = ref()
let sending = ref(false)
let talkParams = {}
let introduce = {}
let authRadio = [{
  id: 1,
  label: "公开"
}, {
  id: 2,
  label: "私密"
}]
let uploadParams = {
  Bucket: talk.value.bucket,
  Region: talk.value.region,
}

let search = {}
let token = null

function commitCheck(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }

  formRef.validate((valid, b) => {
    if (!valid) {
      error("信息输入有误，请检查")
    } else {
      commit()
      return true
    }
  })
}

function commit() {
  if (!uuid.value && !token) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("讨论发布失败")
    return
  }

  if (editor.value.getText().length === 0) {
    error("内容不能为空白")
    return
  }

  setTalkParams()
  setIntroduceParams()
  setSearchParams()
  commitIntroduce()
}

function setTalkParams() {
  let image = editor.value.getElemsByType('image')[0]
  talkParams["title"] = title.value
  talkParams["html"] = editor.value.getHtml()
  talkParams["update"] = new Date().toLocaleDateString()
  talkParams["tags"] = form.value["tags"].join(";")
  talkParams["auth"] = form.value["auth"]
  talkParams["id"] = form.value["id"]
  talkParams["text"] = editor.value.getText().slice(0, 256)
  talkParams["cover"] = image && image["src"] || ""
}

function setIntroduceParams() {
  introduce["id"] = talkParams["id"]
  introduce["title"] = talkParams["title"]
  introduce["text"] = talkParams["text"]
  introduce["update"] = talkParams["update"]
  introduce["tags"] = talkParams["tags"]
  introduce["cover"] = talkParams["cover"]
}

function setSearchParams() {
  search["uuid"] = uuid.value
  search["title"] = textEmojiRemove(talkParams["title"])
  search["text"] = textEmojiRemove(editor.value.getText())
  search["update"] = talkParams["update"]
  search["tags"] = talkParams["tags"]
  search["cover"] = talkParams["cover"]
}

function commitIntroduce() {
  sending.value = true
  uploadParams["Key"] = talk.value.key + uuid.value + "/" + draftId.value + "/introduce" + (mode.value === 'edit' ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
  }
  uploadParams["Body"] = JSON.stringify(introduce)
  cos.value.uploadFile(uploadParams, function (err) {
    if (err) {
      error("讨论发布失败")
      return
    }
    commitSearch()
  })
}

function commitSearch() {
  uploadParams["Key"] = talk.value.key + uuid.value + "/" + draftId.value + "/search"
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
  }
  uploadParams["Body"] = JSON.stringify(search)
  cos.value.uploadFile(uploadParams, function (err) {
    if (err) {
      error("讨论发布失败")
      return
    }
    commitTalk()
  })
}

function commitTalk() {
  uploadParams["Key"] = talk.value.key + uuid.value + "/" + draftId.value + "/content" + (mode.value === 'edit' ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
    'x-cos-meta-id': draftId.value + "",
    'x-cos-meta-auth': talkParams.auth,
    'x-cos-meta-title': encodeURIComponent(title.value),
    'x-cos-meta-kind': mode.value,
  }
  uploadParams["Body"] = JSON.stringify(talkParams)
  cos.value.uploadFile(uploadParams, function (err) {
    if (err) {
      error("讨论发布失败")
      return
    }
    mode.value === 'create' && sendTalk()
    mode.value === 'edit' && editTalk()
  })
}

function sendTalk() {
  post("/v1/send/talk", {id: draftId.value}).then(function () {
    router.push({name: "result", query: {type: "success", title: '讨论已提交审核', description: "审核通过即发布到社区中"}})
  }).catch(function (err) {
    error("讨论发布失败")
  }).then(function () {
    sending.value = false
  })
}

function editTalk() {
  post("/v1/send/talk/edit", {id: draftId.value}).then(function () {
    router.push({name: "result", query: {type: "success", title: '讨论已提交审核', description: "审核通过即发布到社区中"}})
  }).catch(function (err) {
    error("讨论编辑失败")
  }).then(function () {
    sending.value = false
  })
}

function init() {
  initData()
  getData()
}

function initData() {
  title.value = props.title
  editor.value = props.editor
  draftId.value = props.id
  mode.value = props.mode
  token = localStorage.getItem("matrix-token")
}

function getData() {
  if (!uuid.value) {
    return
  }

  if (!draftId.value) {
    return
  }

  let url = talk.value.baseUrl + uuid.value + "/" + draftId.value + "/content"
  get(url).then(function (reply) {
    let data = reply.data
    form.value.id = data["id"]
    form.value.cover = data["cover"] || ""
    form.value.auth = data["auth"] || 1
    form.value.text = data["text"] || ""
    form.value.tags = data["tags"] ? data["tags"].split(";") : []
    talkParams["cover"] = data["cover"] || ""
  }).catch(function () {
  })
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.talk-form {
  width: 100%;

  .form {
    width: 100%;

    .form-item {
      width: 100%;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--el-border-color-light);

      .select {
        width: 100%;
      }

      .radio {
        font-weight: 400;
      }
    }
  }

  .button {
    width: 100%;
  }
}
</style>