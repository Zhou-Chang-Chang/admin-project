<script setup>
import { ref, onMounted } from 'vue'

import { getHomeData, getHomeCountData, getHomeChartData } from '@/apis/home'
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'

// 创建响应式数据
const tableList = ref([])
const countData = ref([])
const chartData = ref([])

const lineOption = ref({}) //存储折线图数据
const barOption = ref({}) //存储柱状图图数据
const pieOption = ref({}) //存储饼图图数据

const getTableList = async () => {
  try {
    const res = await getHomeData()
    tableList.value = res.data.tableList
    // 根据接口结构调整
  } catch (error) {
    console.error('获取表格数据失败：', error)
  }
}
const getCountData = async () => {
  const res = await getHomeCountData()
  //   console.log(res.data)
  countData.value = res.data
}
const getChartData = async () => {
  const res = await getHomeChartData()
  chartData.value = res.data
  const { orderData, userData, videoData } = chartData.value

  //折线图数据
  const lineXAxis = { data: orderData.date }
  const lineYAxis = {}
  const lineSeries = Object.keys(orderData.data[0]).map((val) => ({
    name: val, //名字
    type: 'line',
    data: orderData.data.map((item) => item[val]),
  }))
  lineOption.value = { lineXAxis, lineYAxis, lineSeries }

  //柱状图数据
  //   console.log(userData)
  const barXAxis = {
    data: userData.map((item) => item.date),
  }
  const barYAxis = {}
  const barSeries = [
    { name: '新增用户', type: 'bar', data: userData.map((item) => item.new) },
    { name: '活跃用户', type: 'bar', data: userData.map((item) => item.active) },
  ]
  barOption.value = { barXAxis, barYAxis, barSeries }
  //   console.log(barOption.value)

  //饼图数据
  //   console.log(videoData)
  const pieSeries = videoData.map((item) => ({
    name: item.name,
    value: item.value,
  }))
  pieOption.value = { pieSeries }
  //   console.log(pieOption.value)
}
onMounted(() => {
  getTableList()
  getCountData()
  getChartData()
})
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="8" class="left">
      <div>
        <el-card>
          <div style="overflow: hidden">
            <div style="float: left">
              <img
                style="border-radius: 50%"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
            </div>
            <div style="float: left">
              <h1 style="font-size: 30px; margin: 50px 0 8px 10px">Admin</h1>
              <span style="font-size: 15px; margin: 0 0 10px 10px; color: #b0b0b0">超级管理员</span>
            </div>
          </div>
          <template #footer>
            <span>上次登陆时间：2025-7-19</span><br />
            <span>上次登陆地点：安徽阜阳 阜阳师范大学</span>
          </template>
        </el-card>
        <br /><br /><br />
        <el-card>
          <el-table :data="tableList" height="400" style="width: 100%">
            <el-table-column prop="brand" label="品牌" />
            <el-table-column prop="day" label="今日购买" />
            <el-table-column prop="month" label="本月购买" />
            <el-table-column prop="all" label="总购买" />
          </el-table>

          <template #footer> </template>
        </el-card>
      </div>
    </el-col>

    <el-col :span="16" class="right">
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: space-between;
          margin-bottom: 30px;
        "
      >
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', alignItems: 'center', padding: '0px !important' }"
          style="width: 32%"
        >
          <component
            :is="item.icon"
            :style="{
              background: item.color,
              color: 'white',
              width: '80px',
              height: '80px',
              fontSize: '24px',
              marginRight: '15px',
            }"
          />
          <div>
            <h3 style="margin: 0; font-size: 20px">￥{{ item.value }}</h3>
            <span style="color: #999">{{ item.name }}</span>
          </div>
        </el-card>
      </div>

      <!-- 折线图 -->
      <el-card> <LineChart :lineOption="lineOption" /></el-card>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <el-card><BarChart :barOption="barOption" /></el-card>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-card><PieChart :pieOption="pieOption" /></el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  height: 100vh;
  margin-top: 10px;
}
.left {
  height: 100vh;
}
.right {
  height: 100vh;
  padding: 0 !important;
}
</style>
