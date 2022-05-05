<template>
  <el-container class="calendar">
    <el-row class="block">
      <el-row class="title" justify="space-between">
        <el-space alignment="center" class="static">
          <span class="word">{{ time }}</span>
          <span class="word">共发表博客</span>
          <span class="num">{{ nums }}</span>
          <span class="word">篇</span>
        </el-space>
        <el-select v-model="time" class="select" placeholder="选择年份">
          <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-row>
      <el-row class="body" id="calendar"></el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "CubeUserCalendar"
}
</script>

<script setup>
import {ref, onMounted} from "vue"
import {globalFunc} from "../../../../utils/globalFunc";
// import * as echarts from 'echarts';


import {initData} from "../../initData";

const {echartsInit} = globalFunc()
let echarts = echartsInit()
let chart = null
const {calendarOptions} = initData()

let date = new Date()
let year = date.getFullYear()
let time = ref(year)
let nums = ref(0)
const options = [year, year - 1, year - 2]

function getVirtulData(year) {
  year = year || '2017';
  let date = +echarts.number.parseDate(year + '-01-01');
  let end = +echarts.number.parseDate(+year + 1 + '-01-01');
  let dayTime = 3600 * 24 * 1000;
  let data = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 5)
    ]);
  }
  return data;
}

function setCalenderOptions(year) {
  for (let i = 1; i <= 12; i++) {
    calendarOptions.calendar.push({
      top: 0,
      yearLabel: {
        show: false,
      },
      dayLabel: {
        show: false,
      },
      monthLabel: {
        position: "end",
      },
      cellSize: 13,
      range: year + '-' + (i < 10 ? '0' + i : i),
      left: (i - 1) * 65
    })
    // calendarOptions.series.push({
    //   type: 'heatmap',
    //   coordinateSystem: 'calendar',
    //   calendarIndex: i - 1,
    //   data: [[year + "-" + (i < 10 ? '0' + i : i) + '-01'], 5]
    // })
  }
  calendarOptions.series = [{
    type: 'heatmap',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: [["2022-02-01", 100]]
  }]
  // calendarOptions.series.data = getVirtulData(year)
  chart.setOption(calendarOptions)
}

onMounted(() => {
  chart = echarts.init(document.getElementById('calendar'));
  setCalenderOptions("2022")
})


</script>
<style scoped lang="scss">
.calendar {
  min-height: 100px;
  padding: 1rem;

  .block {
    width: 100%;

    .title {
      width: 100%;
      height: fit-content;

      .static {
        height: fit-content;

        .word {
          font-size: 1rem;
          line-height: 1.5rem;
          color: var(--el-text-color-regular);
        }

        .num {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 500;
        }
      }

      .select {
        width: 100px;
      }
    }

    .body {
      width: 100%;
      height: 120px;
    }
  }
}
</style>