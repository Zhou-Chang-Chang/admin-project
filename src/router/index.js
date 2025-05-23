import { createRouter, createWebHistory } from 'vue-router'
// import routes from './routes' // 你的路由表
import { useUserStore } from '@/stores/modules/user'
const router = createRouter({
  //路由模式
  history: createWebHistory(import.meta.env.BASE_URL),
  //路由规则
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/login',
      component: () => import('@/views/index.vue'),

      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '首页', requiresAuth: true },
          component: () => import('@/views/Home/index.vue'),
        },
        {
          path: '/mall',
          name: 'mall',
          meta: { title: '商品管理', requiresAuth: true },
          component: () => import('@/views/Mall/index.vue'),
        },
        {
          path: '/user',
          name: 'user',
          meta: { title: '用户管理', requiresAuth: true },
          component: () => import('@/views/User/index.vue'),
        },

        {
          path: '/page1',
          name: 'page1',
          meta: { title: '页面1', requiresAuth: true },
          component: () => import('@/views/Other/page1.vue'),
        },
        {
          path: '/page2',
          name: 'page2',
          meta: { title: '页面2', requiresAuth: true },
          component: () => import('@/views/Other/page2.vue'),
        },
      ],
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/notFound.vue'),
    },
  ],
})
//  全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token
  const isLogin = !!token

  // 如果目标路由是 404 页面，直接放行（无论是否登录）
  if (to.name === 'NotFound') {
    next()
    return
  }

  // 已登录
  if (isLogin) {
    if (to.path === '/login') {
      next('/home') // 登录状态访问 login，跳转 home
    } else {
      next() // 放行其他页面
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      next() // 可以访问 login
    } else if (to.matched.length === 0) {
      // 未匹配任何路由，进入 404 页面
      next({ name: 'NotFound' })
    } else {
      // 访问已存在的受保护页面时跳转 login
      next('/login')
    }
  }
})

export default router
