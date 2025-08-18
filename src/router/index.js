import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News/SchoolNews.vue')
  },
  {
    path: '/pastHistory',
    name: 'PastHistory',
    component: () => import('../views/PastHistory/PastHistory.vue') 
    
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router