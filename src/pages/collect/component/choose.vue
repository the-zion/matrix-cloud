<template>
  <el-dialog v-model="props.visible" title="请选择收藏集" :width="600" destroy-on-close custom-class="collections-choose"
             @open="open"
             @closed="closed"
  >
    <el-row class="table">
      <el-table :data="filterTableData" highlight-current-row @current-change="change" :row-style="{'cursor':'pointer'}"
                v-show="!loading">
        <el-table-column type="index" label="序号" width="60" :index="indexFormatter"/>
        <el-table-column show-overflow-tooltip class="column" property="name" label="我的收藏集" min-width="1"/>
        <el-table-column align="right" min-width="1">
          <template #header>
            <el-input v-model="search" size="small" placeholder="搜索名称"/>
          </template>
        </el-table-column>
        <template #empty>
          <el-row align="middle">
            <span>暂无收藏集，马上去创建一个吧</span>
            <el-link type="primary" style="margin: 0 10px" @click="create">去创建</el-link>
          </el-row>
        </template>
      </el-table>
      <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
    </el-row>
    <template #footer>
      <span class="foot">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="collect" :disabled="!selectId" :loading="collectLoading"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "CollectionsChoose"
}
</script>

<script setup>
import {ref, computed} from "vue"
import {post, get, axiosGetAll} from "../../../utils/axios";
import {error} from "../../../utils/message";
import router from "../../../router";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia";

const emits = defineEmits(["update:visible", "collected"])
const props = defineProps({
  visible: Boolean,
  judge: Object,
  mode: String,
  id: Number,
  uuid: String,
})
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar, collections} = storeToRefs(baseStore)
const filterTableData = computed(() =>
    gridData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)


let judge = null
let mode = null
let currentPage = ref(1)
let gridData = ref([])
let list = ref([])
let loading = ref(false)
let collectLoading = ref(false)
let selectId = ref()
let search = ref('')
let collectUrl = {
  article: "/v1/set/article/collect",
  talk: "/v1/set/talk/collect",
  column: "/v1/set/column/collect"
}

function open() {
  init()
}

function init() {
  initData()
  getData()
}

function initData() {
  gridData.value = []
  currentPage.value = 1
  selectId.value = 0
  loading.value = false
  collectLoading.value = false
  judge = props.judge
  mode = props.mode
}

function getData() {
  loading.value = true
  get("/v1/get/collections/list/all").then(function (reply) {
    list.value = reply.data.collections
    getContent()
  }).catch(function () {
    loading.value = false
    error("获取收藏集失败")
  })
}

function getContent() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(collections.value.baseUrl + uuid.value + "/" + item["id"] + "/content")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.data.id === item["id"] && (list.value[index] = Object.assign(item, each.data))
      })
    })
  }, function () {
  }, function () {
    gridData.value = list.value
    loading.value = false
  })
}

function change(row) {
  selectId.value = row.id
}

function cancel() {
  emits("update:visible", false)
}

function collect() {
  if (!props.id || !props.uuid || !selectId.value) {
    return
  }
  collectLoading.value = true
  post(collectUrl[mode], {
    id: props.id,
    collections_id: selectId.value,
    uuid: props.uuid
  }).then(function () {
    emits("collected")
    cancel()
  }).catch(function () {
    error("收藏出错")
  }).then(function () {
    collectLoading.value = false
  })
}

function closed() {
  emits("update:visible", false)
}

function create() {
  const {href} = router.resolve({
    name: "creation.content",
    query: {menu: 'collections'}
  });
  window.open(href, "_blank");
}

function indexFormatter(index) {
  return (index + 1) + (currentPage.value - 1) * 10
}
</script>

<style scoped lang="scss">
.table {
  height: 440px;
  display: flex;

  .skeleton {
    padding: 16px;
  }
}

.footer {
  width: 100%;
  margin: 10px 0;
}
</style>