<template>
  <el-dialog
      destroy-on-close
      v-model="props.visible"
      :title="props.define.title"
      :width="props.define.width"
      :top="props.define.top"
      :before-close="props.define.beforeClose"
  >
    <cube-form v-if="props.define.mode === 'form'" :define="props.define.formDefine"></cube-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button :type="btn.type" @click="btn.click" v-for="btn in props.define.footBtn">{{ btn.name }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "CubeDialog",
}
</script>
<script setup>
import {defineProps} from "vue";

const props = defineProps({
  visible: Boolean,
  define: Object
})
</script>

<style scoped>

</style>