<template>
  <el-aside class="aside" width="208px">
    <el-menu
        default-active="0"
        class="aside-menu"
        @select="menuSelect"
    >
      <el-menu-item v-for="(item,index) in props.classList" :index="index+''" class="aside-menu-item"
                    @click="classClick">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "CubeAside"
}
</script>
<script setup>

const emits = defineEmits(["select", "classClick"])
const props = defineProps({
  classList: {
    type: Object,
    default: {}
  },
})

function menuSelect(index, indexPath, item, routeResult) {
  emits("select", index, indexPath, item, routeResult)
}

function classClick(item) {
  emits("classClick", item)
}
</script>

<style scoped lang="scss">
.aside {
  .aside-menu {
    height: 100%;
    border-right: unset;

    .el-menu-item.is-active {
      background: var(--el-menu-hover-bg-color);
    }
  }
}
</style>