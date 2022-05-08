<template>
  <el-row class="express">
    <el-space class="space" direction="vertical" fill size="large">
      <el-input
          v-model="textarea"
          :maxlength="props.textNumberMax || 1000"
          placeholder="输入你要发表的内容"
          show-word-limit
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 5 }"
          @input="inputChange"
          resize="none"
      />
      <el-row align="middle" justify="space-between">
        <cube-popover-emoji @emoji-click="handleEmojiClick"></cube-popover-emoji>
        <el-button v-if="props.mode === 'comment'" type="primary">发表</el-button>
      </el-row>

      <el-upload v-if="props.mode === 'picture'" action="#" list-type="picture-card" :auto-upload="false"
                 ref="uploadRef" :limit="3"
                 :on-exceed="pictureExceed" :before-upload="beforeAvatarUpload" :on-change="beforeAvatarUpload"
                 accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF">
        <template #default>
          <el-icon>
            <plus/>
          </el-icon>
        </template>
        <template #file="{ file }">
          <el-row>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
            <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><delete/></el-icon>
          </span>
        </span>
          </el-row>
        </template>
      </el-upload>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "CubeExpress",
}
</script>
<script setup>
import {ref} from 'vue'
import {VuemojiPicker} from 'vuemoji-picker'
import {ElMessage} from "element-plus";

const textarea = ref('')
let emits = defineEmits(['update:textArea', 'update:picturesBox'])
const handleEmojiClick = function (emoji) {
  textarea.value += emoji
  emits('update:textArea', textarea.value)
}

function inputChange(text) {
  emits('update:textArea', text)
}

let props = defineProps({
  mode: String,
  textArea: String,
  textNumberMax: Number,
  picturesBox: null
})
//--------- if the mode is picture ---------
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

function beforeAvatarUpload(fileObject, fileObjectList) {
  let file = fileObject.raw
  const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('只能上传 JPG/PNG/GIF 格式的图片!')
    uploadRef.value.handleRemove(fileObject)
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不得大于 2MB!')
    uploadRef.value.handleRemove(fileObject)
  }
  emits('update:picturesBox', fileObjectList)
  return isJPG && isLt2M
}
</script>

<style scoped lang="scss">

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 148px;
  height: 148px;
  object-fit: cover;
}

.el-popover.express-popover {
  padding: 0 !important;
}

.express {
  margin: 0 15px;

  .space {
    width: 100%;
  }
}

</style>