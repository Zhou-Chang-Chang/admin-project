<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { House, User, VideoPlay, Location, Setting } from '@element-plus/icons-vue'

// 获取路由
const router = useRouter()
const route = useRoute()

const list = ref([
  { path: '/home', name: 'home', lable: '首页', icon: House },
  { path: '/mall', name: 'mall', lable: '商品管理', icon: VideoPlay },
  { path: '/user', name: 'user', lable: '用户管理', icon: User },
  {
    path: '/other',
    lable: '其他',
    icon: Location,
    children: [
      { path: '/page1', name: 'page1', lable: '页面1', icon: Setting },
      { path: '/page2', name: 'page2', lable: '页面2', icon: Setting },
    ],
  },
])

const noChildren = computed(() =>
  list.value.filter((item) => !item.children || item.children.length === 0),
)

const hasChildren = computed(() => list.value.filter((item) => item.children))

//接受父组件传递的数据isCollapse
const props = defineProps({
  isCollapse: Boolean,
})

// 当前激活菜单项（初始化为当前路由路径）
const activeMenu = ref(route.path)

// 监听路由变化，动态更新激活菜单项
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  },
  { immediate: true },
)

// 点击跳转
const handleMenu = (item) => {
  router.push(item.path)
}

const handleSubMenu = (item) => {
  router.push(item.path)
}
</script>

<template>
  <el-menu
    router="true"
    :collapse="props.isCollapse"
    :default-active="route.path"
    class="el-menu-vertical-demo"
    v-model="activeMenu"
  >
    <!-- 无子菜单项 -->
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
      @click="handleMenu(item)"
    >
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.lable }}</span>
    </el-menu-item>

    <!-- 有子菜单项 -->
    <el-sub-menu v-for="item in hasChildren" :key="item.path" :index="item.path">
      <template #title>
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.lable }}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.path"
        :index="child.path"
        @click="handleSubMenu(child)"
        style="background-color: rgb(238, 241, 241)"
      >
        <el-icon><component :is="child.icon" /></el-icon>
        <span>{{ child.lable }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="less">
.el-menu {
  //   height: 100vh;
  background-color: #eef1f1;
  min-height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
