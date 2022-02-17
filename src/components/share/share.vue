<template>
  <el-space direction="vertical" fill size="small">
    <el-space>
      <el-avatar :size="props.avatarSize || 34" :src="props.data.avatar"></el-avatar>
      <el-row class="name">{{ props.data.name }}</el-row>
      <el-row class="date">{{ props.data.date }}</el-row>
    </el-space>
    <el-space fill>
      <span class="word" :style="props.fontSize && 'font-size:'+props.fontSize+'px'" style="word-break: break-all"
            v-html="textHtml"></span>
    </el-space>
    <el-space size="large">
      <el-space size="small">
        <img src="../../assets/images/like.svg" class="icon">
        <el-row class="count">
          {{ props.data.love >= 1000 ? (props.data.love / 1000).toFixed(1) + 'k' : props.data.love }}
        </el-row>
      </el-space>
      <el-space size="small" v-show="props.data.comment" @click="commentClick">
        <el-icon class="icon">
          <chat-dot-round/>
        </el-icon>
        <el-row class="count">
          {{ props.data.comment >= 1000 ? (props.data.comment / 1000).toFixed(1) + 'k' : props.data.comment }}
        </el-row>
      </el-space>
      <el-row class="word" style="font-size: 12px;cursor: pointer" @click="commentReply">回复</el-row>
    </el-space>
  </el-space>
</template>

<script>
export default {
  name: "CubeShare"
}
</script>

<script setup>
import {defineProps} from "vue";

let emits = defineEmits(['comment-click', 'comment-reply'])
const props = defineProps({
  data: Object,
  fontSize: Number,
  avatarSize: Number
})

let textHtml = props.data.text
if (props.data.relevant) {
  textHtml = '<span style="color:var(--el-color-primary)">' + '@' + props.data.relevant + ':&nbsp&nbsp&nbsp' + '</span>' + textHtml
}

function commentClick() {
  emits('comment-click', "")
}

function commentReply() {
  emits('comment-reply', "")
}
</script>

<style scoped lang="scss">
.name {
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.date {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.word {
  font-size: 15px;
  color: var(--el-text-color-regular);
}

.icon {
  color: var(--el-color-primary);
  height: 1em;
  width: 1em;
  cursor: pointer
}

.count {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

</style>