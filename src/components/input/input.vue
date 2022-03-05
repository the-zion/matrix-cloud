<template>
  <el-row justify="space-between">
    <el-input
        v-model="textarea"
        class="textarea"
        maxlength="300"
        :placeholder="props.placeholder || ''"
        rows="1"
        show-word-limit
        type="textarea"
        @input="textInput"
    />
    <el-row class="popover" align="middle">
      <cube-popover-emoji :placement="'top'" @emoji-click="handleEmojiClick"></cube-popover-emoji>
    </el-row>
    <el-button type="primary">发送</el-button>
  </el-row>
</template>

<script>
export default {
  name: "CubeInput"
}
</script>
<script setup>
import {ref} from 'vue'

const textarea = ref('')
const props = defineProps({
  placeholder: String,
})
const emit = defineEmits(['textarea-input'])

function handleEmojiClick(emoji) {
  textarea.value += emoji
  emit('textarea-input', textarea.value)
}

function textInput(text) {
  emit('textarea-input', text)
}
</script>

<style scoped lang="scss">
.textarea {
  width: 80%;
}

.popover {
  height: 32px;
}
</style>