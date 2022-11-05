<template>
  <el-dialog v-model="props.visible" title="文章收录" :width="530" destroy-on-close custom-class="includes-add"
             @open="open"
             @closed="closed"
  >
    <template #header>
      <el-row class="header" justify="space-between" align="middle">
        <span>文章收录</span>
        <el-input class="search" v-model="search" placeholder="搜索名称"/>
      </el-row>
    </template>
    <el-row class="table">
      <el-table :data="filterTableData" v-show="!loading" :select-on-indeterminate="false">
        <el-table-column type="index" label="序号" width="60" :index="indexFormatter"/>
        <el-table-column show-overflow-tooltip class="column" property="title" label="文章标题" min-width="1"/>
        <el-table-column prop="tag" label="Tag" width="100">
          <template #default="scope">
            <el-tag type="info" v-if="includes && includes.includes(scope.row.id)">{{ "已收录" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button :loading="scope.row['deleteLoading']" v-if="includes && includes.includes(scope.row.id)" link
                       type="info"
                       size="small" @click="articleRemove(scope.row)">移除
            </el-button>
            <el-button :loading="scope.row['addLoading']" v-if="includes && !includes.includes(scope.row.id)" link
                       type="primary" size="small" @click="articleAdd(scope.row)">添加
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-row align="middle">
            <span>暂无文章，马上去发表一篇吧</span>
            <el-link type="primary" style="margin: 0 10px" @click="publish">去发表</el-link>
          </el-row>
        </template>
      </el-table>
      <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: "IncludesAdd"
}
</script>

<script setup>
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia";
import {ref, computed} from "vue";
import router from "../../../router";
import {axiosGetAll, get, post} from "../../../utils/axios";
import {error} from "../../../utils/message";

const emits = defineEmits(["update:visible", "addAfter"])
const props = defineProps({
  visible: Boolean,
  id: String
})

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const filterTableData = computed(() =>
    gridData.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase())
    )
)

let pageTotal = ref(1)
let columnId = ref()
let gridData = ref([])
let includes = ref([])
let loading = ref(false)
let addLoading = ref(false)
let deleteLoading = ref(false)
let search = ref("")
let list = ref()

function open() {
  init()
}

function init() {
  initData()
  getIncludes()
  getData()
}

function initData() {
  includes.value = []
  gridData.value = []
  pageTotal.value = 1
  loading.value = false
  addLoading.value = false
  deleteLoading.value = false
  columnId.value = props.id
}

function getIncludes() {
  if (!columnId.value) {
    return
  }
  get("/v1/get/column/article/list?id=" + columnId.value).then(function (reply) {
    reply.data.article.forEach(function (item) {
      includes.value.push(item.id)
    })
  }).catch(function () {
  })
}

function getData() {
  loading.value = true
  get("/v1/get/user/article/list/all").then(function (reply) {
    list.value = reply.data.article
    getIntroduce()
  }).catch(function () {
    error("文章获取失败")
    loading.value = false
  })
}

function getIntroduce() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(article.value.baseUrl + item["uuid"] + "/" + item["id"] + "/introduce")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.data.id === item["id"] && (list.value[index] = Object.assign(item, each.data))
      })
    })
  }, function () {
  }, function () {
    gridData.value = gridData.value.concat(list.value)
    loading.value = false
  })
}

function publish() {
  const {href} = router.resolve({
    name: "article.write",
    query: {mode: 'create'}
  });
  window.open(href, "_blank");
}

function articleAdd(item) {
  item["addLoading"] = true
  post("/v1/add/column/includes", {id: parseInt(columnId.value), article_id: item.id}).then(function () {
    includes.value.push(item.id)
  }).catch(function () {
    error("添加失败")
  }).then(function () {
    item["addLoading"] = false
  })
}

function articleRemove(item) {
  item["deleteLoading"] = true
  post("/v1/delete/column/includes", {id: parseInt(columnId.value), article_id: item.id}).then(function () {
    includes.value.splice(includes.value.indexOf(item.id), 1)
  }).catch(function () {
    error("移除失败")
  }).then(function () {
    item["deleteLoading"] = false
  })
}

function indexFormatter(index) {
  return index + 1
}

function closed() {
  emits("update:visible", false)
}

</script>

<style scoped lang="scss">
.table {
  height: 440px;
  overflow-y: scroll;

  .skeleton {
    padding: 16px;
  }
}

.footer {
  width: 100%;
  margin: 10px 0;
}
</style>