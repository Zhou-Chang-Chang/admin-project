<template>
  <div class="header-container">
    <div class="left">
      <h3>硕歌小组成员管理系统</h3>
      <div class="left-right">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="props.isCollapse ? '展开菜单' : '收起菜单'"
          placement="bottom"
        >
          <el-button @click="emit('toggle-collapse')">
            <el-icon><Operation /></el-icon>
          </el-button>
        </el-tooltip>

        <BreadcrumbBar></BreadcrumbBar>
      </div>
    </div>

    <div class="right">
      <div>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="cursor: pointer">
          用户名
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import BreadcrumbBar from '@/views/Layout/BreadcrumbBar.vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { openConfirm } from '@/components/confirmBox'
const userStore = useUserStore()
const router = useRouter()
//子组件接收数据
const props = defineProps({
  isCollapse: Boolean,
})

const emit = defineEmits(['toggle-collapse'])

const handleOut = () => {
  userStore.logout()

  openConfirm('您确定要退出登录吗？').then(() => {
    router.push('/login')
  })
}
</script>

<style scoped lang="less">
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  //   justify-content: space-between;
  align-items: center;
  height: 60px;
  h3 {
    width: 200px;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
  .left-right {
    display: flex;
    .el-button {
      margin: 0 10px 0 10px;
    }
  }
}

.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-avatar {
    margin: 10px;
  }
  .el-dropdown {
    color: aliceblue;
    margin: 10px;
  }
}
</style>
