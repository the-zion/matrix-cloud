<template>
  <el-container class="column-container">
    <el-row class="header" justify="end">
      <el-button @click="close">取消</el-button>
      <el-button @click="create" type="primary">专栏创建</el-button>
    </el-row>
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
        >
        </el-input>
      </el-row>
    </el-row>
    <el-row class="tag-block" justify="space-between">
      <el-space wrap>
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
    <el-table
        class="table"
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column property="title" label="标题" width="120"/>
      <el-table-column property="tags" label="标签" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: "MatrixWriteColumn"
}
</script>

<script setup>
import {ref} from "vue"
import {error} from "../../utils/message";

const emits = defineEmits(["close"])

let imageUrl = ref()
let title = ref("")
let introduce = ref("")
let tags = ref([])

function close() {
  emits("close", "")
}

function create() {
  // if (tags.value.length === 0) {
  //   error("标签不能为空")
  //   return null
  // }
}

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

  .header {
    width: 100%;
    margin-bottom: 15px;
  }

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

  .tag-block {
    width: 100%;
    height: 45px;
    margin-top: 15px;

    .tag-button {
      font-weight: 400;
    }
  }

  .table {
    margin-top: 15px;
  }

}
</style>