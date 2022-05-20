<template>
  <el-row class="tag">
    <el-row class="head" justify="center" align="middle">标签</el-row>
    <el-input @keyup="keyup" v-model="input" class="input" maxlength="20" show-word-limit
              placeholder="Enter键添加自定义标签"></el-input>
    <el-row class="body">
      <el-row class="aside">
        <span v-for="(item, index) in tags" class="each" :class="{'select':index === current}"
              @click="select(index)">{{ item.label }}</span>
      </el-row>
      <el-row class="main">
        <el-space wrap size="large">
          <el-tag style="cursor: pointer" type="info" :label="item" v-for="item in tags[current].children"
                  @click="tagSelect(item)">{{
              item
            }}
          </el-tag>
        </el-space>
      </el-row>
    </el-row>
    <el-row class="foot" justify="space-between" align="middle">
      <span></span>
      <el-space class="tags">
        <el-tag closable @close="tagClose(item)" v-for="item in props.selectedTags ">{{ item }}</el-tag>
      </el-space>
      <span class="tip">{{ "还可选择" + (5 - props.selectedTags.length) + "个标签" }}</span>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixTag"
}
</script>

<script setup>
import {getTags} from "../../utils/tag";
import {ref} from "vue"


const props = defineProps({
  selectedTags: {
    type: Array,
    default: []
  }
})

let tags = getTags()
let current = ref(0)
let input = ref()

// let selectedTags = ref()


function select(index) {
  current.value = index
}

function tagSelect(tag) {
  if (props.selectedTags.length === 5 || props.selectedTags.includes(tag)) {
    return
  }
  props.selectedTags.push(tag)
  // selectedTags.value =  props.selectedTags
}

function tagClose(tag) {
  props.selectedTags.splice(props.selectedTags.indexOf(tag), 1)
}

function keyup(event) {
  let str = input.value.replace(/\s+/g, "")
  if (event.keyCode !== 13 || !str) {
    return
  }
  tagSelect(str)
}
</script>

<style scoped lang="scss">
.tag {
  width: 100%;

  .head {
    width: 100%;
    height: 32px;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }

  .input {
    height: 36px;
  }

  .body {
    width: 100%;
    height: 100%;
    min-height: 264px;
    margin-top: 10px;

    .aside {
      width: 150px;
      height: 100%;
      overflow: auto;
      border-right: 1px solid var(--el-border-color-light);

      .each {
        width: 100%;
        height: 32px;
        list-style: none;
        font-weight: 400;
        cursor: pointer;
        margin-top: 3px;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        padding-left: 16px;
      }

      .select {
        color: var(--el-color-primary);
      }
    }

    .main {
      width: calc(100% - 150px);
      height: 100%;
      overflow: auto;
      padding: 0 10px;
    }
  }

  .foot {
    width: 100%;
    height: 35px;
    margin-top: 10px;

    .tags {
      width: calc(100% - 100px);
      overflow-x: auto;
      flex-wrap: unset;
      cursor: pointer;
    }

    .tip {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>