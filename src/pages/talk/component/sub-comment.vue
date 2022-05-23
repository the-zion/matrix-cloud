<template>
  <el-row class="sub-comment" :id="'sub-comment-' + props.id">
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
import CommentCard from "./comment-card.vue";
import {ref, watch, onMounted} from "vue";
import {scrollTo} from "../../../utils/scroll";

const props = defineProps({
  id: Number
})
let comments = ref([])
let currentPage = ref(1)

function getData() {
  for (let i = 0; i <= 9; i++) {
    comments.value.push({
      id: i,
      name: "liusiyuan",
      html: '<p>hello</p>',
      avatar: '../../src/assets/images/boy.png',
      time: "2022-05-22",
      agree: 2430,
      comment: 3200
    })
  }
}

function init() {
  getData()
}

watch(currentPage, function () {
  // let e = document.getElementById('sub-comment-' + props.id)
  // let l = e.offsetTop + e.offsetParent.offsetTop + e.offsetParent.offsetParent.offsetTop +
  //     e.offsetParent.offsetParent.offsetParent.offsetTop +
  //     e.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop +
  //     e.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop
  scrollTo('sub-comment-' + props.id)
})

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.sub-comment {
  width: 100%;

  .main {
    width: 100%;

    .each {
      width: 100%;
      padding: 8px 16px 0;
      margin-bottom: 12px;
      border-radius: 8px;
      background-color: rgba(247, 247, 247, 1);
    }
  }

  .footer {
    width: 100%;
    padding: 10px 0;
  }
}
</style>