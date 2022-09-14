<template>
  <el-container class="column-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>专栏</span>
    </el-row>
    <el-row class="body">
      <column-user-list ref="listRef"></column-user-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Column"
}
</script>

<script setup>
import {ref} from "vue"
import {userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia";
import {useRoute} from "vue-router";
import ColumnUserList from "../../column/component/user.vue";

const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)
let visible = ref(false)
let listRef = ref()
let userId = useRoute().query["id"]

</script>


<style scoped lang="scss">

.column-container {
  width: 100%;
  flex-direction: column;

  ::v-deep(.column-create) {
    border-radius: 4px;
    margin-top: 10vh;

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
  }

  .body {
    width: 100%;
  }
}
</style>