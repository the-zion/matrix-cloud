<template>
  <el-row class="blog-comment" id="blog-comment">
    <el-row class="header" justify="space-between">
      <el-space>
        <span class="num">{{ count }}</span>
        <span class="word">条评论</span>
      </el-space>
      <el-select class="select" v-model="select">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-row>
    <Reply></Reply>
    <el-row class="main">
      <el-row v-for="item in comments" :key="item.id" class="each">
        <command-card :data="item"></command-card>
      </el-row>
    </el-row>
    <el-row class="footer" justify="center">
      <el-pagination
          background
          v-model:current-page="currentPage"
          :page-size="20"
          :pager-count="11"
          small
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
import Reply from './reply.vue'

import {onMounted, ref, watch} from "vue"
import {scrollTo} from "../../../utils/scroll"
import CommandCard from "./comment-card.vue"

let count = ref(153)
let select = ref("hot")
let currentPage = ref(1)
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

let comments = ref([])

watch(currentPage, () => {
  console.log(111)
})

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

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">
.blog-comment {
  width: 100%;

  .header {
    width: 100%;
    margin-bottom: 5px;

    .num {
      font-size: 20px;
    }

    .word {
      color: var(--el-text-color-regular);
      font-size: 13px;
    }

    .select {
      width: 75px;

      ::v-deep(.el-input__wrapper) {
        box-shadow: unset !important;
      }
    }
  }

  .main {
    width: 100%;
    padding: 20px 0;

    .each {
      width: 100%;
    }
  }

  .footer {
    width: 100%;
  }
}
</style>