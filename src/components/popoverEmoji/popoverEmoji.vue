<template>
  <el-popover :placement="props.placement || 'right'" :width="'fit-content'" trigger="hover" popper-class="express-popover">
    <template #reference>
      <el-icon>
        <img src="../../assets/images/smile.svg" style="height: 1.5em;width: 1.5em;cursor: pointer">
      </el-icon>
    </template>
    <cube-emoji @emoji-click="emojiClick"></cube-emoji>
  </el-popover>
</template>

<script>
export default {
  name: "CubePopoverEmoji"
}
</script>
<script setup>

const emit = defineEmits(["emoji-click"])
const props = defineProps({
  placement: String,
})

function emojiClick(emoji) {
  emit("emoji-click", emoji)
}
</script>

<style lang="scss">
.el-popover.express-popover {
  padding: 0 !important;
}
</style>