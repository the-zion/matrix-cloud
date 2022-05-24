<template>
  <el-container class="column">
    <el-row class="head" justify="space-between">
      <el-space class="menu" :size="32">
        <el-row class="each" :class="{'menu-select':current === item.key}" v-for="item in menu" :key="item.key"
                @click="current = item.key" align="middle">
          {{ item.label }}
        </el-row>
      </el-space>
      <el-space class="operate">
        <el-input
            class="input"
            v-model="input"
            placeholder="题目/标签/作者/内容"
            suffix-icon="Search"
        />
        <el-button round type="primary" icon="Plus" @click="create">专栏创建</el-button>
      </el-space>
    </el-row>
    <el-row class="tag-block" align="middle" justify="space-between">
      <el-space class="tags">
        <el-tag
            style="cursor: pointer"
            v-for="item in tags"
            :key="item.label"
            :effect="item.select?'dark':'light'"
            round
            @click="selectTag(item)"
        >
          {{ item.label }}
        </el-tag>
      </el-space>
      <el-space :size="3" class="tag-filter" @click="tagFilter = true">
        <el-icon>
          <Filter/>
        </el-icon>
        <span>筛选器</span>
      </el-space>
      <el-dialog
          v-model="tagFilter"
          destroy-on-close
          :width="480"
          custom-class="tag-filter-dialog"
          @close="tagFilter = false"

      >
        <matrix-tag v-model:selectedTags="selectedTags"></matrix-tag>
        <template #footer>
          <span>
            <el-button @click="tagFilter = false" round>取消</el-button>
            <el-button @click="filterByTags" round type="primary"
            >确定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-row>
    <matrix-column-list shape="card" :gap="10" :page-background="true"></matrix-column-list>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import {goToPage} from "../../utils/globalFunc";

let input = ref()
let current = ref("hot")
let menu = ref([
  {
    key: "hot",
    label: "最热"
  }, {
    key: "new",
    label: "最新"
  }, {
    key: "collect",
    label: "收藏最多"
  }, {
    key: "view",
    label: "浏览最多"
  }
])

let tagFilter = ref(false)
let tags = ref([{
  label: "go",
  select: false
}, {
  label: "k8s",
  select: false
}, {
  label: "云原生",
  select: false
}, {
  label: "python",
  select: false
}, {
  label: "docker",
  select: false
}])
let selectedTags = ref([])

function selectTag(each) {
  each.select = !each.select
}

function filterByTags() {

}

function create() {
  goToPage("column.write")
}

</script>

<style scoped lang="scss">
.column {
  width: 100%;
  flex-direction: column;

  .head {
    width: 100%;
    margin-bottom: 14px;

    .menu {
      .each {
        color: var(--el-text-color-secondary);
        cursor: pointer;
        height: 32px;
      }

      .menu-select {
        font-weight: 500;
        color: var(--el-text-color-primary);
        border-bottom: 2px solid var(--el-text-color-primary);
      }
    }

    .operate {
      .input {
        width: 250px;
      }
    }
  }

  .tag-block {
    width: 100%;
    margin-bottom: 14px;

    .tags {
      width: calc(100% - 65px);
    }

    .tag-filter {
      font-size: 14px;
      color: var(--el-text-color-secondary);
      cursor: pointer;
    }

    .tag-filter:hover {
      color: var(--el-color-primary);
    }

    ::v-deep(.tag-filter-dialog) {
      border-radius: 8px;

      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        padding: 20px 20px 0 20px
      }
    }
  }

  .body {
    width: 100%;
  }
}
</style>