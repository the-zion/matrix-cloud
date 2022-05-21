<template>
  <el-container class="column-container">
    <el-row justify="space-between">
      <el-upload
          class="cover-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <el-image v-if="imageUrl" :src="imageUrl" class="cover"></el-image>
        <el-icon v-else class="cover-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
      <el-row fill class="info">
        <el-input v-model="title" class="title" size="large" maxlength="50" show-word-limit
                  placeholder="请输入专栏标题"></el-input>
        <el-input
            v-model="introduce"
            class="introduce"
            placeholder="请输入专栏简介"
            type="textarea"
            show-word-limit
            maxlength="100"
            resize="none"
        >
        </el-input>
      </el-row>
    </el-row>
    <el-row class="tag-block" justify="space-between">
      <el-space>
        <el-popover placement="bottom-start" :width="432" trigger="hover" :show-arrow="false">
          <template #reference>
            <el-button icon="Plus" round class="tag-button" type="info" text
                       bg>添加标签
            </el-button>
          </template>
          <matrix-tag v-model:selectedTags="tags"></matrix-tag>
        </el-popover>
        <el-tag
            round
            closable
            type="info"
            size="large"
            v-for="tag in tags"
            :key="tag"
            :disable-transitions="true"
            @close="tagClose(tag)"
        >
          {{ tag }}
        </el-tag>
      </el-space>
    </el-row>
    <el-radio-group v-model="radio" class="radio-group">
      <el-radio :label="1">已选文章</el-radio>
      <el-radio :label="2">可选文章</el-radio>
    </el-radio-group>
    <el-table
        class="table-area"
        ref="multipleTableRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
        height="calc(100% - 373px)"
    >
      <el-table-column fixed type="selection" width="55"/>
      <el-table-column property="title" show-overflow-tooltip label="标题" width="370px"/>
      <el-table-column property="tags" label="标签" width="370px">
        <template #default="scope">
          <el-space class="tags-cell">
            <el-tag v-for="item in scope.row.tags.split(';')" type="info" :key="item"
                    disable-transitions>
              {{ item }}
            </el-tag>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="foot" justify="center" v-show="tableData.length !== 0">
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
      />
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Form"
}
</script>


<script setup>
import {ref} from "vue"
import {error} from "../../../utils/message";

const props = defineProps({
  verify: Boolean
})

let imageUrl = ref("")
let title = ref("")
let introduce = ref("")
let tags = ref([])
let radio = ref(1)

defineExpose({
  imageUrl, title, introduce, tags, radio
})

let currentPage = ref(1)
let tableData = ref([
  {
    title: '深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
  {
    title: '深入剖析kubernetes',
    tags: 'Go;云原生;网络;操作系统;Java;Python',
  },
])


function handleAvatarSuccess() {

}

function beforeAvatarUpload() {

}

function tagClose(tag) {
  tags.value.splice(tags.value.indexOf(tag), 1)
}
</script>

<style scoped lang="scss">
.column-container {
  width: 100%;
  height: 100%;
  flex-direction: column;

  .cover-uploader {
    ::v-deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .cover-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 200px;
      text-align: center;
    }
  }

  .info {
    width: calc(100% - 180px);
    height: 100%;

    .title {
      height: 46px;
      margin-bottom: 10px;
    }

    .introduce {
      height: calc(100% - 58px);

      ::v-deep(.el-textarea__inner) {
        height: 100%;
      }
    }
  }

  .tag-block, .radio-group {
    width: 100%;
    height: 45px;
    margin-top: 15px;
    overflow: auto;

    .tag-button {
      font-weight: 400;
    }
  }

  .table-area {
    width: 100%;
  }

  .foot {
    margin-top: 15px;
  }
}
</style>