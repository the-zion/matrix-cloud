<template>
  <el-row class="list">
    <el-empty v-show="data.length === 0" class="empty" description="未找到相关内容"/>
    <el-space class="data" fill :size="props.gap || 0">
      <el-row v-for="(item,index) in data" class="each" :class="props.shape" :key="index">
        <matrix-blog v-if="props.mode === 1" :data="data[index]"></matrix-blog>
        <matrix-column v-if="props.mode === 2" :data="data[index]"></matrix-column>
        <matrix-talk v-if="props.mode === 3" :data="data[index]"></matrix-talk>
        <el-space class="operation" size="large">
          <div v-for="op in props.operation">
            <el-icon v-show="op === 'edit'" class="icon" @click="doEdit">
              <edit/>
            </el-icon>
            <el-icon v-show="op === 'delete'" class="icon" @click="doDelete(item)">
              <delete/>
            </el-icon>
            <el-icon v-show="op === 'star'" class="iconfont icon-star-fill star" @click="doCollect(item)"></el-icon>
          </div>
        </el-space>
      </el-row>
    </el-space>
    <el-row class="foot" justify="center">
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
  name: "MatrixList"
}
</script>

<script setup>
import {ref, watch, onMounted} from "vue";
import {confirm} from "../../utils/globalFunc";
import {success} from "../../utils/message";

const emits = defineEmits(["current-page"])
const props = defineProps({
  mode: Number,
  gap: Number,
  shape: String,
  operation: {
    type: Array,
    default: []
  }
})

let data = ref([])
let currentPage = ref(1)
let dataType = ""

function init() {
  initData()
  getData()
}

function initData() {
  switch (props.mode) {
    case 1:
      dataType = "博客"
      break
    case 2:
      dataType = "专栏"
      break
    case 3:
      dataType = "讨论"
      break
  }
}

function getData() {
  switch (props.mode) {
    case 1:
      for (let i = 0; i <= 9; i++) {
        data.value.push({
          title: "迭代法实现二叉树的前序、中序和后序遍历" + i,
          avatar: "../src/assets/images/boy.png",
          image: "../src/assets/images/img.png",
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
    case 2:
      for (let i = 0; i <= 9; i++) {
        data.value.push({
          title: "数组和字符串",
          avatar: "../src/assets/images/boy.png",
          image: "../src/assets/images/column.png",
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
    case 3:
      for (let i = 0; i <= 9; i++) {
        data.value.push({
          title: "Shopee 送命题：进程切换为什么比线程切换慢" + i,
          avatar: "../src/assets/images/boy.png",
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

function doEdit() {

}

function doDelete(item) {
  confirm("删除", "确定删除" + dataType + "：\"" + item.title + "\" 吗？").then(function () {
    success("删除成功")
  }).catch(() => {
  })
}

function doCollect(item) {
  confirm("取消收藏", "确定取消收藏" + dataType + "：\"" + item.title + "\" 吗？").then(function () {
    success("取消成功")
  }).catch(() => {
  })
}

watch(currentPage, () => {
  emits("current-page", "")
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
      border: 1px solid var(--el-border-color);
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>