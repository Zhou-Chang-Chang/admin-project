import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    //  使用 ref 定义响应式变量
    const token = ref('')
    const userInfo = ref({})

    // 方法
    function setToken(newToken) {
      token.value = newToken
    }

    function setUserInfo(info) {
      userInfo.value = info
    }

    function logout() {
      token.value = ''
      userInfo.value = {}
    }

    //  返回状态和方法
    return {
      token,
      userInfo,
      setToken,
      setUserInfo,
      logout,
    }
  },
  {
    // 启用持久化
    persist: {
      key: 'rabbit-user',
      paths: ['token'],
    },
  },
)
