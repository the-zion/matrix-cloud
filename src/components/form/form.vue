<template>
  <el-form ref="formRef" :model="props.define.data" :rules="props.define.rules" :label-position="props.define.position"
           @validate="props.define.validate">
    <el-form-item :label="item.label || ''" v-for="item in props.define.form" :label-width="item.labelWidth"
                  :prop="item.key">
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
          <el-avatar v-if="item.type === 'avatar'" :fit="item.fit || 'cover'" :size="item.size"
                     :src="props.define.data.image"></el-avatar>
          <el-image :style="item.imageStyle" v-if="item.type !== 'avatar'" :fit="item.fit || 'cover'" :size="item.size"
                    :src="props.define.data.image">
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <Picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </el-upload>
      </el-row>
      <el-input v-if="item.component === 'el-input'" v-model="props.define.data[item.key]"
                :placeholder="item.placeholder"
                :type="item.type"
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
      <el-select v-if="item.component === 'el-select'" v-model="props.define.data[item.key]"
                 :placeholder="item.placeholder" :size="item.size" :style="item.style" @change="item.change">
        <el-option
            v-for="item_ in item.options"
            :key="item_.value"
            :label="item_.label"
            :value="item_.value"
        >
        </el-option>
      </el-select>
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

const inputValue = ref('')
const inputVisible = ref(false)
const props = defineProps({
  define: {
    type: Object,
    default: {}
  }
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

.el-avatar::v-deep(img) {
  width: 100%;
}

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

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: var(--el-text-color-secondary);
  font-size: 30px;
  ::v-deep(.el-icon) {
    font-size: 30px;
  }
  .el-icon {
    font-size: 30px;
  }
}

</style>