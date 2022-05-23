<template>
  <el-row class="talk-common" id="talk-comment">
    <el-row class="header" justify="space-between" align="middle">
      <span class="word">{{ "共" + comment + "个回复" }}</span>
      <el-select class="select" v-model="select">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-row>
    <el-row class="main">
      <el-row class="each" v-for="item in comments" :key="item.id">
        <comment-card :data="item"></comment-card>
      </el-row>
    </el-row>
    <el-row class="footer" justify="center">
      <el-pagination
          background
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
  name: "Comment"
}
</script>

<script setup>
import {onMounted, ref, watch} from "vue"
import CommentCard from "./comment-card.vue";
import {scrollTo} from "../../../utils/scroll";

let comment = ref(66)
let select = ref("hot")
let currentPage = ref(1)
let comments = ref([])
let options = ref([
  {
    label: "最热",
    value: "hot"
  },
  {
    label: "最新",
    value: "new"
  }
])

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

watch(currentPage, () => {
  scrollTo("talk-comment")
})

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.talk-common {
  width: 100%;

  .header {
    width: 100%;
    border-radius: 8px;
    box-shadow: var(--el-box-shadow-lighter);
    background-color: var(--el-color-white);
    margin-bottom: 10px;
    padding: 10px 15px;

    .word {
      font-size: 12px;
      color: var(--el-text-color-disabled)
    }

    .select {
      width: 75px;

      ::v-deep(.el-input__wrapper) {
        box-shadow: unset !important;
        height: 20px;
      }
    }
  }

  .main {
    width: 100%;

    .each {
      width: 100%;
      padding: 16px 16px 0;
      background-color: var(--el-color-white);
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: var(--el-box-shadow-lighter);
    }
  }

  .footer {
    width: 100%;
  }
}
</style>