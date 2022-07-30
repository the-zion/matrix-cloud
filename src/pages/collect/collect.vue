<template>
  <el-container class="collect-container">
    <el-backtop></el-backtop>
    <el-row class="header">
      <el-image :src="backgroundUrl" class="image" fit="cover">
        <template #error>
          <el-image class="image" :src="'../../src/assets/images/sea.webp'" fit="cover"></el-image>
        </template>
      </el-image>
      <el-row class="block">
        <el-row class="body">
          <el-row justify="start" class="title">{{ collectionProfile["name"] }}</el-row>
          <el-row justify="start" class="introduce">{{ collectionProfile["introduce"] }}</el-row>
          <el-row justify="space-between" class="user">
            <el-row class="card" align="middle">
              <el-avatar class="avatar" :size="32" icon="UserFilled"
                         :src="avatar.baseUrl + userId + '/avatar.webp'"></el-avatar>
              <el-row class="info">
                <el-row class="name">{{ userProfile["username"] }}</el-row>
                <el-row class="word" @click="moreCollect">更多收藏集 ></el-row>
              </el-row>
            </el-row>
          </el-row>
          <el-upload
              v-if="userId === uuid"
              class="background-uploader"
              :show-file-list="false"
              :http-request="backgroundUpload"
              accept="image/png, image/jpeg, image/jpg"
              :before-upload="beforeBackgroundUpload"
          >
            <el-tooltip
                effect="dark"
                content="支持 jpg、png、jpeg 格式大小 2M 以内的图片"
                placement="bottom"
                :hide-after="50"
            >
              <el-row align="middle"
                      style="padding:5px 10px;color:var(--el-color-white); opacity: .8;border: 1px solid var(--el-color-white)">
                <el-icon class="avatar-uploader-icon">
                  <CameraFilled/>
                </el-icon>
                <span style="margin: 0 5px; font-size: 14px;">编辑背景图片</span>
              </el-row>
            </el-tooltip>
          </el-upload>
        </el-row>
      </el-row>
    </el-row>
    <el-progress v-show="uploading" :duration="10" :percentage="percentage"
                 :show-text="false"/>
    <el-row class="area">
      <el-row class="main">
        <el-row class="menu" align="middle">
          <span class="label" :class="{'select': page === 'article'}" @click="pageChange('article')">文章</span>
          <el-divider direction="vertical"></el-divider>
          <span class="label" :class="{'select': page === 'column'}" @click="pageChange('column')">专栏</span>
          <el-divider direction="vertical"></el-divider>
          <span class="label" :class="{'select': page === 'talk'}" @click="pageChange('talk')">讨论</span>
        </el-row>
        <el-row class="body">
          <article-collect-list v-if="page === 'article'" :userId="userId"></article-collect-list>
          <column-collect-list v-if="page === 'column'" :userId="userId"></column-collect-list>
          <talk-collect-list v-if="page === 'talk'" :userId="userId"></talk-collect-list>
        </el-row>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {get} from "../../utils/axios";
import {useRoute} from "vue-router";
import {initCos} from "../../utils/cos";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onMounted, ref} from "vue"
import {error, success, warning} from "../../utils/message";
import {baseMainStore, userMainStore} from "../../store";
import router from "../../router";
import ArticleCollectList from "../article/component/collect.vue";
import TalkCollectList from "../talk/component/collect.vue";
import ColumnCollectList from "../column/component/collect.vue";

const cos = initCos()
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {collect, avatar} = storeToRefs(baseStore)

let collectionsId = ref()
let userId = ref()
let backgroundUrl = ref("")
let uploading = ref(false)
let percentage = ref(0)
let page = ref("article")
let collectionProfile = ref({
  name: "暂无数据",
  introduce: "暂无数据"
})
let userProfile = ref({
  username: "暂无数据"
})

function init() {
  initData()
  getData()
}

function initData() {
  collectionsId.value = useRoute().query["id"]
}

function getData() {
  if (!collectionsId.value || !uuid.value) {
    return
  }
  getCollection()
}

function getCollection() {
  get("/v1/get/collection?id=" + collectionsId.value + "&uuid=" + uuid.value).then(function (reply) {
    if (!reply.data) {
      return
    }
    let data = reply.data
    userId.value = data.uuid
    collectionProfile.value = data
    backgroundUrl.value = collect.value.baseUrl + userId.value + "/" + collectionsId.value + "/background.webp"
    getUserInfo()
  })
}

function getUserInfo() {
  get("/v1/get/user/info?uuid=" + userId.value).then(function (reply) {
    userProfile.value = reply.data
  })
}


function backgroundUpload(UploadRequestOptions) {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (!collectionsId.value || !userId.value) {
    error("背景上传失败")
    return
  }

  percentage.value = 0
  uploading.value = true
  let file = UploadRequestOptions.file
  let filetype = UploadRequestOptions.file.type.split("/")[1]
  cos.uploadFile({
    Bucket: collect.value.bucket,
    Region: collect.value.region,
    Key: collect.value.key + userId.value + "/" + collectionsId.value + "/background." + filetype,
    Headers: {
      'x-cos-meta-uuid': uuid.value,
      'Pic-Operations':
          '{"is_pic_info": 1, "rules": [{"fileid": "background.webp", "rule": "imageMogr2/format/webp/interlace/0/quality/80"}]}'
    },
    Body: file,
    onProgress: function (progressData) {
      percentage.value = progressData.percent * 100
    }
  }, function (err) {
    uploading.value = false
    if (err) {
      error("背景上传失败，请稍后再试")
      return
    }
    success("背景上传成功")
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      backgroundUrl.value = reader.result;
    };
  })
}

function beforeBackgroundUpload(rawFile) {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    error('图片必须是 jpg/jpeg/png 格式的')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    error('图片大小不超过 2MB')
    return false
  }
  return true
}

function pageChange(m) {
  page.value = m
}

function moreCollect() {
  const {href} = router.resolve({
    name: "user",
    query: {id: userId.value, menu: 'collect'}
  });
  window.open(href, "_blank");
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.collect-container {
  width: 100%;
  flex-direction: column;

  .header {
    width: 100%;
    height: 200px;
    position: relative;

    .image {
      width: 100%;
      height: 100%;
    }

    .block {
      width: 100%;
      height: 100%;
      position: absolute;

      .body {
        margin: auto;
        width: 920px;

        .background-uploader {
          position: absolute;
          right: 0;

          .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
          }
        }

        .title {
          font-size: 24px;
          width: 100%;
          color: var(--el-color-white);
        }

        .introduce {
          width: 100%;
          margin: 12px 0;
          min-height: 22px;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: var(--el-color-white);
          opacity: .8;
          overflow: visible;
          word-break: break-all;
        }

        .card {
          .avatar {
            margin-right: 10px;
          }

          .info {
            flex-direction: column;

            .name {
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              color: var(--el-color-white);
            }

            .word {
              font-size: 12px;
              line-height: 20px;
              color: var(--el-color-white);
              opacity: .8;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .area {
    width: 100%;
    margin: 20px 0;

    .main {
      width: 920px;
      margin: auto;
      background-color: var(--el-color-white);
      border: 1px solid var(--el-border-color-lighter);

      .menu {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid var(--el-border-color-lighter);

        .label {
          font-size: 15px;
          color: var(--el-text-color-secondary);
          cursor: pointer;
          margin: 8px 0;
        }

        .select {
          color: var(--el-color-primary);
        }
      }

      .body {
        width: 100%;
      }
    }
  }
}
</style>