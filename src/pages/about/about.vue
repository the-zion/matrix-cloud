<template>
  <el-upload action="#" list-type="picture-card" :auto-upload="false" ref="uploadRef" limit="3"
             :on-exceed="pictureExceed">
    <template #default>
      <el-icon>
        <plus/>
      </el-icon>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
        <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><delete/></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus'

const uploadRef = ref()
const handleRemove = (file) => {
  uploadRef.value.handleRemove(file)
}

function pictureExceed() {
  ElMessage({
    message: '最多允许上传3张图片',
    type: 'warning',
  })
}
</script>