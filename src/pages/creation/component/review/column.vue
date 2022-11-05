<template>
  <el-container class="column-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>违规记录</span>
    </el-row>
    <el-row class="body">
      <el-table class="table" :data="data" stripe :row-style="{'cursor':'pointer'}">
        <el-table-column property="id" label="序号" width="60"/>
        <el-table-column show-overflow-tooltip class="column" property="title" label="标题"
                         min-width="2"></el-table-column>
        <el-table-column class="column" property="createAt" label="上传时间" min-width="2"/>
        <el-table-column class="column" property="kind" label="类别" min-width="2">
          <template #default="scope">
            <el-row>
              <el-tag v-if="scope.row.kind === 'create'">新增</el-tag>
              <el-tag v-if="scope.row.kind === 'edit'">编辑</el-tag>
              <span v-else></span>
            </el-row>
          </template>
        </el-table-column>
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
        <el-table-column type="expand" :width="120">
          <template #header>
            <el-row align="middle" justify="center">
              <span>展开</span>
              <el-tooltip
                  effect="dark"
                  content="由于'涉政'类型的敏感性，相关违规内容将不予展示"
                  placement="bottom"
                  :hide-after="50"
              >
                <el-icon style="margin-left: 3px">
                  <InfoFilled/>
                </el-icon>
              </el-tooltip>
            </el-row>
          </template>
          <template #default="props">
            <div m="4">
              <el-table v-if="props.row.section.length" :data="props.row.section" border>
                <el-table-column label="分类" prop="kind" min-width="1">
                  <template #default="scope">
                    <el-tag type="warning">{{ scope.row.kind }}</el-tag>
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
              <el-empty v-if="props.row.section.length === 0" class="empty" description=" "
                        :image-size="250" :image="noData"
              />
            </div>
          </template>
        </el-table-column>
        <template #empty>
          <el-row align="middle" justify="center">
            <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
                      :image-size="250" :image="noData"
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
import {ReviewTag} from "../../../../utils/review";
import {post} from "../../../../utils/axios";
import {userMainStore} from "../../../../store/user";
import {baseMainStore} from "../../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {getAssets} from "../../../../utils/globalFunc";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {column} = storeToRefs(baseStore)
const noData = getAssets("no_data.svg")

let currentPage = 1
let isBottom = false
let getDataLock = false
let data = ref([])
let list = ref([])
let loading = ref(false)
let reviewTag = ref(ReviewTag())

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
  post("/v1/get/column/content/review", {
    page: currentPage
  }).then(function (reply) {
    list.value = reply.data["review"]
    list.value.forEach(function (item) {
      let section = []
      JSON.parse(item["section"]).forEach(function (_item) {
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