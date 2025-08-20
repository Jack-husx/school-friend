<template>
  <header class="header">
    <div class="logo">
      <el-icon style="vertical-align: middle; margin-right: 10px;">
        <School />
      </el-icon>
      <span>闻一多中学校友网</span>
    </div>
    
    <!-- 移动端汉堡菜单按钮 -->
    <div class="mobile-menu-btn" @click="toggleMobileMenu">
      <el-icon size="24">
        <Menu v-if="!mobileMenuOpen" />
        <Close v-else />
      </el-icon>
    </div>
    
    <!-- 导航菜单 -->
    <nav class="nav" :class="{ 'nav-open': mobileMenuOpen }">
      <ul class="menu">
        <li v-for="item in menuItems" :key="item.label" class="menu-item">
          <router-link :to="item.path" @click="closeMobileMenu">{{ item.label }}</router-link>
          <!-- 下拉菜单 -->
          <ul v-if="item.children" class="submenu">
            <li v-for="child in item.children" :key="child.label">
              <router-link :to="child.path" @click="closeMobileMenu">{{ child.label }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
      
      <!-- 移动端登录注册按钮 -->
      <div class="auth mobile-auth">
        <el-button type="danger" plain size="small" @click="handleRegister">注册</el-button>
        <el-button type="primary" size="small" @click="handleLogin">登录</el-button>
      </div>
    </nav>
    
    <!-- PC端登录注册按钮 -->
    <div class="auth desktop-auth">
      <el-button type="danger" plain size="small" @click="$router.push('/register')">注册</el-button>
      <el-button type="primary" size="small" @click="$router.push('/login')">登录</el-button>
    </div>
    
    <!-- 移动端遮罩层 -->
    <div v-if="mobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { School, Menu, Close } from '@element-plus/icons-vue'

const router = useRouter()
const mobileMenuOpen = ref(false)

const menuItems = [
  { label: '首页', path: '/' },
  {
    label: '校园快讯', path: '/news', children: [
      { label: '校内新闻', path: '/news/internal' },
      { label: '通知公告', path: '/news/announcement' },
      { label: '活动预告', path: '/news/events' },
    ]
  },
  {
    label: '往昔岁月', path: '/pastHistory', children: [
      { label: '校友故事', path: '/pastHistory/stories' },
      { label: '校园老照片', path: '/pastHistory/photos' },
      { label: '往届活动', path: '/pastHistory/events' },
    ]
  },
  { label: '联系我们', path: '/contact' },
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // 移动端菜单打开时禁止body滚动
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleLogin = () => {
  router.push('/login')
  closeMobileMenu()
}

const handleRegister = () => {
  router.push('/register')
  closeMobileMenu()
}

// 监听窗口大小变化，自动关闭移动端菜单
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileMenuOpen.value) {
    closeMobileMenu()
  }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 0 40px;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 999;
}

.logo {
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
  color: #333;
  z-index: 1001;
}

/* 移动端汉堡菜单按钮 */
.mobile-menu-btn {
  display: none;
  cursor: pointer;
  z-index: 1001;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.mobile-menu-btn:hover {
  background: rgba(245, 245, 245, 0.9);
  transform: scale(1.05);
}

.mobile-menu-btn:active {
  transform: scale(0.95);
}

/* 导航菜单 */
.nav {
  display: flex;
  align-items: center;
}

/* 一级菜单 */
.menu {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 0;
  padding: 0;
}

.menu > li {
  position: relative;
}

.menu a {
  color: #555;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  display: inline-block;
  transition: background 0.3s ease, color 0.3s ease;
}

.menu a:hover {
  background: #f5f5f5;
  color: #e74c3c;
}

.menu a.router-link-active {
  background: #e74c3c;
  color: #fff;
}

/* 二级菜单 */
.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  list-style: none;
  padding: 8px 0;
  min-width: 200px;
  display: none;
  z-index: 10;
}

.menu > li:hover > .submenu {
  display: block;
}

.submenu li {
  padding: 0;
}

.submenu li a {
  font-size: 16px;
  padding: 10px 20px;
  display: block;
  color: #444;
  transition: background 0.2s ease;
}

.submenu li a:hover {
  background: #f9f9f9;
  color: #e74c3c;
}

