<template>
  <el-container>
    <el-main>
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :placement="activity.placement"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
  name: "CubeTimeLine"
}
</script>

<script setup>
import {MoreFilled} from '@element-plus/icons-vue'

const activities = [
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    icon: MoreFilled,
    placement: "top",
  },
]
</script>

<style scoped>

</style>