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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 添加轻微阴影，提升立体感 */
}
.logo {
  font-weight: bold;
  font-size: 24px; /* 略微减小logo字体大小，使整体更协调 */
  display: flex;
  align-items: center;
  color: #333; /* 调整颜色为更柔和的深灰 */
}

/* 一级菜单 */
nav .menu {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 40px; /* 增加间距，让菜单更宽松 */
  margin: 0;
  padding: 0;
}
nav .menu > li {
  position: relative; /* 用于子菜单绝对定位 */
}
nav .menu a {
  color: #555; /* 调整文字颜色为柔和灰，提升可读性 */
  text-decoration: none;
  font-size: 18px; /* 减小字体大小到18px，更符合标准导航设计 */
  font-weight: 500; /* 添加中等粗细，提升文字质感 */
  padding: 8px 16px; /* 增加padding，让点击区域更大 */
  border-radius: 6px; /* 略微增加圆角 */
  display: inline-block;
  transition: background 0.3s ease, color 0.3s ease; /* 平滑过渡效果 */
}
nav .menu a:hover {
  background: #f5f5f5; /* 添加hover背景色，提升交互感 */
  color: #e74c3c; /* hover时文字变红，突出重点 */
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
  border: 1px solid #ddd; /* 调整边框颜色为更浅的灰 */
  border-radius: 6px; /* 与一级菜单圆角一致 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* 增强阴影，提升浮动感 */
  list-style: none;
  padding: 8px 0; /* 增加内边距 */
  min-width: 200px; /* 略微增加宽度，让子菜单更宽敞 */
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
  padding: 10px 20px; /* 增加padding，提升点击舒适度 */
  display: block;
  color: #444; /* 调整颜色为深灰 */
  transition: background 0.2s ease;
}
.submenu li a:hover {
  background: #f9f9f9; /* hover背景更柔和 */
  color: #e74c3c;
}

/* 登录/注册 */
.auth {
  display: flex;
  gap: 15px; /* 增加按钮间距 */
}
</style>