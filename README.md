# admin-project
# Vue3-Admin 管理系统

基于 Vue3 + Vite + Pinia + Vue Router + Element Plus 的后台管理系统，功能包含用户登录、权限控制、图表展示等，适合作为中小型项目的前端基础框架。

## ✨ 项目特性

- ✅ Vue3 组合式 API
- ⚡ 使用 Vite 构建，开发体验更佳
- 💎 Element Plus UI 框架，简洁美观
- 📦 模块化接口管理，统一请求封装
- 📊 内置图表组件（Bar、Line、Pie）
- 🔒 路由鉴权 & Token 控制
- 💡 规范化的目录结构，易于扩展和维护

--- 权限控制说明
登录后存储 token（Pinia 管理）
所有页面通过路由守卫进行访问控制
未登录访问受限页面将跳转到 /login
登录状态访问 /login 会跳转到 /home
不存在的页面跳转到 /notFound

## 📁 项目结构
src/
├── apis/ // 接口请求模块
│ ├── home.js
│ ├── login.js
│ └── user.js
├── assets/ // 静态资源，如图片、样式
├── components/ // 公共组件（图表等）
├── router/ // 路由配置
├── stores/ // Pinia 状态管理
├── utils/ // 工具函数
├── views/ // 页面组件
│ ├── Home/
│ ├── Login/
│ ├── Mall/
│ ├── Other/
│ ├── User/
│ └── notFound.vue
├── App.vue
└── main.js


