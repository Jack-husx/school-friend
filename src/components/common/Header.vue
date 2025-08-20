<template>
  <header class="header">
    <div class="logo">
      <el-icon style="vertical-align: middle; margin-right: 10px;">
        <School />
      </el-icon>

      <!-- 使用 el-tooltip 包裹文本，鼠标悬停/点击时显示完整标题 -->
      <el-tooltip content="闻一多中学校友网" placement="bottom">
        <span class="logo-text">闻一多中学校友网</span>
      </el-tooltip>
    </div>
    
    <!-- 移动端汉堡菜单按钮 -->
    <div class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="打开菜单">
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
// 注意：el-tooltip 是 Element Plus 组件，若项目未全局注册 Element Plus 组件请按项目方式引入/注册

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

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileMenuOpen.value) {
    closeMobileMenu()
  }
})
</script>

<style scoped>
/* --- PC 和 iPad 样式保持不变 --- */
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

/* 默认（桌面） logo 文本：单行显示，和原样一致 */
.logo-text {
  display: inline-block;
  font-size: 18px;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 420px; /* 桌面下限制防止极窄窗口撑坏布局 */
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

.nav {
  display: flex;
  align-items: center;
}
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

.mobile-overlay {
  display: none;
}

/* --- 移动端修改（仅影响 ≤768px） --- */
@media (max-width: 768px) {
  .header {
    padding: 0 16px;
    height: 56px;
  }

  .logo {
    font-size: 20px;
  }

  /* 移动端：允许 logo 文本换行显示完整（最多2行），同时减小字体 */
  .logo-text {
    display: inline-block;
    font-size: 14px;          /* 更小字体，便于完整显示 */
    margin-left: 6px;
    max-width: calc(100% - 54px); /* 留出图标和右侧汉堡空间 */
    white-space: normal;      /* 允许换行 */
    word-break: break-word;   /* 长词换行 */
    line-height: 1.1;
    overflow: visible;        /* 不用省略号，尽量显示全部 */
    vertical-align: middle;
  }

  .mobile-menu-btn {
    display: block;
  }
  .desktop-auth {
    display: none;
  }

  /* 右侧滑出改为底部抽屉效果（保持你现有移动端样式） */
  .nav {
    position: fixed;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: 70%;
    background: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
    transition: bottom 0.3s ease-in-out;
    flex-direction: column;
    padding-top: 20px;
    z-index: 1000;
  }
  .nav-open {
    bottom: 0;
  }

  .menu {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
    gap: 10px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .menu-item {
    width: 100%;
  }
  .menu a {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .menu a.router-link-active {
    color: #e74c3c;
    background: none;
    border-bottom: 2px solid #e74c3c;
  }

  /* 子菜单直接展开 */
  .submenu {
    position: static;
    display: block !important;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0 0 0 15px;
    margin-top: 5px;
  }
  .submenu li a {
    font-size: 14px;
    color: #666;
    padding: 10px 0;
  }

  .mobile-auth {
    display: flex;
    padding: 15px 20px;
    margin-top: auto;
    width: 100%;
    gap: 12px;
  }
  .mobile-auth :deep(.el-button) {
    flex: 1;
    height: 44px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 22px;
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 999;
  }
}

/* 小屏幕微调（≤480px） */
@media (max-width: 480px) {
  .header { height: 54px; padding: 0 12px; }
  .logo-text { font-size: 13px; max-width: calc(100% - 48px); }
  .nav { height: 76%; }
  .menu > li > a { font-size: 15px; }
  .submenu li a { font-size: 13px; }
}
</style>
