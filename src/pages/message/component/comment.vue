<template>
  <el-container class="comment-container">
    <el-row class="head-block" align="middle">
      <el-badge v-for="item in menu" :value="item.key === 'comment'?props.comment:props.subComment" :max="99"
                :hidden="item.key === 'comment'?(props.comment === 0):(props.subComment === 0)">
         <span class="label" @click="selectMenu(item)"
               :class="{'select':currentSelect === item.key}">{{ item.label }}</span>
      </el-badge>
    </el-row>
    <el-row class="comment-block">
      <message-replied v-if="currentSelect === 'comment'"></message-replied>
      <message-replied-sub v-if="currentSelect === 'sub_comment'"></message-replied-sub>
    </el-row>
  </el-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {get, post} from "../../../utils/axios";
import {baseMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia";
import MessageReplied from "../../comment/component/message.vue";
import MessageRepliedSub from "../../comment/component/message_sub.vue";

const baseStore = baseMainStore()
const {avatar} = storeToRefs(baseStore)
const props = defineProps({
  comment: Number,
  subComment: Number,
})
const emits = defineEmits(["update:comment", "update:subComment"])

let count = 0
let current = 0
let loading = ref(false)
let menu = ref([{
  key: "comment",
  label: "主评论",

}, {
  key: "sub_comment",
  label: "二级评论"
}])
let currentSelect = ref("comment")

function init() {
}

function selectMenu(item) {
  currentSelect.value = item.key
  post(item.key === "comment" ? "/v1/remove/mailbox/comment/count" : "/v1/remove/mailbox/subcomment/count", {})
  emits(item.key === "comment"?"update:comment":"update:subComment", 0)
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.comment-container {
  width: 100%;
  flex-direction: column;

  .head-block {
    width: 100%;
    height: 55px;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-lighter);
    background-color: var(--el-color-white);

    .label {
      margin-left: 20px;
      cursor: pointer;
      color: var(--el-text-color-secondary)
    }

    .select {
      color: var(--el-color-primary)
    }
  }

  .comment-block {
    margin-top: 10px;
    min-height: 800px;
    width: 100%;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-lighter);
    background-color: var(--el-color-white);
  }
}
</style>