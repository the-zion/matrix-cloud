<template>
  <el-form>
    <el-row v-for="i in [1]" :key="i">
      <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
          style="display: inline-flex;width: 80px"
          v-if="inputVisible"
          placeholder="请输入"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
        + New Tag
      </el-button>
    </el-row>
  </el-form>
</template>

<script setup>
import {ref, nextTick} from 'vue'

const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
// const test = ref()

const InputRef = ref([])

// function InputRef(el) {
//   test.value = el
//   console.log(el.focus())
// }

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    // console.log(InputRef)
    // InputRef.focus()
  })
}

const handleInputConfirm = () => {
  debugger
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
