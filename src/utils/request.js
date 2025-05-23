import axios from 'axios' // 引入 axios 用于发起 HTTP 请求
import { ElMessage } from 'element-plus' // 引入 Element Plus 的消息组件用于错误提示
// import router from '@/router' // 引入 Vue Router 实例，用于路由跳转
import { useUserStore } from '@/stores' // 引入 Pinia 的用户状态管理

const baseURL = 'https://apifoxmock.com/m1/4068509-0-default/api' // 定义基础请求地址（根据接口地址设置）
// 创建 Axios 实例，统一配置 baseURL 和超时时间
const instance = axios.create({
  baseURL, // 基础路径
  timeout: 10000, // 超时时间：10秒
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器：自动添加 token   (每次请求前执行)
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    // 如果用户已登录，自动在请求头中携带token
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // 将 token 加入请求头
    }
    return config // 返回修改后的配置对象
  },
  (error) => Promise.reject(error),
)

// 响应拦截器：统一处理错误   （每次响应后执行）
instance.interceptors.response.use(
  (res) => {
    const { code, msg } = res.data
    if (code === 200) {
      return res.data //业务成功
    } else {
      const NETWORK_ERROR = '网络错误...'
      ElMessage.error(msg || NETWORK_ERROR)
      return Promise.reject(msg || NETWORK_ERROR)
    }
  },
  (err) => {
    // 401：token 失效 （如果响应状态码为 401，表示未授权或登录失效）
    // ElMessage.error('登录已过期，请重新登录')
    // if (err.response && err.response.status === 401) {
    //   const userStore = useUserStore()
    //   userStore.logout() // 清除用户信息
    //   router.push('/login') // 跳转到登录页

    //   //location.href = '/login' // 跳转到登录页
    // } else {
    //   ElMessage.error(err.response?.data?.message || '服务异常')
    // }
    return Promise.reject(err)
  },
)

export default instance // 默认导出 Axios 实例
// export { baseURL } // 可选导出 baseURL（如用于拼接图片等）
