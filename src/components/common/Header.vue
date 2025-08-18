<template>
  <header class="header">
    <div class="logo">
      <el-icon style="vertical-align: middle; margin-right: 10px;">
        <School />
      </el-icon>
      <span>闻一多中学校友网</span>
    </div>
    <nav>
      <ul class="menu">
        <li v-for="item in menuItems" :key="item.label">
          <router-link :to="item.path">{{ item.label }}</router-link>
          <!-- 下拉菜单 -->
          <ul v-if="item.children" class="submenu">
            <li v-for="child in item.children" :key="child.label">
              <router-link :to="child.path">{{ child.label }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="auth">
      <el-button type="danger" plain size="small" @click="$router.push('/register')">注册</el-button>
      <el-button type="primary" size="small" @click="$router.push('/login')">登录</el-button>
    </div>
  </header>
</template>

<script setup>
import { School } from '@element-plus/icons-vue'

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
}
.logo {
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
}

/* 一级菜单 */
nav .menu {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 0;
  padding: 0;
}
nav .menu > li {
  position: relative; /* 用于子菜单绝对定位 */
}
nav .menu a {
  color: #222;
  text-decoration: none;
  font-size: 25px;
  padding: 5px 12px;
  border-radius: 5px;
  display: inline-block;
  transition: background 0.2s;
}
nav .menu a.router-link-active {
  background: #e74c3c;
  color: #fff;
}

/* 二级菜单 */
.submenu {
  position: absolute;
  top: 100%; /* 下拉在一级菜单下面 */
  left: 0;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  list-style: none;
  padding: 5px 0;
  min-width: 180px;
  display: none; /* 默认隐藏 */
  z-index: 10;
}
.menu > li:hover > .submenu {
  display: block; /* 悬停显示 */
}
.submenu li {
  padding: 0;
}
.submenu li a {
  font-size: 16px;
  padding: 8px 15px;
  display: block;
  color: #333;
}
.submenu li a:hover {
  background: #f5f5f5;
  color: #e74c3c;
}

/* 登录/注册 */
.auth {
  display: flex;
  gap: 10px;
}
</style>
