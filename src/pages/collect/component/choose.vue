<template>
  <el-dialog v-model="props.visible" title="请选择收藏集" :width="600" destroy-on-close custom-class="collections-choose"
             @open="open"
             @closed="closed"
  >
    <el-row class="table">
      <el-table :data="gridData" highlight-current-row @current-change="change" :row-style="{'cursor':'pointer'}"
                v-show="!loading">
        <el-table-column type="index" label="序号" width="60"/>
        <el-table-column class="column" property="name" label="我的收藏集" min-width="1"/>
        <template #empty>
          <el-row align="middle">
            <span>暂无收藏集，马上去创建一个吧</span>
            <el-link type="primary" style="margin: 0 10px" @click="create">去创建</el-link>
          </el-row>
        </template>
      </el-table>
      <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
    </el-row>
    <el-row class="footer" justify="center" v-if="gridData.length">
      <el-pagination
          class="page"
          v-model:current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next"
          :total="pageTotal"
      />
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
import {ref} from "vue"
import {post} from "../../../utils/axios";
import {error} from "../../../utils/message";
import router from "../../../router";
import {userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia";

const emits = defineEmits(["update:visible", "update:judge", "collected"])
const props = defineProps({
  visible: Boolean,
  judge: Object,
  id: Number,
  uuid: String,
})
const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)

let judge = null
let currentPage = ref(1)
let pageTotal = ref(1)
let gridData = ref([])
let loading = ref(false)
let collectLoading = ref(false)
let selectId = ref()

function open() {
  init()
}

function init() {
  initData()
  getData()
  getDataCount()
}

function initData() {
  gridData.value = []
  currentPage.value = 1
  pageTotal.value = 1
  selectId.value = 0
  loading.value = false
  collectLoading.value = false
  judge = props.judge
}

function getData() {
  loading.value = true
  post("/v1/get/collections", {
    page: currentPage.value
  }).then(function (reply) {
    gridData.value = reply.data.collections
    loading.value = false
  }).catch(function () {
    error("获取收藏集失败")
  })
}

function getDataCount() {
  post("/v1/get/collections/count", {}).then(function (reply) {
    pageTotal.value = reply.data.count
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
  post("/v1/set/article/collect", {
    id: props.id,
    collections_id: selectId.value,
    uuid: props.uuid
  }).then(function () {
    collectLoading.value = false
    judge["collect"] = true
    emits("judge", judge)
    emits("collected")
    cancel()
  }).catch(function () {
    error("收藏出错")
  })
}

function closed() {
  emits("update:visible", false)
}

function create() {
  const {href} = router.resolve({
    name: "user",
    query: {id: uuid.value, menu: 'collect'}
  });
  window.open(href, "_blank");
}
</script>

<style scoped lang="scss">
.table {
  height: 440px;

  .skeleton {
    padding: 16px;
  }
}

.footer {
  width: 100%;
  margin: 10px 0;
}
</style>