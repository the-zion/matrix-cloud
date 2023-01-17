<template>
  <el-row class="column-form">
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
      <el-form-item prop="cover" label="文章封面" class="form-item">
        <el-upload
            class="cover-uploader"
            :show-file-list="false"
            :http-request="imageUpload"
            accept="image/png, image/jpeg, image/jpg"
            :before-upload="beforeCoverUpload"
        >
          <el-image fit="cover" v-if="form.cover" :src="form.cover" class="cover"/>
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
      <el-form-item prop="text" label="文章摘要" class="form-item">
        <el-input placeholder="摘要（选填）：会在卡片、列表等场景外露，帮助读者快速了解内容，如不填写则默认抓取正文前256字符"
                  maxlength="300" show-word-limit
                  v-model="form.text" type="textarea" resize="none" :rows="5"></el-input>
      </el-form-item>
      <el-form-item v-if="mode === 'create'" prop="auth" label="创建方式" class="form-item">
        <el-radio-group v-model="form.auth">
          <el-radio class="radio" v-for="item in authRadio" :label="item.id">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="source" label="文章来源" class="form-item">
        <el-radio-group v-model="form.source">
          <el-radio class="radio" v-for="item in sourceRadio" :label="item.id">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.source === 2" prop="url" label="转载地址" class="form-item" :rules="[{
          type: 'url',
          message: '网址格式错误',
          trigger: ['blur'],
        },{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-input v-model="form.url" type="text" :maxlength="100" show-word-limit
                  placeholder="请输入文章转载地址" size="large">
        </el-input>
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
import {error, success, warning} from "../../../utils/message";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {get, post} from "../../../utils/axios";
import router from "../../../router";
import {charFilter, textEmojiRemove} from "../../../utils/globalFunc";

const props = defineProps({
  mode: String,
  title: String,
  id: Number,
  editor: Object
})

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {article} = storeToRefs(baseStore)

let title = ref()
let editor = ref()
let draftId = ref()
let mode = ref()
let uploading = ref(false)
let sending = ref(false)
let percentage = ref(0)
let articleParams = {}
let introduce = {}
let search = {}
let date = ""
let token = null
let uploadParams = {
  Bucket: article.value.bucket,
  Region: article.value.region,
}

let form = ref({
  source: 1,
  auth: 1,
  text: "",
  html: "",
  cover: "",
  tags: [],
  column: 0
})

let formRef = ref()
let authRadio = [{
  id: 1,
  label: "公开"
}, {
  id: 2,
  label: "私密"
}]
let sourceRadio = [{
  id: 1,
  label: "原创"
}, {
  id: 2,
  label: "转载"
}]

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
  if (!uuid.value && !token) {
    warning("账号未登录，请先登录")
    return
  }

  if (!draftId.value) {
    error("文章发布失败")
    return
  }

  if (editor.value.getText().length === 0) {
    error("文章内容不能为空白")
    return
  }

  setArticleParams()
  setIntroduceParams()
  setSearchParams()
  commitIntroduce()
}

function commitIntroduce() {
  sending.value = true
  uploadParams["Key"] = article.value.key + uuid.value + "/" + draftId.value + "/introduce" + (mode.value === 'edit' ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
  }
  uploadParams["Body"] = JSON.stringify(introduce)
  cos.value.uploadFile(uploadParams, function (err) {
    if (err) {
      error("文章发布失败")
      return
    }
    commitSearch()
  })
}

function commitSearch() {
  uploadParams["Key"] = article.value.key + uuid.value + "/" + draftId.value + "/search"
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
  }
  uploadParams["Body"] = JSON.stringify(search)
  cos.value.uploadFile(uploadParams, function (err) {
    if (err) {
      error("文章发布失败")
      return
    }
    commitArticle()
  })
}

function commitArticle() {
  uploadParams["Key"] = article.value.key + uuid.value + "/" + draftId.value + "/content" + (mode.value === 'edit' ? "-edit" : "")
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
    'x-cos-meta-id': draftId.value + "",
    'x-cos-meta-auth': articleParams.auth,
    'x-cos-meta-title': encodeURIComponent(title.value),
    'x-cos-meta-kind': mode.value,
  }
  uploadParams["Body"] = JSON.stringify(articleParams)
  cos.value.uploadFile(uploadParams, function (err) {
    if (err) {
      error("文章发布失败")
      return
    }
    mode.value === 'create' && sendArticle()
    mode.value === 'edit' && editArticle()
  })
}

