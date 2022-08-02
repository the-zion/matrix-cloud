<template>
  <el-dialog v-model="props.visible" custom-class="column-create" :width="520"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ title }}</el-row>
    <el-form :model="form" ref="formRef" class="form" hide-required-asterisk>
      <el-form-item class="form-item" label="名称" prop="name" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-input v-model="form.name" :maxlength="50" show-word-limit placeholder="请输入专栏名称"/>
      </el-form-item>
      <el-form-item class="form-item" label="描述" prop="introduce" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-input v-model="form.introduce" :maxlength="100" type="textarea" :rows="5" resize="none" show-word-limit
                  placeholder="请输入专栏描述（限100字）"/>
      </el-form-item>
      <el-form-item prop="tags" label="标签" class="form-item" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-popover placement="bottom-start" :width="432" trigger="click" :show-arrow="false">
          <template #reference>
            <el-select
                class="select"
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
      <el-form-item prop="cover" label="封面" class="form-item" :rules="[{
          required: true,
          message: '请上传封面',
          trigger: 'blur',
        }]">
        <el-upload
            class="cover-uploader"
            :show-file-list="false"
            :http-request="imageUpload"
            accept="image/png, image/jpeg, image/jpg"
            :before-upload="beforeCoverUpload"
        >
          <el-image fit="cover" v-if="form.cover" :src="form.cover"
                    class="cover"/>
          <el-space v-else class="cover-uploader-icon" direction="vertical" :size="2">
            <el-icon>
              <Upload/>
            </el-icon>
            <span class="word">上传图片</span>
            <span class="word">JPG/PNG格式图片,大小2MB以内</span>
          </el-space>
          <el-progress v-show="uploading" :duration="10" class="cover-process" :percentage="percentage"
                       :show-text="false"/>
        </el-upload>
      </el-form-item>
      <el-form-item class="form-item" prop="auth" v-if="mode === 'create'">
        <el-radio-group v-model="form.auth" class="radio">
          <el-radio :label="1">
            <span>公开</span>
            <span class="explain">公共可见此专栏</span>
          </el-radio>
          <el-radio :label="2">
            <span>隐私</span>
            <span class="explain">仅自己可见此专栏</span>
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
  name: "ColumnCreate"
}
</script>

<script setup>
import {baseMainStore, userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia";
import {ref} from "vue";
import {error, success, warning} from "../../../utils/message";
import {initCos} from "../../../utils/cos";
import {get, post} from "../../../utils/axios";
import router from "../../../router";

const cos = initCos()
const emits = defineEmits(["update:visible", "createAfter", "editAfter"])
const props = defineProps({
  mode: String,
  visible: Boolean,
  id: Number
})
const baseStore = baseMainStore()
const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)
const {column} = storeToRefs(baseStore)

let draftId = ref()
let mode = ref("")
let sending = ref(false)
let loading = ref(false)
let title = ref("")
let form = ref({})
let formRef = ref()
let uploading = ref(false)
let percentage = ref(0)
let columnParams = {}
let searchParams = {}
let uploadParams = {
  Bucket: column.value.bucket,
  Region: column.value.region,
}

function open() {
  initData()
}

function initData() {
  mode.value = props.mode
  loading.value = false
  draftId.value = props.id
  if (mode.value === 'create') {
    title.value = "新建专栏"
    form.value = {name: "", introduce: "", tags: [], cover: "", auth: 1}
    getLastDraft()
  } else {
    title.value = "编辑专栏"
    getData()
  }
}

function getLastDraft() {
  get("/v1/get/last/column/draft").then(function (reply) {
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

function getData() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("专栏信息获取失败")
    return
  }

  loading.value = true
  let url = column.value.baseUrl + uuid.value + "/" + draftId.value + "/content"
  get(url).then(function (reply) {
    let data = reply.data
    form.value["id"] = data["id"]
    form.value["name"] = data["name"]
    form.value["introduce"] = data["introduce"]
    form.value["cover"] = data["cover"] || ""
    form.value["tags"] = data["tags"] ? data["tags"].split(";") : []
    form.value["auth"] = data["auth"] || 1
  }).catch(function () {
    error("专栏信息获取失败")
  }).then(function () {
    loading.value = false
  })
}

function CreateDraft() {
  post("/v1/create/column/draft", {}).then(function (reply) {
    draftId.value = reply.data.id
    form.value["id"] = reply.data.id
  }).catch(function () {
    error("未知错误，请稍后再试")
  })
}

function imageUpload(UploadRequestOptions) {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("封面上传失败")
    return
  }

  percentage.value = 0
  uploading.value = true
  let file = UploadRequestOptions.file
  let filetype = UploadRequestOptions.file.type.split("/")[1]
  uploadParams["Key"] = column.value.key + uuid.value + "/" + draftId.value + "/cover." + filetype
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
    'Pic-Operations':
        '{"is_pic_info": 1, "rules": [{"fileid": "cover.webp", "rule": "imageMogr2/format/webp/interlace/0/quality/80"}]}'
  }
  uploadParams["Body"] = file
  uploadParams["onProgress"] = function (progressData) {
    percentage.value = progressData.percent * 100
  }
  cos.uploadFile(uploadParams, function (err) {
    uploading.value = false
    if (err) {
      error("封面上传失败，请稍后再试")
      return
    }
    success("封面上传成功")
    form.value.cover = column.value.baseUrl + uuid.value + "/" + draftId.value + "/cover.webp"
  })
}

