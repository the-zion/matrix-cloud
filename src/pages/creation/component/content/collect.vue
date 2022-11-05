<template>
  <el-container class="collect-container">
    <collections-create v-model:visible="visible" v-bind:mode="'create'"></collections-create>
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
      <collect-creation-list ref="listRef" @row-delete="rowDelete"></collect-creation-list>
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
import CollectionsCreate from "../../../collect/component/create.vue";
import {userMainStore} from "../../../../store/user";
import {storeToRefs} from "pinia/dist/pinia";
import CollectCreationList from "../../../collect/component/creation.vue";

const emits = defineEmits(["row-delete"])
const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)
let visible = ref(false)
let listRef = ref()

function rowDelete() {
  emits("row-delete")
}

function create() {
  visible.value = true
}
</script>

<style scoped lang="scss">
.collect-container {
  width: 100%;
  flex-direction: column;

  ::v-deep(.collections-create) {
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
    padding: 0 20px;
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
  }
}
</style>