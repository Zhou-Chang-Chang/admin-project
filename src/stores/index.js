//pinia独立维护
// 从 Pinia 中导入创建 Pinia 实例的方法
import { createPinia } from 'pinia'

// 导入 Pinia 的持久化插件（可以让状态保存在 localStorage 或 sessionStorage 中）
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia()

// 使用持久化插件，使得 store 的状态可以持久化保存（如 token 不会随刷新丢失）
pinia.use(piniaPluginPersistedstate)

// 导出 pinia 实例，供 main.ts 中挂载到应用上使用
export default pinia

//仓库统一导出
export * from '@/stores/modules/user'
// 后续有新模块继续加 export 即可
