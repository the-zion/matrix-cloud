<template>
  <el-container class="navigation-container">
    <el-row class="title" align="middle" justify="center">
      <el-icon class="icon">
        <Promotion/>
      </el-icon>
      <span>消息中心</span>
    </el-row>
    <el-row class="each" v-for="item in navigation" @click="select(item)" align="middle" justify="center"
            :class="{'select': currentMenu === item.key}">
      <el-icon class="icon">
        <component :is="item.icon"></component>
      </el-icon>
      <el-badge :value="item.key === 'comment'?(props.comment + props.subComment):props.system"
                :is-dot="item.key === 'timeline' && props.active" :max="99"
                :hidden="item.key === 'timeline'?!props.active:(item.key === 'comment'?(props.comment + props.subComment) === 0:props.system === 0)">
        <span>{{ item.label }}</span>
      </el-badge>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<script setup>
import {onMounted, ref} from "vue";
import router from "../../../router";
import {removeScrollToBottomListen} from "../../../utils/scroll";
import {useRoute} from "vue-router";

const props = defineProps({
  active: Boolean,
  comment: Number,
  subComment: Number,
  system: Number,
})

let navigation = [{
  key: "timeline",
  label: "用户动态",
  icon: "Avatar",
  router: "message.timeline"
}, {
  key: "comment",
  label: "回复我的",
  icon: "Comment",
  router: "message.comment"
}, {
  key: "notification",
  label: "系统通知",
  icon: "Message",
  router: "message.notification"
}]

let currentMenu = ref(useRoute().name.split("message.")[1])

function select(item) {
  removeScrollToBottomListen()
  currentMenu.value = item.key
  router.push({name: item.router})
}

</script>

<style scoped lang="scss">
.navigation-container {
  flex-direction: column;

  .title {
    width: 100%;
    height: 60px;
    font-size: 15px;

    .icon {
      margin-right: 10px;
    }
  }

  .each {
    width: 100%;
    height: 40px;
    font-size: 15px;
    cursor: pointer;
    color: var(--el-text-color-secondary);

    .icon {
      margin-right: 10px;
    }
  }

  .select {
    color: var(--el-color-primary)
  }

  .each:hover {
    color: var(--el-color-primary)
  }
}

</style>