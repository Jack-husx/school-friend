<template>
  <header class="header">
    <div class="logo">
      <el-icon style="vertical-align: middle; margin-right: 8px;">
        <School />
      </el-icon>
      <span>闻一多中学校友网</span>
    </div>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/news">校园快讯</router-link>
      <router-link to="/pastHistory">往昔岁月</router-link>
      <router-link to="/contact">联系我们</router-link>
    </nav>
    <div class="auth">
      <el-button type="danger" plain size="small" @click="$router.push('/register')">注册</el-button>
      <el-button type="primary" size="small" @click="$router.push('/login')">登录</el-button>
    </div>
  </header>
</template>

<script setup>
import { School } from '@element-plus/icons-vue'
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
  font-size: 22px;
  display: flex;
  align-items: center;
}
nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 30px;
}
nav a {
  color: #222;
  text-decoration: none;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background 0.2s;
}
nav a.router-link-active {
  background: #e74c3c;
  color: #fff;
}
.auth {
  display: flex;
  gap: 10px;
}
</style>