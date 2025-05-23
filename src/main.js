import '@/assets/reset.less'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'

import pinia from '@/stores/index'
import App from './App.vue'
import router from './router'

if (import.meta.env.MODE === 'development') {
  import('@/apis/Mock/mock')
}

const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
