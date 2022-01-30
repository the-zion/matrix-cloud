<template>
  <el-container class="home-container">
    <el-main class="home-main">
      <el-row class="home-row">
        <div class="home-group-label">所属类目：</div>
        <el-radio-group v-model="classIndex" class="home-radio-group" @change="classSelect">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="index + 1" v-for="(item,index) in classList">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-row>
      <el-row class="home-row" v-if="classIndex !== 0">
        <div class="home-group-label">所属子类：</div>
        <el-radio-group v-model="subClassIndex" @change="subClassSelect">
          <el-radio :label="index" v-for="(item,index) in classList[classIndex-1].child">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-row>
      <el-row class="home-row">
        <div class="home-group-label">筛选排序：</div>
        <el-select v-model="value" class="m-2" placeholder="Select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
      <!--      <el-form ref="formRef" :model="form" label-width="120px">-->
      <!--        <el-form-item label="所属类目：">-->
      <!--          <el-checkbox-group v-model="form.type">-->
      <!--            <el-checkbox label="Online activities" name="type"></el-checkbox>-->
      <!--            <el-checkbox label="Promotion activities" name="type"></el-checkbox>-->
      <!--            <el-checkbox label="Offline activities" name="type"></el-checkbox>-->
      <!--            <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>-->
      <!--          </el-checkbox-group>-->
      <!--        </el-form-item>-->
      <!--      </el-form>-->
    </el-main>
  </el-container>
</template>
<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"

let {classIndex, subClassIndex, classList} = initData()
let {classSelect, subClassSelect} = controller(subClassIndex)
const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

</script>

<style scoped lang="scss">
.home-container {
  height: 100%;

  .home-main {
    margin: 24px 24px 0;
    background: #FFFFFF;


    .home-row {
      align-items: start;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 16px;
      padding-bottom: 11px;

      .home-group-label {
        height: 32px;
        font-size: 13px;
        display: flex;
        align-items: center;
      }

      .home-radio-group {
        width: 90%;
      }
    }

    .home-row:last-child {
      border-bottom: unset;
      margin-bottom: unset;
      padding-bottom: unset;
    }
  }
}
</style>