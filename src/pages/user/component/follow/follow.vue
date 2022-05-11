<template>
  <el-row class="follow">
    <el-space class="bar" spacer="|">
        <span v-for="item in bar" class="each" :class="{'select': item.select}"
              @click="select(item)">{{ item.label + " " + data[item.key] || 0 }}</span>
    </el-space>
    <el-row class="body">
      <el-scrollbar class="scroll" max-height="100%" ref="scroll">
        <el-row class="space" id="scroll">
          <el-row v-for="item in list" class="each" justify="space-between" align="middle">
            <el-space class="information">
              <el-avatar :src="item.image" shape="square" :size="64"></el-avatar>
              <el-space class="info" direction="vertical" alignment="start">
                <span>{{ item.name }}</span>
                <span class="introduce">{{ item.introduce }}</span>
              </el-space>
            </el-space>
            <el-button class="btn-follow" type="primary">关注</el-button>
          </el-row>
          <el-skeleton v-if="!visible" class="skeleton" :rows="1" animated/>
        </el-row>
        <el-row class="foot" justify="center">
          <el-button class="btn-load" @click="dataLoad" v-show="visible">加载更多</el-button>
        </el-row>
      </el-scrollbar>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixUserFollow"
}
</script>

<script setup>
import {ref, onMounted} from "vue";

let data = ref({})
let list = ref([])
let visible = ref(true)
let scroll = ref()
let element = null
let bar = ref([
  {
    key: "follow",
    label: "关注了",
    select: true
  },
  {
    key: "follower",
    label: "关注者",
    select: false
  }
])

function init() {
  initData()
  getData()
  getList()
}

function initData() {
  element = document.getElementById('scroll')
  console.log(element)
}

function getData() {
  data.value = {
    "follow": 2,
    "follower": 36
  }
}

function getList() {
  for (let i = 0; i <= 9; i++) {
    list.value.push({
      name: "刘小圆sama",
      introduce: "海纳百川，有容乃大",
      image: '../src/assets/images/boy.png'
    })
  }
}

function select(each) {
  bar.value.forEach(function (item) {
    item.select = item.key === each.key
  })
}

function dataLoad() {
  visible.value = false
  setTimeout(function () {
        setTimeout(function () {
          visible.value = true
          getList()
        }, 2000)
        scroll.value.setScrollTop(element.scrollHeight)
      }, 10
  )
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.follow {
  width: 100%;
  height: 100%;
  flex-direction: column;

  .bar {
    width: 100%;
    height: 20px;
    color: var(--el-text-color-disabled);

    .each {
      cursor: pointer;
    }

    .select {
      color: var(--el-text-color-primary)
    }
  }

  .body {
    width: 100%;
    height: calc(100% - 20px - 0.5rem);
    overflow: auto;
    margin-top: 0.5rem;

    .scroll {
      width: 100%;

      .space {
        width: 100%;

        .each {
          padding: 0.5rem 0;
          width: 100%;
          border-bottom: 1px solid var(--el-border-color-lighter);

          .information {
            width: calc(100% - 72px);

            .info {
              justify-content: center;

              .introduce {
                font-size: 12px;
                color: var(--el-text-color-secondary)
              }
            }
          }

          .btn-follow {
            width: 52px;
            margin-right: 20px;
          }
        }

        .each:last-child {
          border-bottom: unset;
        }

        .skeleton {
          padding: 1rem 0;
        }
      }

      .foot {
        width: 100%;

        .btn-load {
          width: 250px;
        }
      }
    }
  }
}
</style>