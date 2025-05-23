<template>
  <el-col :sm="24" :lg="24">
    <el-result icon="error" title="404" sub-title="您访问的页面已被删除或不存在" class="red-404">
      <template #extra>
        <el-button type="danger" @click="goHome">返回首页</el-button>
      </template>
    </el-result>
  </el-col>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.red-404 .el-result__title {
  color: #e53935; /* 红色标题 */
}

.red-404 .el-result__subtitle {
  color: #ef5350; /* 红色副标题 */
}
</style>