function sendArticle() {
  post("/v1/send/article", {id: draftId.value}).then(function () {
    router.push({name: "result", query: {type: "success", title: '文章已提交审核', description: "审核通过即发布到社区中"}})
  }).catch(function (err) {
    error("文章发布失败")
  }).then(function () {
    sending.value = false
  })
}

function editArticle() {
  post("/v1/send/article/edit", {id: draftId.value}).then(function () {
    router.push({name: "result", query: {type: "success", title: '文章已提交审核', description: "审核通过即发布到社区中"}})
  }).catch(function (err) {
    error("文章编辑失败")
  }).then(function () {
    sending.value = false
  })
}

function setArticleParams() {
  date = new Date()
  articleParams["title"] = charFilter(title.value)
  articleParams["html"] = editor.value.getHtml()
  articleParams["update"] = date.toLocaleDateString()
  articleParams["tags"] = charFilter(form.value["tags"].join(";"))
  articleParams["auth"] = form.value["auth"]
  articleParams["source"] = form.value["source"]
  articleParams["url"] = form.value["url"]
  articleParams["id"] = form.value["id"]
  if (form.value.text === "") {
    articleParams["text"] = editor.value.getText().slice(0, 256)
  } else {
    articleParams["text"] = form.value.text
  }
}

function setIntroduceParams() {
  introduce["id"] = articleParams["id"]
  introduce["title"] = charFilter(articleParams["title"])
  introduce["text"] = charFilter(articleParams["text"])
  introduce["update"] = articleParams["update"]
  introduce["tags"] = charFilter(articleParams["tags"])
  introduce["cover"] = articleParams["cover"]
}

function setSearchParams() {
  search["uuid"] = uuid.value
  search["title"] = charFilter(textEmojiRemove(articleParams["title"]))
  search["text"] = charFilter(textEmojiRemove(editor.value.getText()))
  search["update"] = articleParams["update"]
  search["tags"] = charFilter(textEmojiRemove(articleParams["tags"]))
  search["cover"] = articleParams["cover"]
  console.log(editor.value.getText())
  console.log(search["text"])
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
  token = localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
}

function getData() {
  if (!uuid.value) {
    return
  }

  if (!draftId.value) {
    return
  }

  let url = article.value.baseUrl + uuid.value + "/" + draftId.value + "/content"
  get(url).then(function (reply) {
    let data = reply.data
    form.value.id = data["id"]
    form.value.cover = data["cover"] || ""
    form.value.auth = data["auth"] || 1
    form.value.source = data["source"] || 1
    form.value.text = data["text"] || ""
    form.value.url = data["url"] || ""
    form.value.tags = data["tags"] ? data["tags"].split(";") : []
    articleParams["cover"] = data["cover"] || ""
  }).catch(function () {
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
  uploadParams["Key"] = article.value.key + uuid.value + "/" + draftId.value + "/cover." + filetype
  uploadParams["Headers"] = {
    'x-cos-meta-token': token,
    'x-cos-meta-id': draftId.value,
    'x-cos-meta-kind': "cover",
    'Pic-Operations':
        '{"is_pic_info": 1, "rules": [{"fileid": "cover.webp", "rule": "imageMogr2/format/webp/interlace/0/quality/80"}]}'
  }
  uploadParams["Body"] = file
  uploadParams["onProgress"] = function (progressData) {
    percentage.value = progressData.percent * 100
  }
  cos.value.uploadFile(uploadParams, function (err) {
    uploading.value = false
    if (err) {
      error("封面上传失败，请稍后再试")
      return
    }
    success("封面上传成功")
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      form.value.cover = reader.result;
    };
    articleParams["cover"] = article.value.baseUrl + uuid.value + "/" + draftId.value + "/cover.webp"
  })
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.column-form {
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
          background-color: var(--el-color-white);

          .word {
            width: 170px;
            font-size: 12px;
            line-height: 20px;
            color: #999;
            margin-bottom: 6px;
          }
        }

        .cover-process {
          margin-top: 10px;
          width: 240px;
        }
      }
    }
  }

  .button {
    width: 100%;
  }
}
</style>