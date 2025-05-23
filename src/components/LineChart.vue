<template>
  <!-- 定义宽高的 DOM 元素 -->
  <div ref="chartRef" style="width: 100%; height: 300px" />
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch, nextTick } from 'vue'

// 接收传入的 props
const props = defineProps({
  lineOption: {
    type: Object,
    required: true,
  },
})

const chartRef = ref(null)
let chartInstance = null

// 渲染图表函数
const renderChart = () => {
  if (!chartInstance || !props.lineOption || !props.lineOption.lineSeries) return

  chartInstance.setOption({
    tooltip: {},
    legend: {
      data: props.lineOption.lineSeries.map((item) => item.name),
    },
    grid: {
      top: 50,
      bottom: 0,
      left: 40,
      right: 0,
      containLabel: true,
    },
    xAxis: props.lineOption.lineXAxis,
    yAxis: props.lineOption.lineYAxis,
    series: props.lineOption.lineSeries.map((item) => ({
      name: item.name,
      type: item.type,
      data: item.data,
    })),
  })
}

onMounted(async () => {
  await nextTick()

  if (!chartRef.value) {
    console.error('chartRef is null!')
    return
  }
  //初始化实例
  chartInstance = echarts.init(chartRef.value)

  renderChart() // 初始渲染

  // 监听数据变化，更新图表
  watch(
    () => props.lineOption,
    () => {
      renderChart()
    },
    { immediate: true, deep: true },
  )

  // 监听窗口尺寸变化，响应式重绘
  window.addEventListener('resize', () => {
    chartInstance && chartInstance.resize()
  })
})
</script>

<style scoped>
/* 可选：增加点 margin */
</style>
