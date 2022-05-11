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
  name: "MatrixUserCalendar"
}
</script>

<script setup>
import {ref, onMounted} from "vue"
import {echartsInit} from "../../../../utils/globalFunc"

let date = new Date()
let year = date.getFullYear()
let time = ref(year)
let nums = ref(0)
let echarts = echartsInit()
let chart = null
const options = [year, year - 1, year - 2]

let calendarOptions = {
  tooltip: {
    show: true,
    formatter: function (params) {
      return params.value[0] + ' ' + params.value[1] + '篇';
    }
  },
  gradientColor: [
    'rgba(255, 127, 0, 0.2)',
    'rgba(255, 127, 0, 0.3)',
    'rgba(255, 127, 0, 0.5)',
    'rgba(255, 127, 0, 0.7)',
    'rgba(255, 127, 0, 0.8)'
  ],
  visualMap: {
    min: 1,
    max: 5,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    contentColor: '#5793f3',
    categories: [1, 2, 3, 4, 5],
    top: 130,
    formatter: function (value) {
      return value + '篇'
    }
  },
  calendar: {
    top: 20,
    left: 0,
    right: 0,
    dayLabel: {
      show: false
    },
    cellSize: ['auto', 15],
    range: 2016,
    splitLine: {
      show: false,
    },
    itemStyle: {
      borderWidth: 0.5
    },
    yearLabel: {show: false},
    monthLabel: {
      color: 'rgb(175, 180, 189)',
      nameMap: 'ZH'
    }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: [[]]
  }
}

function init() {
  chart = echarts.init(document.getElementById('calendar'));
  setCalenderOptions("2022")
}

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
  calendarOptions.calendar.range = year
  calendarOptions.series.data = getVirtulData(year)
  chart.setOption(calendarOptions)
}

onMounted(() => {
  init()
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
      height: 150px;
      margin-top: 8px;
    }
  }
}
</style>