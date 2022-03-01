<template>
  <el-form ref="formRef" :model="props.define.data">
    <el-form-item :label="item.label || ''" v-for="item in props.define.form" :label-width="item.labelWidth">
      <el-row v-if="item.component === 'el-upload'" :align="item.align" :justify="item.justify" :style="item.style">
        <el-upload
            :show-file-list="item.showFileList || false"
            :on-success="item.onSuccess || function (){}"
            :before-upload="item.beforeUpload || function (){}"
            :on-change="item.onChange || function (){}"
            :action="item.action || '#'"
            :auto-upload="item.autoUpload || false"
            :accept="item.accept || '.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF'"
            :limit="item.limit"

        >
          <el-avatar class="el-avatar" :fit="item.fit || 'cover'" :size="item.size"
                     :src="props.define.data.image"></el-avatar>
        </el-upload>
      </el-row>
      <el-input v-if="item.component === 'el-input'" v-model="props.define.data[item.key]"
                :placeholder="item.placeholder"
                :maxlength="item.maxlength"
                show-word-limit
                :style="item.style"></el-input>
      <el-cascader
          v-if="item.component === 'el-cascader'"
          v-model="props.define.data[item.key]"
          :placeholder="item.placeholder"
          :options="item.options"
          :filterable="item.filterable"
          :show-all-levels="item.showAllLevels"
          :style="item.style"
          @change="item.change"
      ></el-cascader>
      <el-row v-show="item.component === 'el-tag'" :style="item.style">
        <el-tag
            v-for="tag in props.define.data[item.key]"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="tagClose(props.define.data[item.key],tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            v-model="inputValue"
            :placeholder="item.placeholder"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="tagInputConfirm(props.define.data[item.key])"
            @blur="tagInputConfirm(props.define.data[item.key])"
        >
        </el-input>
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput(item.ref)">
          + 添加
        </el-button>
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
import {defineProps, nextTick, ref} from "vue"

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

const inputValue = ref('')
const inputVisible = ref(false)
const props = defineProps({
  define: Object
})

function tagClose(tags, tag) {
  tags.splice(tags.indexOf(tag), 1)
}

function showInput(ref) {
  inputVisible.value = true
  // nextTick(() => {
  //   ref.value.input.focus()
  // })
}

function tagInputConfirm(tags) {
  if (inputValue.value) {
    tags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

</script>

<style scoped lang="scss">
.mx-1 {
  margin-left: .25rem;
  margin-right: .25rem;
  margin-bottom: .8rem;
}

.ml-1 {
  margin-left: .25rem;
}

.w-20 {
  display: inline-flex;
  width: 85px;
}
</style>