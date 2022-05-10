<template>
  <el-container class="collect">
    <el-row class="filter" justify="space-between">
      <el-select v-model="select" placeholder="Select" class="select">
        <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.key"
        />
      </el-select>
    </el-row>
    <matrix-list v-if="select === 'blog'" :mode="1" @current-page="pageChange"></matrix-list>
    <matrix-list v-if="select === 'column'" :mode="2" @current-page="pageChange"></matrix-list>
  </el-container>
</template>
<script>
export default {
  name: "MatrixUserCollect"
}
</script>

<script setup>
import {initVariable, init, pageChange} from "./controller";
import {onMounted} from "vue";

let {select, options} = initVariable()
onMounted(() => {
  init()
})
</script>
<style scoped lang="scss">
.collect {
  width: 100%;
  flex-direction: column;

  .filter {
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--el-border-color);

    .select {
      width: 150px;
    }

    .search {
      width: 250px;
    }
  }
}
</style>