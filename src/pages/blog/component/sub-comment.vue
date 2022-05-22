<template>
  <el-row class="sub-comment" :id="'sub-comment-' + props.id">
    <el-row class="header" justify="end">
      <span class="word" :class="{'select':select === 'hot'}" @click="select = 'hot'">最热</span>
      <el-divider direction="vertical"/>
      <span class="word" :class="{'select':select === 'new'}" @click="select = 'new'">最新</span>
    </el-row>
    <el-row class="main">
      <el-row v-for="item in comments" :key="item.id" class="each">
        <comment-card :data="item" :comment="false"></comment-card>
      </el-row>
    </el-row>
    <el-row class="footer" justify="center">
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "SubComment"
}
</script>

<script setup>
import {onMounted, ref, watch} from "vue"
import CommentCard from "./comment-card.vue"
import {scrollTo} from "../../../utils/scroll"

const props = defineProps({
  id: Number
})

let select = ref("hot")
let comments = ref([])
let currentPage = ref(1)

function init() {
  getData()
}

function getData() {
  for (let i = 0; i <= 9; i++) {
    comments.value.push({
      id: i,
      name: "liusiyuan",
      html: '<p>hello</p>',
      image: '../../src/assets/images/boy.png',
      time: "2022-05-22",
      agree: 2430,
      comment: 3200
    })
  }
}

watch(currentPage, function () {
  let e = document.getElementById('sub-comment-' + props.id)
  let l = e.offsetTop + e.offsetParent.offsetTop + e.offsetParent.offsetParent.offsetTop +
      e.offsetParent.offsetParent.offsetParent.offsetTop +
      e.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop +
      e.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop
  // console.log('comment-card-' + props.id)
  scrollTo(l)
})

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.sub-comment {
  width: 100%;

  .header {
    width: 100%;

    .select {
      color: var(--el-text-color-primary) !important;
    }

    .word {
      cursor: pointer;
      color: var(--el-text-color-placeholder);
      font-size: 13px;
    }
  }

  .main {
    width: 100%;

    .each {
      width: 100%;
    }
  }

  .footer {
    width: 100%;
    padding-top: 20px;
    border-top: 1px solid var(--el-border-color);
  }
}
</style>