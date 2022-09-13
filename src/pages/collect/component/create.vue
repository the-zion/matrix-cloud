<template>
  <el-dialog v-model="props.visible" custom-class="collections-create" :width="520"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ title }}</el-row>
    <el-form :model="form" ref="formRef" class="form" hide-required-asterisk>
      <el-form-item class="form-item" label="名称" prop="name" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-input v-model="form.name" :maxlength="50" show-word-limit placeholder="请输入收藏集名称"/>
      </el-form-item>
      <el-form-item class="form-item" label="描述" prop="introduce" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-input v-model="form.introduce" :maxlength="100" type="textarea" :rows="8" resize="none" show-word-limit
                  placeholder="请输入收藏描述（限100字）"/>
      </el-form-item>
      <el-form-item class="form-item" prop="auth" v-if="mode === 'create'">
        <el-radio-group v-model="form.auth" class="radio">
          <el-radio :label="1">
            <span>公开</span>
            <span class="explain">公共可见此收藏集</span>
          </el-radio>
          <el-radio :label="2">
            <span>隐私</span>
            <span class="explain">仅自己可见此收藏集</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="commitCheck(formRef)" :loading="sending">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "CollectionsCreate"
}
</script>

<script setup>
import {ref} from "vue"
import {get, post} from "../../../utils/axios";
import {error, success, warning} from "../../../utils/message";
import {baseMainStore, userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia";

const emits = defineEmits(["update:visible", "createAfter", "editAfter"])
const props = defineProps({
  mode: String,
  visible: Boolean,
  id: Number
})
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {avatar, collections} = storeToRefs(baseStore)

let draftId = ref()
let mode = ref("")
let sending = ref(false)
let title = ref("")
let form = ref({})
let formRef = ref()
let collectionsParams = {}
let token = null
let uploadParams = {
  Bucket: collections.value.bucket,
  Region: collections.value.region,
}

function open() {
  initData()
}

function initData() {
  mode.value = props.mode
  sending.value = false
  draftId.value = props.id
  token = localStorage.getItem("matrix-token")
  if (mode.value === 'create') {
    title.value = "新建收藏集"
    form.value = {name: "", introduce: "", auth: 1}
    getLastDraft()
  } else {
    title.value = "编辑收藏集"
    getDataEdit()
  }
}

function getLastDraft() {
  get("/v1/get/last/collections/draft").then(function (reply) {
    draftId.value = reply.data.id
    form.value["id"] = reply.data.id
  }).catch(function (err) {
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "RECORD_NOT_FOUND":
          CreateDraft()
          return
      }
    }
    error("未知错误，请稍后再试")
  })
}

function CreateDraft() {
  post("/v1/create/collections/draft", {}).then(function (reply) {
    draftId.value = reply.data.id
    form.value["id"] = reply.data.id
  }).catch(function () {
    error("未知错误，请稍后再试")
  })
}

function getData() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("收藏集信息获取失败")
    return
  }

  let url = collections.value.baseUrl + uuid.value + "/" + draftId.value + "/content"
  get(url).then(function (reply) {
    let data = reply.data
    form.value["id"] = data["id"]
    form.value["name"] = data["name"]
    form.value["introduce"] = data["introduce"]
    form.value["auth"] = data["auth"] || 1
  }).catch(function () {
    error("收藏集信息获取失败")
  })
}

function getDataEdit() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("收藏集信息获取失败")
    return
  }

  let url = collections.value.baseUrl + uuid.value + "/" + draftId.value + "/content-edit"
  get(url).then(function (reply) {
    let data = reply.data
    form.value["id"] = data["id"]
    form.value["name"] = data["name"]
    form.value["introduce"] = data["introduce"]
    form.value["auth"] = data["auth"] || 1
  }).catch(function () {
    getData()
  })
}

function commitCheck(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("表单输入有误，请检查")
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
    error("专栏创建失败")
    return
  }

  setCollectionsParams()
  commitCollections()
}

function setCollectionsParams() {
  collectionsParams["name"] = form.value.name
  collectionsParams["update"] = new Date().toLocaleDateString()
  collectionsParams["auth"] = form.value["auth"]
  collectionsParams["introduce"] = form.value["introduce"]
  collectionsParams["id"] = form.value["id"]
}

function commitCollections() {
  sending.value = true
  uploadParams["Key"] = collections.value.key + uuid.value + "/" + draftId.value + "/content" + (mode.value === 'edit' ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
    'x-cos-meta-id': draftId.value + "",
    'x-cos-meta-auth': collectionsParams.auth,
    'x-cos-meta-title': encodeURIComponent(form.value.name),
    'x-cos-meta-kind': mode.value,
  }
  uploadParams["Body"] = JSON.stringify(collectionsParams)
  cos.value.uploadFile(uploadParams, function (err) {
    if (err) {
      error("收藏集创建失败")
      sending.value = false
      return
    }
    mode.value === 'create' && sendCollections()
    mode.value === 'edit' && editCollections()
  })
}

function sendCollections() {
  post("/v1/send/collections", {id: draftId.value}).then(function () {
    success("收藏集新建成功，等待审核")
    close()
  }).catch(function (err) {
    error("收藏集新建失败")
  }).then(function () {
    sending.value = false
  })
}

function editCollections() {
  post("/v1/send/collections/edit", {id: draftId.value}).then(function () {
    success("收藏集编辑成功，等待审核")
    close()
  }).catch(function () {
    error("收藏集编辑失败")
  }).then(function () {
    sending.value = false
  })
}

function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}
</script>

<style scoped lang="scss">
.collections-create {
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: #252933;
    margin-bottom: 28px;
  }

  .form-item {
    .radio {
      flex-direction: column;
      align-items: start;

      .explain {
        margin-left: 10px;
        font-size: 13px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>