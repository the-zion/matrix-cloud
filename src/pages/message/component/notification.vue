<template>
  <el-container class="notification-container">
    <el-row class="head-block" align="middle">
      <span class="label">系统通知</span>
    </el-row>
    <el-row class="notification-block">
      <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
                :image-size="250" :image="noData"
      />
      <el-row class="block" v-for="item in data">
        <el-descriptions>
          <template #title>
            <el-row align="middle">
              <el-avatar class="avatar" :size="32" :src="avatarImage"></el-avatar>
              <span style="margin-left: 10px">系统通知</span>
            </el-row>
          </template>
          <template #extra>
            <span>{{item['createdAt']}}</span>
          </template>
          <el-descriptions-item :width="1000"
                                :label="typeDict[item['notificationType']] + '审核违规'"></el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item label="审核结果" :width="150">
            <el-tag v-if="item.result === 1" type="danger" effect="dark">敏感</el-tag>
            <el-tag v-if="item.result === 2" type="warning" color="orange" effect="dark">疑似敏感</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="结果类型" :width="150">
            <el-tag type="danger" effect="dark">{{ reviewType[item.label] || item.label}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item v-if="item.title" label="标题">{{ item.title }}</el-descriptions-item>
          <el-descriptions-item v-if="item['notificationType'] === 'comment'" label="评论">{{
              item.comment
            }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="descriptions-block">
          <el-descriptions-item :width="1000" label-class-name="descriptions-image-label"
                                class-name="descriptions-image"
                                v-if="(item['notificationType'] === 'avatar' && item['avatarFirst']) || (item['notificationType'] === 'cover' && item['coverFirst']) || item['notificationType'].includes('image')">
            <el-image fit="cover" class="image"
                      :preview-src-list="[item['notificationType'] === 'avatar'?imageAvatarUrl:(item['notificationType'] === 'cover'?imageCoverUrl:item.imageCreationUrl)]"
                      :src="item['notificationType'] === 'avatar'?imageAvatarUrl:(item['notificationType'] === 'cover'?imageCoverUrl:item.imageCreationUrl)"></el-image>
          </el-descriptions-item>
          <el-descriptions-item :width="1000" label="详情"
                                v-if="item['notificationType'].includes('create') || item['notificationType'].includes('edit')">
            <template #label>
              <el-row align="middle">
                <span>详情</span>
                <el-tooltip
                    effect="dark"
                    content="由于'涉政'类型的敏感性，相关违规内容将不予展示"
                    placement="bottom-start"
                    :hide-after="50"
                >
                  <el-icon style="margin-left: 3px" color="var(--el-text-color-regular)">
                    <InfoFilled/>
                  </el-icon>
                </el-tooltip>
              </el-row>
            </template>
            <el-table v-if="item['section'].length" :data="item['section']" border>
              <el-table-column label="分类" prop="kind" min-width="1">
                <template #default="scope">
                  <el-tag type="warning">{{scope.row.kind}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="结果" prop="result" min-width="1">
                <template #default="scope">
                  <el-row>
                    <el-tag v-if="scope.row.result === 1" type="danger" effect="dark">违规</el-tag>
                    <el-tag v-if="scope.row.result === 2" type="warning" effect="dark">疑似违规</el-tag>
                    <span v-else></span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="关键片段" prop="words" min-width="3"/>
            </el-table>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {get, post} from "../../../utils/axios";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia";
import {ReviewTag} from "../../../utils/review";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";
import {getAssets} from "../../../utils/globalFunc";


const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {avatar, cover, article, column, talk} = storeToRefs(baseStore)
const props = defineProps({
  system: Number,
})
const emits = defineEmits(["update:system"])
const noData = getAssets("no_data.svg")
const avatarImage = getAssets("logo.svg")

let loading = ref(true)
let data = ref([])
let list = ref([])
let imageAvatarUrl = ref("")
let imageCoverUrl = ref("")
let currentPage = 1
let isBottom = false
let getDataLock = false
let reviewType = ReviewTag()
let typeDict = {
  "avatar": "头像上传",
  "cover": "个人背景图片",
  "article-image-cover": "文章封面图片",
  "article-image-content": "文章正文图片",
  "article-create": "文章正文",
  "article-edit": "文章编辑",
  "column-image-cover": "专栏封面图片",
  "column-create": "专栏简介",
  "column-edit": "专栏编辑",
  "talk-image-content": "讨论正文图片",
  "talk-create": "讨论正文",
  "talk-edit": "讨论编辑",
  "collections-create": "收藏集简介",
  "collections-edit": "收藏集编辑",
  "comment-create": "评论",
  "profile-edit": "个人资料编辑",
}
let avatarFirst = false
let coverFirst = false

function init() {
  initData()
  getData()
  RemoveCount()
}

function initData() {
  scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (isBottom || getDataLock) {
    return
  }
  loading.value = true
  getDataLock = true
  post("/v1/get/message/system/notification", {
    page: currentPage
  }).then(function (reply) {
    list.value = reply.data["list"]
    list.value.forEach(function (item) {
      if (item['notificationType'] === 'avatar' && !avatarFirst) {
        item['avatarFirst'] = 1
        avatarFirst = true
      }
      if (item['notificationType'] === 'cover' && !coverFirst) {
        item['coverFirst'] = 1
        coverFirst = true
      }
      getCreationImage(item)
      let section = []
      item["section"] && JSON.parse(item["section"]).forEach(function (_item) {
        if (_item["AbuseInfoKeywords"] !== "") {
          section.push({
            kind: "谩骂",
            result: _item["AbuseInfoHitFlag"],
            words: _item["AbuseInfoKeywords"]
          })
        }

        if (_item["AdsInfoKeywords"] !== "") {
          section.push({
            kind: "广告",
            result: _item["AdsInfoHitFlag"],
            words: _item["AdsInfoKeywords"]
          })
        }

        if (_item["IllegalInfoKeywords"] !== "") {
          section.push({
            kind: "违法",
            result: _item["IllegalInfoHitFlag"],
            words: _item["IllegalInfoKeywords"]
          })
        }

        if (_item["PornInfoKeywords"] !== "") {
          section.push({
            kind: "色情",
            result: _item["PornInfoHitFlag"],
            words: _item["PornInfoKeywords"]
          })
        }
      })
      item["section"] = section
    })
    let size = reply.data["list"].length
    if (size === 0) {
      isBottom = true
      return
    }
    currentPage += 1
    showAvatarImage()
    showCoverImage()
  }).catch(function () {
  }).then(function () {
    data.value = data.value.concat(list.value)
    loading.value = false
    getDataLock = false
  })
}

function showAvatarImage() {
  if (!avatarFirst) {
    return null
  }
  cos.value.getObjectUrl({
    Bucket: avatar.value.bucket,
    Region: avatar.value.region,
    Key: avatar.value.freezeKey + uuid.value + '/avatar.webp',
    Sign: true,
  }, function (err, data) {
    if (err) return 0;
    imageAvatarUrl.value = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=inline'
  });
}

function showCoverImage() {
  if (!coverFirst) {
    return null
  }
  cos.value.getObjectUrl({
    Bucket: cover.value.bucket,
    Region: cover.value.region,
    Key: cover.value.freezeKey + uuid.value + '/cover.webp',
    Sign: true,
  }, function (err, data) {
    if (err) return 0;
    imageCoverUrl.value = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=inline'
  });
}

function getCreationImage(item) {
  let creationModel = item['notificationType'].includes('article') ? article : (item['notificationType'].includes('column') ? column : talk)
  cos.value.getObjectUrl({
    Bucket: creationModel.value.bucket,
    Region: creationModel.value.region,
    Key: creationModel.value.freezeKey + uuid.value + '/' + item['contentId'] + '/' + (item['notificationType'].includes('content') ? item['uid'] + '.webp' : 'cover.webp'),
    Sign: true,
  }, function (err, data) {
    if (err) return 0;
    item['imageCreationUrl'] = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=inline'
  });
}

function RemoveCount() {
  post("/v1/remove/mailbox/system/notification", {}).then(function () {
    emits("update:system", 0)
  })
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.notification-container {
  width: 100%;
  flex-direction: column;

  .head-block {
    width: 100%;
    height: 55px;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-lighter);
    background-color: var(--el-color-white);

    .label {
      margin-left: 20px;
      cursor: pointer;
      color: var(--el-text-color-secondary)
    }

    .select {
      color: var(--el-color-primary)
    }
  }

  .notification-block {
    margin-top: 10px;
    min-height: 800px;
    width: 100%;
    flex-direction: column;

    .empty {
      flex-direction: unset;
      align-items: flex-start;
      width: 100%;
      height: 800px;
      background-color: var(--el-color-white);
      border-radius: 5px;
      box-shadow: var(--el-box-shadow-lighter);
    }


    .block {
      padding: 16px;
      width: 100%;
      background-color: var(--el-color-white);
      border-radius: 5px;
      box-shadow: var(--el-box-shadow-lighter);
      margin-bottom: 10px;

      .avatar {
        background-color: var(--el-text-color-primary);
      }

      .descriptions-block {
        ::v-deep(.descriptions-image-label) {
          display: none;
        }

        ::v-deep(.descriptions-image) {
          .image {
            cursor: pointer;
            height: 120px;
            width: 170px;
            border-radius: 6px;
          }
        }
      }
    }
  }
}
</style>