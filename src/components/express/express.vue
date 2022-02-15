<template>
  <div class="express">
    <el-input
        v-model="textarea"
        maxlength="1000"
        placeholder="输入你要发表的内容"
        show-word-limit
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 5 }"
        @input="inputChange"
    />
    <el-space class="space" :size="30">
      <el-popover placement="bottom" :width="'fit-content'" trigger="hover">
        <template #reference>
          <el-icon>
            <img src="../../assets/images/smile.svg" style="height: 1.5em;width: 1.5em;cursor: pointer">
          </el-icon>
        </template>
        <VuemojiPicker @emojiClick="handleEmojiClick"/>
      </el-popover>
    </el-space>
    <el-upload v-if="props.mode === 'picture'" class="upload" action="#" list-type="picture-card" :auto-upload="false"
               ref="uploadRef" limit="3"
               :on-exceed="pictureExceed" :before-upload="beforeAvatarUpload" :on-change="beforeAvatarUpload"
               accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF">
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
  </div>
</template>

<script>
export default {
  name: "CubeExpress"
}
</script>
<script setup>
import {defineProps, ref} from 'vue'
import {VuemojiPicker} from 'vuemoji-picker'
import {ElMessage} from "element-plus";

const textarea = ref('')
let emitsTextarea = defineEmits('update-textarea')
const handleEmojiClick = function (emoji) {
  textarea.value += emoji.unicode
  emitsTextarea('update-textarea', textarea.value)
}

function inputChange(text) {
  emitsTextarea('update-textarea', text)
}

let props = defineProps({
  mode: String
})
//--------- if the mode is picture ---------
const uploadRef = ref()
// let picturesEmits = defineEmits('update-picture')

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
  picturesEmits('update-picture', fileObjectList)
  return isJPG && isLt2M
}
</script>

<style scoped lang="scss">
.express {
  margin: 0 15px;

  .space {
    margin-top: 20px;
    margin-left: 5px;

  }

  .upload {
    margin-top: 20px;
  }
}

</style>