<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="bread">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="route.path !== '/home'" :to="{ path: route.path }">
        {{ route.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="less">
.bread {
  text-align: center;

  .el-breadcrumb__inner {
    color: white !important;
    line-height: 32px;
    cursor: pointer !important;
  }
}
</style>
