<template>
  <el-form ref="formRef" :model="props.define.data" label-width="120px">
    <el-form-item label="" v-for="item in props.define.form" :label-width="item.labelWidth">
      <el-row v-if="item.component === 'el-upload'" :align="item.align" :justify="item.justify" :style="item.style">
        <el-upload
            :show-file-list="item.showFileList || false"
            :on-success="item.onSuccess"
            :before-upload="item.beforeUpload"
            :on-change="item.onChange"
            :action="item.action || '#'"
            :auto-upload="item.autoUpload || false"
            :accept="item.accept || '.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF'"
            :limit="item.limit || 1"

        >
          <el-avatar class="el-avatar" :fit="item.fit || 'cover'" :size="item.size"
                     :src="props.define.data.image"></el-avatar>
        </el-upload>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CubeForm"
}
</script>
<script setup>
import {defineProps, ref} from "vue"

const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const props = defineProps({
  define: Object
})
</script>

<style>
.el-avatar>img {
  width: 100%;
}
</style>