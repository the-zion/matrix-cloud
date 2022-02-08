<template>
  <el-container class="home-container">
    <el-aside class="home-aside">
      <el-tree node-key="value"
               ref="treeRef"
               :data="classList"
               check-on-click-node
               show-checkbox
               highlight-current
               accordion
               :default-expanded-keys="['All']"
               :default-checked-keys="['all']"
               :current-node-key="'all'"
               @check="treeCheck"
               :props="{ class: 'is-penultimate' }"
      />
    </el-aside>
    <el-main class="home-main">
      <el-table :data="tableData" height="calc(100% - 40px)" style="width: 100%" class="home-table">
        <el-table-column v-for="item in tableList" :prop="item.key" :label="item.label"
                         :min-width="item.width">
          <template #default="scope" v-if="item.key === 'tag'">
            <el-tag
                style="margin-right: 5px"
                disable-transitions
                effect="plain"
            >{{ scope.row.tag }}
            </el-tag
            >
            <el-tag
                style="margin-right: 5px"
                type="danger"
                disable-transitions
                effect="plain"
            >{{ '专栏' }}
            </el-tag
            >
          </template>
          <template #default="scope" v-if="item.key === 'operate'">
            <!--            <el-icon>-->
            <!--              <img src="../../assets/images/like.svg" class="body-item-like">-->
            <!--            </el-icon>-->
            <div style="display: flex;align-items: center">
              <el-icon style="margin-right: 5px">
                <img src="../../assets/images/like.svg" style="color: #409EFF;height: 1em;width: 1em;cursor: pointer">
              </el-icon>
              <div style="margin-right: 5px;color: #909399">11.1k</div>
              <el-icon style="cursor: pointer;color: #409EFF;margin-right: 5px">
                <star/>
              </el-icon>
              <div style="margin-right: 5px;color: #909399">11.1k</div>
              <el-icon style="cursor: pointer;color: #409EFF;margin-right: 5px">
                <View/>
              </el-icon>
              <div style="color: #909399">11.1k</div>
            </div>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="date" label="Date"/>-->
        <!--        <el-table-column prop="name" label="Name"/>-->
        <!--        <el-table-column prop="address" label="Address"/>-->
      </el-table>
      <el-pagination
          v-model:currentPage="currentPage3"
          class="home-pagination"
          :page-size="100"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>
<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"
import {watchData} from "./watch.js"

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    tag: "数据结构和算法",
    introduction: 'Docker从入门到入土',
    title: "Docker入门"
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    tag: "云原生",
    introduction: 'Docker从入门到入土',
    title: "Docker入门"
  }
]
let {
  classList,
  tableList,
  orderOptions
} = initData()
let treeRef = ref()
let {treeCheck} = controller(treeRef)
// watchData(classIndex, subClassIndex, date, orderValue)
const tags = ref([
  {type: '', label: 'Tag 1'},
  {type: 'success', label: 'Tag 2'},
  {type: 'info', label: 'Tag 3'},
  {type: 'danger', label: 'Tag 4'},
  {type: 'warning', label: 'Tag 5'},
])
const bodyContent = ref("蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。")

</script>

<style lang="scss">

.home-container {
  height: 100%;

  .home-aside {
    width: 208px;
    padding: 20px;
    border-right: 1px solid #EBEEF5;

    .is-penultimate > .el-tree-node__content > .el-tree-node__label {
      font-size: 13px !important;
      font-weight: 300;
    }

    .main-menu-row {
      height: 100%;

      .main-menu {
        height: 100%;

        .el-menu-item {
          height: 48px;
          padding: 0 16px !important;
        }

        .el-menu-item.is-active {
          background: #e6f7ff;
          border-right: 2px solid;
        }
      }

    }
  }

  .home-main {
    height: 100%;
    padding: 20px;

    .home-table {
      //height: 100%;
    }

    .home-pagination {
      margin-top: 10px;
    }
  }
}
</style>