<script setup>
import { reactive, ref } from 'vue'
import { Login } from '@/apis/login'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const formRef = ref(null)
const form = reactive({
  name: '',
  password: '',
})
const rules = reactive({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 8, message: '账号长度为3-8位', trigger: 'blur' }, // 这里改成 max:8
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 8, message: '密码长度为3-8位', trigger: 'blur' },
  ],
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await Login({ username: form.name, password: form.password })
        // console.log('登录成功：', res.data)
        //pinia存储token
        userStore.token = res.data.token
        // 这里可以处理登录成功逻辑，比如跳转页面等
        router.push('/home')
        ElMessage.success('登陆成功')
      } catch (error) {
        console.error('登录失败:', error)
      }
    } else {
      console.log('表单验证失败')
    }
  })
}
</script>

<template>
  <div class="login">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.login {
  height: 100vh; // 让页面撑满整个视口
  display: flex; // 启用 Flex 布局
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
  background: url('@/assets/login-bg.jpg') no-repeat center center;
  background-size: cover;
}

.el-form {
  width: 400px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.6); // 加个白色半透明背景，更清晰
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); // 阴影美化
  .el-form-item {
    margin: 40px;
    .el-button {
      margin: 0 auto;
      width: 100%;
    }
  }
}
</style>
