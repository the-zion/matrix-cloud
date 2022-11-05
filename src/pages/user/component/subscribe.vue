<template>
  <el-container class="subscribe-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>订阅</span>
    </el-row>
    <el-row class="body">
      <column-subscribe-list ref="listRef"></column-subscribe-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Subscribe"
}
</script>

<script setup>
import {ref} from "vue"
import {storeToRefs} from "pinia/dist/pinia";
import {useRoute} from "vue-router";
import {userMainStore} from "../../../store/user";
import ColumnSubscribeList from "../../column/component/subscribe.vue";

const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)
let visible = ref(false)
let listRef = ref()
let userId = useRoute().query["id"]

</script>


<style scoped lang="scss">

.subscribe-container {
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