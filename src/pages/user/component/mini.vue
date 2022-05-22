<template>
  <el-row class="card">
    <el-row class="head">
      <el-avatar @click="goToPage('user', 1)" class="avatar" shape="square" :size="60" :src="image"/>
      <el-space class="info" direction="vertical" alignment="start" :size="0" fill>
        <el-space>
          <span class="nickname">{{ nickname }}</span>
        </el-space>
        <span class="introduce">{{ introduce }}</span>
      </el-space>
    </el-row>
    <el-row class="achievement">
      <el-row class="area" v-for="(item, index) in achMeta" :key="item.key" justify="center" align="middle">
        <el-space class="each" direction="vertical" alignment="center" :size="1">
          <span class="label">{{ item.label }}</span>
          <span
              class="value">{{
              achievement[item.key] > 1000 ? (achievement[item.key] / 1000).toFixed(1) + "k" : achievement[item.key]
            }}</span>
        </el-space>
        <el-divider class="divider" v-show="index !== achMeta.length - 1" direction="vertical"/>
      </el-row>
    </el-row>
    <el-row class="foot" justify="center">
      <el-button class="button" icon="Message" type="info" bg text>留言</el-button>
      <el-button class="button" icon="Plus" type="primary">关注</el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixUserMiniCard"
}
</script>

<script setup>
import {ref} from "vue"
import {goToPage} from "../../../utils/globalFunc";

let nickname = ref("刘小圆sama")
let introduce = ref("本文的目的是为了总结出一个通用的，改动较少的非递归模板，可以分别适用于二叉树的前序、中序和后续遍历，方便记忆。前序遍历前序遍历的遍历顺序为：根 -> 左 -> 右。只要有左子树，就把左子树入栈，同时把值加入答案数组，然后依次弹出栈顶元素，移动到它的右子树，重复操作。「代码块」中序遍历中序遍历的遍")
let image = ref("../../src/assets/images/boy.png")
let achMeta = ref([
  {
    key: "view",
    label: "被阅读"
  },
  {
    key: "agree",
    label: "被点赞"
  },
  {
    key: "collect",
    label: "被收藏"
  },
  {
    key: "followed",
    label: "关注者"
  }
])

let achievement = ref({
  view: 10200,
  agree: 9,
  collect: 13,
  followed: 0
})

</script>

<style scoped lang="scss">
.card {
  width: 100%;

  .head {
    width: 100%;
    margin-bottom: 12px;
    padding: 0 12px;

    .avatar {
      margin-right: 12px;
      border-radius: 6px;
    }

    .info {
      width: calc(100% - 72px);

      .nickname {
        font-size: 14px;
        font-weight: 500;
        color: var(--el-text-color-primary);
      }

      .introduce {
        font-size: 12px;
        line-height: 18px;
        color: var(--el-text-color-regular);
        word-break: break-word;
        align-self: stretch;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }

  .achievement {
    width: 100%;
    margin-bottom: 12px;

    .area {
      width: calc(25% - 0.25px);

      .each {
        position: relative;

        .label {
          font-size: 12px;
          color: var(--el-text-color-primary);
        }

        .value {
          font-size: 15px;
          font-weight: 500;
          color: var(--el-text-color-primary);
        }
      }
    }

    .divider {
      position: absolute;
      right: 0;
      height: 60%;
      border-left: 1px solid var(--el-border-color-lighter);
      margin: 0;
    }
  }

  .foot {
    width: 100%;

    .button {
      width: 43%;
    }
  }
}
</style>