/* 登录/注册按钮 */
.auth {
  display: flex;
  gap: 15px;
}

.mobile-auth {
  display: none;
}

.desktop-auth {
  display: flex;
}

/* 移动端遮罩层 */
.mobile-overlay {
  display: none;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .header {
    padding: 0 20px;
    height: 56px;
  }

  .logo {
    font-size: 20px;
  }

  .logo span {
    display: none; /* 移动端隐藏文字，只显示图标 */
  }

  /* 显示汉堡菜单按钮 */
  .mobile-menu-btn {
    display: block;
  }

  /* 隐藏PC端登录按钮 */
  .desktop-auth {
    display: none;
  }

  /* 导航菜单移动端样式 */
  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    max-width: 85vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
    transition: right 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 1000;
    flex-direction: column;
    padding-top: 70px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .nav-open {
    right: 0;
  }

  .menu {
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 0 20px;
  }

  .menu-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    width: 100%;
  }

  .menu-item:last-child {
    border-bottom: none;
  }

  .menu a {
    width: 100%;
    padding: 18px 0;
    font-size: 16px;
    font-weight: 600;
    border-radius: 0;
    display: block;
    color: #333;
    transition: all 0.3s ease;
  }

  .menu a:hover {
    background: rgba(231, 76, 60, 0.08);
    color: #e74c3c;
    transform: translateX(5px);
  }

  .menu a.router-link-active {
    background: linear-gradient(90deg, rgba(231, 76, 60, 0.1), transparent);
    color: #e74c3c;
    border-left: 3px solid #e74c3c;
    padding-left: 17px;
  }

  /* 移动端二级菜单 */
  .submenu {
    position: static;
    display: block !important;
    background: rgba(0, 0, 0, 0.02);
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    min-width: auto;
    margin-left: 20px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .submenu li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }

  .submenu li:last-child {
    border-bottom: none;
  }

  .submenu li a {
    padding: 14px 0;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    transition: all 0.3s ease;
  }

  .submenu li a:hover {
    color: #e74c3c;
    background: transparent;
    transform: translateX(8px);
  }

  .submenu li a.router-link-active {
    color: #e74c3c;
    background: transparent;
    border-left: none;
    padding-left: 0;
  }

  /* 移动端登录注册按钮 */
  .mobile-auth {
    display: flex;
    padding: 30px 20px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    margin-top: auto;
    width: 100%;
    box-sizing: border-box;
    gap: 12px;
  }

  .mobile-auth :deep(.el-button) {
    flex: 1;
    height: 44px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 22px;
    transition: all 0.3s ease;
  }

  .mobile-auth :deep(.el-button--primary) {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    border-color: transparent;
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  }

  .mobile-auth :deep(.el-button--primary:hover) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }

  .mobile-auth :deep(.el-button--danger.is-plain) {
    border: 2px solid #e74c3c;
    color: #e74c3c;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  .mobile-auth :deep(.el-button--danger.is-plain:hover) {
    background: rgba(231, 76, 60, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.2);
  }

  /* 移动端遮罩层 */
  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 999;
    opacity: 0;
    animation: overlayFadeIn 0.3s ease forwards;
  }

  @keyframes overlayFadeIn {
    to {
      opacity: 1;
    }
  }
}

/* 小屏幕优化 */
@media (max-width: 480px) {
  .header {
    padding: 0 15px;
    height: 54px;
  }

  .logo {
    font-size: 18px;
  }

  .nav {
    width: 100%;
    right: -100%;
    padding-top: 60px;
  }

  .menu {
    padding: 0 15px;
  }

  .mobile-auth {
    padding: 25px 15px 15px;
  }
}

/* 平板适配 */
@media (min-width: 769px) and (max-width: 1024px) {
  .header {
    padding: 0 30px;
  }

  .logo {
    font-size: 22px;
  }

  .menu {
    gap: 30px;
  }

  .menu a {
    font-size: 16px;
    padding: 6px 12px;
  }
}

/* 增强触摸体验 */
@media (hover: none) and (pointer: coarse) {
  .mobile-menu-btn {
    padding: 12px;
  }
  
  .menu a {
    padding: 20px 0;
    font-size: 17px;
  }
  
  .submenu li a {
    padding: 16px 0;
    font-size: 15px;
  }
}
</style>