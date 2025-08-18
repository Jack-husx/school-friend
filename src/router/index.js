import { createRouter, createWebHistory } from 'vue-router'

// 一级和二级页面路由
const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  },
  // 校园快讯
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News/SchoolNews.vue'),
    children: [
      {
        path: 'internal',            // /news/internal
        name: 'NewsInternal',
        component: () => import('../views/News/NewsInternal.vue')
      },
      {
        path: 'announcement',        // /news/announcement
        name: 'NewsAnnouncement',
        component: () => import('../views/News/NewsAnnouncement.vue')
      },
      {
        path: 'events',              // /news/events
        name: 'NewsEvents',
        component: () => import('../views/News/NewsEvents.vue')
      }
    ]
  },
  // 往昔岁月
  {
    path: '/pastHistory',
    name: 'PastHistory',
    component: () => import('../views/PastHistory/PastHistory.vue'),
    children: [
      {
        path: 'stories',             // /pastHistory/stories
        name: 'PastHistoryStories',
        component: () => import('../views/PastHistory/PastHistoryStories.vue')
      },
      {
        path: 'photos',              // /pastHistory/photos
        name: 'PastHistoryPhotos',
        component: () => import('../views/PastHistory/PastHistoryPhotos.vue')
      },
      {
        path: 'events',              // /pastHistory/events
        name: 'PastHistoryEvents',
        component: () => import('../views/PastHistory/PastHistoryEvents.vue')
      }
    ]
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/User/Register.vue')
  },
  {
    path: '/forgot-password',   // 🔑 新增忘记密码路由
    name: 'ForgotPassword',
    component: () => import('../views/User/ForgotPassword.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router