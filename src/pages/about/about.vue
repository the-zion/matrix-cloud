<template>
  <el-button

      class="button"
      type="primary"
      text
      bg
      loading
  >{{ "点击获取" }}
  </el-button>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import type { UploadFile } from 'element-plus'

const formRef = ref()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
  console.log(formRef)
}
</script>
