<template>
  <el-row class="list">
    <el-empty v-show="data.length === 0" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-space class="data" fill :size="props.gap || 0">
      <el-row v-for="(item,index) in data" class="each" :class="props.shape" :key="item.id">
        <component :is="props.component" :data="data[index]"></component>
        <el-space class="operation" size="large">
          <div v-for="op in props.operation" :key="op">
            <el-icon v-show="op === 'delete'" class="icon" @click="doDelete(item)">
              <delete/>
            </el-icon>
            <el-icon v-show="op === 'star'" class="iconfont icon-star-fill star" @click="doCollect(item)"></el-icon>
          </div>
        </el-space>
      </el-row>
    </el-space>
    <el-row class="foot" justify="center" v-show="data.length !== 0">
      <el-pagination
          :background="props.pageBackground"
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
  name: "MatrixList"
}
</script>

<script setup>
import {ref, watch, onMounted} from "vue";
import {confirm} from "../../utils/globalFunc";
import {success} from "../../utils/message";
import {scrollTo} from "../../utils/scroll";

const emits = defineEmits(["current-page"])
const props = defineProps({
  component: String,
  gap: Number,
  state: String,
  shape: String,
  operation: {
    type: Array,
    default: []
  },
  "page-background": Boolean,
  "scroll-to": {
    type: Number,
    default: 0
  },
})

let data = ref([])
let currentPage = ref(1)

function init() {
  initData()
  getData()
}

function initData() {
}

function getData() {
  data.value = []
  switch (props.component) {
    case "MatrixBlogCard":
      for (let i = 0; i <= 9; i++) {
        data.value.push({
          id: i,
          title: "迭代法实现二叉树的前序、中序和后序遍历" + i,
          avatar: "../../src/assets/images/boy.png",
          image: "../../src/assets/images/img.png",
          name: "刘小圆sama",
          time: "2022-05-06",
          content: "本文的目的是为了总结出一个通用的，改动较少的非递归模板，可以分别适用于二叉树的前序、中序和后续遍历，方便记忆。前序遍历前序遍历的遍历顺序为：根 -> 左 -> 右。只要有左子树，就把左子树入栈，同时把值加入答案数组，然后依次弹出栈顶元素，移动到它的右子树，重复操作。「代码块」中序遍历中序遍历的遍",
          tags: "go;云原生",
          agree: 10000,
          view: 12000,
          comment: 1100,
          collect: 500
        })
      }
      break
    case "MatrixColumnCard":
      for (let i = 0; i <= 9; i++) {
        data.value.push({
          id: i,
          title: "数组和字符串",
          avatar: "../../src/assets/images/boy.png",
          image: "../../src/assets/images/column.png",
          name: "刘小圆sama",
          time: "2022-05-06",
          content: "简介：数组是数据结构中的基本模块之一。因为字符串是由字符数组形成的，所以二者是相似的。大多数面试问题都属于这个范畴。",
          tags: "go;云原生",
          agree: 10000,
          view: 12000,
          comment: 1100,
          collect: 500
        })
      }
      break
    case "MatrixTalkCard":
      for (let i = 0; i <= 9; i++) {
        data.value.push({
          id: i,
          title: "Shopee 送命题：进程切换为什么比线程切换慢" + i,
          avatar: "../../src/assets/images/boy.png",
          // image: "../src/assets/images/img.png",
          name: "刘小圆sama",
          time: "2022-05-06",
          content: "这个问题挺有区分度的，我也是昨天整理面经才看见的这道题。 注意这里问的是为什么进程切换比线程慢，而不是问为什么进程比线程慢。当然这里的线程",
          tags: "go;云原生",
          agree: 10000,
          view: 12000,
          comment: 1100,
          collect: 500
        })
      }
      break
  }
}

function doDelete(item) {
  confirm("删除", "确定删除" + "：\"" + item.title + "\" 吗？").then(function () {
    success("删除成功")
  }).catch(() => {
  })
}

function doCollect(item) {
  confirm("取消收藏", "确定取消收藏" + "：\"" + item.title + "\" 吗？").then(function () {
    success("取消成功")
  }).catch(() => {
  })
}

defineExpose({
  getData
})

watch(currentPage, () => {
  scrollTo(props.scrollTo)
})

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .data {
    width: 100%;

    .each {
      position: relative;
      border-bottom: 1px solid var(--el-border-color);
      background-color: var(--el-color-white);
      cursor: pointer;

      .operation {
        position: absolute;
        top: 16px;
        right: 0;

        .icon {
          color: var(--el-text-color-placeholder);
          font-size: 20px;
          cursor: pointer;
        }

        .star {
          color: #ffa116;
          font-size: 20px;
          cursor: pointer;
        }

        .icon:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .card {
      border-radius: 8px;
      box-shadow: var(--el-box-shadow-lighter);
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>