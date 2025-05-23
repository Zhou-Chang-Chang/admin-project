<template>
  <el-container class="layout">
    <!-- 顶部 -->
    <el-header class="layout-header"
      ><HeaderBar :isCollapse="isCollapse" @toggle-collapse="handleCollapse"></HeaderBar>
    </el-header>

    <el-container>
      <!-- 左侧侧边栏 -->
      <div class="layout-aside"><SidebarMenu :collapse="isCollapse" /></div>

      <!-- 右侧主体内容 -->
      <el-main :style="{ left: isCollapse ? '64px' : '200px' }" class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import HeaderBar from '@/views/Layout/HeaderBar.vue'
import SidebarMenu from '@/views/Layout/SidebarMenu.vue'

//折叠菜单
import { ref } from 'vue'
const isCollapse = ref(false)
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
.layout {
  height: 100vh;
}

.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #747777;
  color: #fff;
  align-items: center;
  padding: 0;
}

.layout-aside {
  position: fixed;
  top: 60px;
  left: 0;
}

.layout-main {
  /* width: 100%; */
  position: fixed;
  top: 60px;
  right: 0;
  transition: left 0.3s ease-in-out 0.01s;
  padding: 20px;
  /* border: 1px solid rebeccapurple; */
  /* background-color: #801515; */
  overflow-y: auto;
}
</style>
