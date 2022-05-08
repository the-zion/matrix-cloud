<template>
  <el-dialog
      destroy-on-close
      v-model="props.visible"
      :title="props.define.title"
      :width="props.define.width || '50%'"
      :top="props.define.top || '15vh'"
      :before-close="props.define.beforeClose || function (){}"
  >
    <cube-form v-if="props.define.mode === 'form'" :define="props.define.formDefine"></cube-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button :type="btn.type" :disabled="btn.disabled" @click="btn.click" v-for="btn in props.define.footBtn">{{ btn.name }}</el-button>
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

const props = defineProps({
  visible: Boolean,
  define: {
    type: Object,
    default: {}
  }
})
</script>

<style scoped>

</style>