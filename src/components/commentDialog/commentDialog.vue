<template>
  <el-dialog
      v-model="props.visible"
      title="查看对话"
      width="45%"
      :top="props.top || '15vh'"
      @closed="dialogClosed"
  >
    <el-row class="body" align="top">
      <el-space fill direction="vertical" class="space" size="large">
        <cube-reply :data="props.data" :like="true"></cube-reply>
        <el-row class="separate"></el-row>
        <el-empty v-if="!subData.length" description="暂无回复哦，来做第一个吧~"></el-empty>
        <el-space fill :size="30">
          <cube-reply v-if="subData.length" v-for="item in subData" :data="item" :reply="true" :like="true"></cube-reply>
        </el-space>
      </el-space>
    </el-row>
    <template #footer>
      <cube-input :placeholder="'回复：'+props.data.name" @textarea-input="textareaInput"></cube-input>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "CubeCommentDialog",
}
</script>
<script setup>
import {defineProps, ref} from "vue";

let textarea = ref('')
const props = defineProps({
  visible: Boolean,
  top: String,
  data: Object,
  subData: Array
})
const emit = defineEmits(["update:visible"])
const subData = ref([])

for (let i = 0; i < 10; i++) {
  subData.value.push({
    id: i,
    avatar: '../../src/assets/images/user1.png',
    name: '刘思圆',
    relevant: "刘思圆",
    date: '2022-2-12 20:56:30',
    text: '我觉得，一个人要想活得有朝气，就得没谱儿，得有新东西进来，新东西出去，得完全不知道明天会发生什么，如果还能一直有“新喜欢的东西”和“新不喜欢的东西”那就太幸福了',
    love: 1298,
  })
}

function dialogClosed() {
  emit("update:visible", false)
}

function textareaInput(text) {
  textarea.value = text
  console.log(text)
}

console.log(props.data)
console.log(props.subData)
</script>

<style scoped lang="scss">
.body {
  width: 100%;
  height: 580px;
  overflow: auto;

  .space {
    width: 100%;
    height: fit-content;

    .separate {
      height: 8px;
      background: #f5f8fa;
    }
  }
}
</style>