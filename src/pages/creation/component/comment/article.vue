<template>
  <el-container class="article-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span class="statistic">{{ "共计：" + (props.statistic["article" + mode + (currentSelect === 'comment'?'':'Sub')] || 0) }}</span>
      <el-select class="select" v-model="currentSelect" placeholder="选择评论类型" @change="selectChange">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-row>
    <el-row class="body">
      <Reply v-if="mode === 'Reply' && currentSelect === 'comment'" :creation="'article'"></Reply>
      <ReplySub v-if="mode === 'Reply' && currentSelect === 'sub-comment'" :creation="'article'"></ReplySub>
      <Replied v-if="mode === 'Replied' && currentSelect === 'comment'" :creation="'article'"></Replied>
      <RepliedSub v-if="mode === 'Replied' && currentSelect === 'sub-comment'" :creation="'article'"></RepliedSub>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Article"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue";
import Reply from "../../../comment/component/reply.vue";
import RepliedSub from "../../../comment/component/replied_sub.vue";
import ReplySub from "../../../comment/component/reply_sub.vue";
import Replied from "../../../comment/component/replied.vue";
import {removeScrollToBottomListen} from "../../../../utils/scroll";

const emits = defineEmits(["row-delete"])
const props = defineProps({
  mode: {
    default: "Reply",
    type: String
  },
  statistic: {
    default: {},
    type: Object
  }
})

let options = ref([
  {
    label: "主评论",
    value: "comment"
  },
  {
    label: "二级评论",
    value: "sub-comment"
  }
])
let currentSelect = ref("comment")
let mode = ref("Reply")

function selectChange(value) {
  removeScrollToBottomListen()
  currentSelect.value = value
}

function init() {
  initData()
}

function initData() {
  mode.value = props.mode
}


function rowDelete() {
  emits("row-delete")
}

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang="scss">
.article-container {
  width: 100%;
  flex-direction: column;

  .bar {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid var(--el-border-color-light);

    .statistic {
      color: var(--el-text-color-secondary);
      font-size: 14px
    }
  }

  .body {
    width: 100%;
  }
}
</style>