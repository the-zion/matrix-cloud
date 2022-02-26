<template>
  <el-space direction="vertical" fill :size="30" :style="props.style">
    <el-space>
      <el-avatar :size="props.avatarSize || 34" :src="props.data.avatar"></el-avatar>
      <el-row class="name">{{ props.data.name }}</el-row>
      <el-row class="date">{{ props.data.date }}</el-row>
    </el-space>
    <el-space fill>
      <el-row class="word" :style="props.fontSize && 'font-size:'+props.fontSize+'px'">{{ props.data.text }}</el-row>
    </el-space>
    <el-space>
      <el-image :preview-src-list="['../../src/assets/images/'+image]" v-for="image in props.data.images"
                :src="'../../src/assets/images/'+image" class="image-item"></el-image>
    </el-space>
    <el-space size="large">
      <el-space size="small">
        <el-icon class="iconfont icon-like icon"></el-icon>
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

let emits = defineEmits(['comment-click'])
const props = defineProps({
  data: Object,
  fontSize: Number,
  avatarSize: Number,
  style: String
})

function commentClick() {
  emits('comment-click', "")
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

.image-item {
  width: 120px;
  height: 120px;
  margin-right: 20px;
  border-radius: 5px;
}

.word {
  font-size: 15px;
}

.icon {
  color: var(--el-text-color-secondary);
  height: 1em;
  width: 1em;
  cursor: pointer
}

.count {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

</style>