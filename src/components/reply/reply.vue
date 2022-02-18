<template>
  <el-space fill>
    <el-row align="middle" justify="space-between">
      <el-space>
        <el-avatar :size="34" :src="props.data.avatar"></el-avatar>
        <el-row>{{ props.data.name }}</el-row>
        <el-row class="reply" v-if="props.data.relevant">{{ '回复' }}</el-row>
        <el-row v-if="props.data.relevant">{{ props.data.relevant }}</el-row>
      </el-space>
      <el-row class="date">{{ props.data.date }}</el-row>
    </el-row>
    <el-row class="word">{{ props.data.text }}</el-row>
    <el-space size="small">
      <el-space size="small" v-if="props.like">
        <el-icon class="iconfont icon-like icon"></el-icon>
        <el-row class="count">{{
            props.data.love >= 1000 ? (props.data.love / 1000).toFixed(1) + 'k' : props.data.love
          }}
        </el-row>
      </el-space>
      <el-space v-if="props.comment">
        <el-icon @click="commentClick" class="icon">
          <chat-dot-round/>
        </el-icon>
        <el-row class="count">{{
            props.data.comment >= 1000 ? (props.data.comment / 1000).toFixed(1) + 'k' : props.data.comment
          }}
        </el-row>
      </el-space>
      <el-row v-if="props.reply" class="reply" style="cursor: pointer" @click="replyClick">{{ '回复' }}</el-row>
    </el-space>
    <el-space v-if="replyVisible" fill>
      <cube-input :placeholder="'回复：'+props.data.name" @textarea-input="textareaInput"></cube-input>
    </el-space>
  </el-space>

</template>
<script>
export default {
  name: "CubeReply",
}
</script>
<script setup>
import {defineProps, ref} from "vue";

const textarea = ref('')
const replyVisible = ref(false)
const emit = defineEmits(["comment-click"])
const props = defineProps({
  data: Object,
  reply: Boolean,
  comment: Boolean,
  like: Boolean
})

function textareaInput(text) {
  textarea.value = text
}

function commentClick() {
  emit("comment-click", "")
}

function replyClick() {
  replyVisible.value = !replyVisible.value
}
</script>

<style scoped lang="scss">
.word {
  font-size: 14px;
}

.reply, .date, .count {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.icon {
  cursor: pointer;
  font-size: 16px;
  color: var(--el-text-color-secondary);
}

</style>