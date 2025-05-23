<template>
  <div ref="refChart" style="width: 500px; height: 500px" />
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, nextTick, watch } from 'vue'

// 定义 props
const props = defineProps({
  barOption: {
    type: Object,
    required: true,
  },
})

// DOM 引用
const refChart = ref(null)
let chartInstance = null

// 渲染图表
const renderChart = () => {
  if (!chartInstance || !props.barOption) return

  chartInstance.setOption({
    tooltip: {},
    legend: {
      data: Array.isArray(props.barOption.barSeries)
        ? props.barOption.barSeries.map((item) => item.name)
        : [],
    },
    xAxis: props.barOption.barXAxis,
    yAxis: props.barOption.barYAxis,
    grid: {
      top: 30,
      bottom: 10,
      left: 10,
      right: 50,
      containLabel: true,
    },
    series: Array.isArray(props.barOption.barSeries)
      ? props.barOption.barSeries.map((item) => ({
          name: item.name,
          type: item.type,
          data: Array.isArray(item.data) ? item.data : [],
        }))
      : [],
  })
}

// 初始化
onMounted(async () => {
  await nextTick()
  if (!refChart.value) {
    console.error('refChart is null')
    return
  }

  chartInstance = echarts.init(refChart.value)
  renderChart()

  // 监听 props 变化重新渲染
  watch(
    () => props.barOption,
    () => {
      renderChart()
    },
    {
      immediate: true,
      deep: true,
    },
  )

  // 窗口尺寸变化时自动 resize
  window.addEventListener('resize', () => {
    chartInstance && chartInstance.resize()
  })
})
</script>

<style scoped></style>
