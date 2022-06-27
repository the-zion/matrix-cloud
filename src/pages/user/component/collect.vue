<template>
  <el-container class="collect-container">
    <collect-dialog v-model:visible="visible" v-bind:mode="'create'" @close="dialogClose"></collect-dialog>
    <el-row class="bar" justify="space-between" align="middle">
      <span>收藏集</span>
      <el-row class="create" align="middle" justify="space-around" @click="create">
        <el-icon>
          <Plus/>
        </el-icon>
        <span>新建收藏集</span>
      </el-row>
    </el-row>
    <el-row class="body">
      <matrix-collect-list></matrix-collect-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Collect"
}
</script>

<script setup>
import {ref} from "vue"
import CollectDialog from "../../collect/component/dialog.vue";

let visible = ref(false)

function create() {
  visible.value = true
}

function dialogClose() {

}
</script>

<style scoped lang="scss">
.collect-container {
  width: 100%;
  flex-direction: column;

  ::v-deep(.collectDialog) {
    border-radius: 4px;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 20px 24px 0 24px;
    }
  }

  .bar {
    width: 100%;
    height: 50px;
    padding: 0 28px;
    border-bottom: 1px solid var(--el-border-color-light);

    .create {
      width: 90px;
      font-size: 14px;
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }

  .body {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>