function beforeCoverUpload(rawFile) {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    error('头像必须是 jpg/jpeg/png 格式的')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    error('图片大小不超过 2MB')
    return false
  }
  return true
}

function commitCheck(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }

  formRef.validate((valid) => {
    if (!valid) {
      error("信息输入有误，请检查")
    } else {
      commit()
      return true
    }
  })
}

function commit() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("专栏创建失败")
    return
  }

  setColumnParams()
  setSearchParams()
  commitIntroduce()
}

function setColumnParams() {
  columnParams["name"] = form.value.name
  columnParams["update"] = new Date().toLocaleDateString()
  columnParams["tags"] = form.value["tags"].join(";")
  columnParams["auth"] = form.value["auth"]
  columnParams["introduce"] = form.value["introduce"]
  columnParams["cover"] = form.value["cover"]
  columnParams["id"] = form.value["id"]
}

function setSearchParams() {
  searchParams["name"] = form.value.name
  searchParams["update"] = new Date().toLocaleDateString()
  searchParams["tags"] = form.value["tags"].join(";")
  searchParams["introduce"] = form.value["introduce"]
  searchParams["cover"] = form.value["cover"]
  searchParams["id"] = form.value["id"]
  searchParams["uuid"] = uuid.value
}

function commitIntroduce() {
  sending.value = true
  uploadParams["Key"] = column.value.key + uuid.value + "/" + draftId.value + "/introduce" + (mode.value === 'edit' ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
  }
  uploadParams["Body"] = JSON.stringify(columnParams)
  cos.uploadFile(uploadParams, function (err) {
    if (err) {
      error("专栏发布失败")
      sending.value = false
      return
    }
    commitSearch()
  })
}

function commitSearch() {
  sending.value = true
  uploadParams["Key"] = column.value.key + uuid.value + "/" + draftId.value + "/search"
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
  }
  uploadParams["Body"] = JSON.stringify(searchParams)
  cos.uploadFile(uploadParams, function (err) {
    if (err) {
      error("专栏发布失败")
      sending.value = false
      return
    }
    commitColumn()
  })
}

function commitColumn() {
  uploadParams["Key"] = column.value.key + uuid.value + "/" + draftId.value + "/content" + (mode.value === 'edit' ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-uuid': uuid.value,
    'x-cos-meta-id': draftId.value + "",
    'x-cos-meta-auth': columnParams.auth
  }
  uploadParams["Body"] = JSON.stringify(columnParams)
  cos.uploadFile(uploadParams, function (err) {
    if (err) {
      error("专栏发布失败")
      sending.value = false
      return
    }
    mode.value === 'create' && sendColumn()
    mode.value === 'edit' && editColumn()
  })
}

function sendColumn() {
  post("/v1/send/column", {id: draftId.value}).then(function () {
    success("专栏新建成功，等待审核")
    close()
  }).catch(function (err) {
    error("专栏新建失败")
  }).then(function () {
    sending.value = false
  })
}

function editColumn() {
  post("/v1/send/column/edit", {id: draftId.value}).then(function () {
    success("专栏编辑成功，等待审核")
    close()
  }).catch(function (err) {
    error("专栏编辑失败")
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
.column-create {
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: #252933;
    margin-bottom: 28px;
  }

  .form {
    .form-item {
      .select {
        width: 100%;
      }

      .cover-uploader {
        ::v-deep(.el-upload) {
          display: flex;
          flex-direction: column;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }

        .cover {
          width: 240px;
          height: 148px;
        }

        .cover-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 240px;
          height: 148px;
          text-align: center;
          justify-content: center;
          background-color: var(--el-color-info-light-9);

          .word {
            width: 170px;
            font-size: 12px;
            line-height: 20px;
            color: #999;
            margin-bottom: 6px;
          }
        }

        .cover-process {
          width: 240px;
        }
      }

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
}
</style>