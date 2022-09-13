<template>
  <el-container class="column-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>违规记录</span>
    </el-row>
    <el-row class="body">
      <el-table class="table" :data="data" stripe :row-style="{'cursor':'pointer'}">
        <el-table-column property="id" label="序号" width="60"/>
        <el-table-column class="column" label="类别" min-width="1">
          <template #default="scope">
            <span>{{'封面'}}</span>
          </template>
        </el-table-column>
        <el-table-column class="column" property="createAt" label="上传时间" min-width="2"/>
        <el-table-column class="column" property="result" label="审核结果" min-width="2">
          <template #default="scope">
            <el-row style="width: 100%;overflow-x: auto">
              <el-tag v-if="scope.row.result === 1" type="danger" effect="dark">敏感</el-tag>
              <el-tag v-if="scope.row.result === 2" type="warning" color="orange" effect="dark">疑似敏感</el-tag>
              <span v-else></span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column class="column" property="label" label="标签" min-width="2">
          <template #default="scope">
            <el-row style="width: 100%;overflow-x: auto">
              <el-tag v-if="scope.row.label !== ''" type="danger" effect="dark">
                {{ reviewTag[scope.row.label] || scope.row.label }}
              </el-tag>
              <span v-else></span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column class="column" property="category" label="子集" min-width="2">
          <template #default="scope">
            <el-row style="width: 100%;overflow-x: auto">
              <el-tag v-if="scope.row.category !== ''" type="warning" color="orange" effect="dark">
                {{ category[scope.row.category] || scope.row.category }}
              </el-tag>
              <span v-else></span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column class="column" property="subLabel" label="子标签" min-width="2">
          <template #default="scope">
            <el-row style="width: 100%;overflow-x: auto">
              <el-tag v-if="scope.row['subLabel'] !== ''" type="warning" color="orange" effect="dark">
                {{ subLabel[scope.row['subLabel']] || scope.row['subLabel'] }}
              </el-tag>
              <span v-else></span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120" min-width="1">
          <template #default="scope">
            <el-popover placement="top" :width="200" @before-enter="showImage(scope.row)">
              <template #reference>
                <el-button link type="primary" size="small"
                >查看图片
                </el-button>
              </template>
              <el-image v-if="scope.row.kind === 'content'" fit="cover" class="cover"
                        :src="imageUrl"></el-image>
              <el-image v-if="scope.row.kind === 'cover'" fit="cover" class="cover"
                        :src="imageUrl"></el-image>
            </el-popover>
          </template>
        </el-table-column>
        <template #empty>
          <el-row align="middle" justify="center">
            <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
                      :image-size="250" image="../../src/assets/images/no_data.svg"
            />
          </el-row>
        </template>
      </el-table>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-container>
</template>

<script>
export default {
  name: "Column"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {scrollToBottomListen, throttle} from "../../../../utils/scroll";
import {ReviewTag, Category, SubLabel} from "../../../../utils/review";
import {post} from "../../../../utils/axios";
import {baseMainStore, userMainStore} from "../../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {column} = storeToRefs(baseStore)

let currentPage = 1
let isBottom = false
let getDataLock = false
let data = ref([])
let list = ref([])
let loading = ref(false)
let reviewTag = ref(ReviewTag())
let category = ref(Category())
let subLabel = ref(SubLabel())
let imageUrl = ref("")

function init() {
  initData()
  getData()
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
  post("/v1/get/column/image/review", {
    page: currentPage
  }).then(function (reply) {
    list.value = reply.data["review"]
    let size = reply.data["review"].length
    if (size === 0) {
      isBottom = true
      return
    }
    currentPage += 1
  }).catch(function () {
  }).then(function () {
    data.value = data.value.concat(list.value)
    loading.value = false
    getDataLock = false
  })
}

function showImage(item) {
  cos.value.getObjectUrl({
    Bucket: column.value.bucket,
    Region: column.value.region,
    Key: column.value.freezeKey + uuid.value + '/' + item['creationId'] + '/' + (item.kind === 'content' ? item['uid'] + '.webp' : 'cover.webp'),
    Sign: true,
  }, function (err, data) {
    if (err) return 0;
    imageUrl.value = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=inline'
  });
}

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang="scss">
.column-container {
  width: 100%;
  flex-direction: column;

  .bar {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .skeleton {
    width: unset;
    padding: 16px;
  }

  .body {
    width: 100%;

    .table {
      ::v-deep(.el-table__empty-block) {
        min-height: unset;
      }

      ::v-deep(.el-table__inner-wrapper::before) {
        background-color: unset;
      }
    }
  }
}
</style>