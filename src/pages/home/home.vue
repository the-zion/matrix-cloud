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
      <el-row class="home-bar" justify="space-between">
        <el-row class="title" align="middle">首页</el-row>
        <el-row>
          <el-space size="large">
            <el-select v-model="order" placeholder="Select" @change="filterSelectChange">
              <el-option
                  v-for="item in orderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <el-date-picker v-model="date" type="date" placeholder="请选择时间段" @change="dateSelectChange"></el-date-picker>
          </el-space>
        </el-row>
      </el-row>
      <el-table ref="tableRef" :data="tableData" height="calc(100% - 92px)" class="home-table" highlight-current-row
                row-key="id" :expand-row-keys="expandRowKeys" tooltip-effect="light" @row-click="rowClick"
                :header-cell-style="{'background':'var(--el-bg-color)','height':'45px'}">
        <el-table-column type="expand">
          <template #default="props">
            <el-row style="padding: 16px 60px;height: 240px" align="middle">
              <el-space style="width: 60%" direction="vertical" fill :size="10">
                <el-row style="color: rgba(0,0,0,.85);font-size: 16px;line-height: 24px;">
                  <a>{{ props.row.title }}</a>
                </el-row>
                <el-space wrap :size="10">
                  <el-tag :key="'key1'" effect="dark">{{ props.row.tag }}</el-tag>
                  <el-tag :key="'key2'" effect="dark" type="danger">{{ '专栏' }}</el-tag>
                </el-space>
                <el-descriptions>
                  <el-descriptions-item label="段落示意:">{{ props.row.content || '暂无' }}</el-descriptions-item>
                </el-descriptions>
                <el-space style="width: 100%"  direction="horizontal">
                  <el-space  @click="userClick" :size="3">
                    <el-row  style="cursor: pointer">
                      <el-avatar :size="24" :src="'../src/assets/images/user.jpg'"></el-avatar>
                    </el-row>
                    <el-row :span="4" style="font-size: 14px;color: #409EFF;cursor: pointer">{{'付小小'}}</el-row>
                  </el-space>
                  <el-space :size="3">
                    <el-row style="color: rgb(144, 147, 153);">
                      <el-icon><clock/></el-icon>
                    </el-row>
                    <el-row  style="font-size: 13px;color: rgb(144, 147, 153);">
                      {{ '2022-01-31 15:22' }}
                    </el-row>
                  </el-space>
                </el-space>
              </el-space>
              <el-row style="height: 100%;width:40%;" align="middle" justify="center">
                <el-image
                    style="height: 70%;width:60%;border-radius: 5px"
                    :src="'../src/assets/images/picture1.jpg'"
                    fit="cover"
                    :preview-src-list="['../src/assets/images/picture1.jpg']"
                    append-to-body
                ></el-image>
              </el-row>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column v-for="item in tableList" :prop="item.key" :label="item.label"
                         :min-width="item.width" :show-overflow-tooltip="true">
          <template #default="scope" v-if="item.key === 'title'">
            <el-row style="color: #409EFF">{{ scope.row.title }}</el-row>
          </template>
          <template #default="scope" v-if="item.key === 'name'">
            <el-space style="cursor: pointer" :size="1">
              <el-avatar style="margin-right: 5px" :size="20" src="../src/assets/images/user.jpg"
              ></el-avatar>
              <el-row style="width: 60%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{
                  scope.row.name
                }}
              </el-row>
            </el-space>
          </template>
          <template #default="scope" v-if="item.key === 'tag'">
            <el-tag
                style="margin-right: 5px"
                disable-transitions
                effect="dark"
            >{{ scope.row.tag }}
            </el-tag>
            <el-tag
                style="margin-right: 5px"
                type="danger"
                disable-transitions
                effect="dark"
            >{{ '专栏' }}
            </el-tag
            >
          </template>
          <template #default="scope" v-if="item.key === 'operate'">
            <el-space :size="10">
              <el-space :size="1">
                <el-icon>
                  <img src="../../assets/images/like.svg" style="color: #409EFF;height: 1em;width: 1em;cursor: pointer">
                </el-icon>
                <el-row style="color: #909399">11.1k</el-row>
              </el-space>
              <el-space :size="1">
                <el-icon style="cursor: pointer;color: #409EFF">
                  <star/>
                </el-icon>
                <el-row style="color: #909399">11.1k</el-row>
              </el-space>
              <el-space :size="1">
                <el-icon style="cursor: pointer;color: #409EFF">
                  <View/>
                </el-icon>
                <el-row style="color: #909399">11.1k</el-row>
              </el-space>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:currentPage="currentPage"
          class="home-pagination"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
          @current-change="pageCurrentChange"
      >
      </el-pagination>
    </el-main>
  </el-container>

</template>
<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"


const tableData = [
  {
    id: '1',
    date: '2016-05-03',
    name: 'TomTomTomTomTomTomTom',
    tag: "数据结构和算法",
    introduction: 'Docker从入门到入土Docker从入门到入土Docker从入门到入土Docker从入门到入土',
    content: '容器其实是一种沙盒技术。顾名思义，沙盒就是能够像一个集装箱一样，把你的应用“装”起来的技术。这样，应用与应用之间，就因为有了边界而不至于相互干扰。',
    title: "Docker入门"
  },
  {
    id: '2',
    date: '2016-05-03',
    name: 'SandySandySandy',
    tag: "云原生",
    introduction: 'Docker从入门到入土',
    title: "Docker入门"
  },
  {
    id: '3',
    date: '2016-05-03',
    name: 'SandySandySandy',
    tag: "云原生",
    introduction: 'Docker从入门到入土',
    title: "Docker入门"
  }
]

const value = ref('')

let {
  treeRef,
  order,
  date,
  tableRef,
  expandRowKeys,
  classList,
  tableList,
  orderOptions,
  currentPage,
} = initData()

let {
  treeCheck,
  filterSelectChange,
  dateSelectChange,
  rowClick,
  userClick,
  pageCurrentChange
} = controller(treeRef, tableRef)


// watchData(classIndex, subClassIndex, date, orderValue)
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

    .home-bar {
      margin-bottom: 20px;

      .filter-select {
        margin: 0 10px;
      }
    }

    .home-table {
      width: 100%;

      .el-scrollbar {
        --el-scrollbar-opacity: 0;
      }
    }


    .home-pagination {
      margin-top: 10px;
    }
  }
}

</style>
