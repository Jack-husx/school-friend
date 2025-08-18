<template>
  <div class="news-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>校园快讯</h2>
      <p class="page-description">了解学校最新动态，获取重要通知信息</p>
    </div>
    
    <!-- 导航菜单 -->
    <div class="news-nav">
      <router-link 
        to="/news/internal" 
        class="nav-item"
        active-class="active"
      >
        <span class="nav-icon">📰</span>
        校内新闻
      </router-link>
      
      <router-link 
        to="/news/announcement" 
        class="nav-item"
        active-class="active"
      >
        <span class="nav-icon">📢</span>
        通知公告
      </router-link>
      
      <router-link 
        to="/news/events" 
        class="nav-item"
        active-class="active"
      >
        <span class="nav-icon">🎉</span>
        活动预告
      </router-link>
    </div>
    
    <!-- 子路由内容区域 -->
    <div class="content-area">
      <!-- 这里是关键：router-view 用来显示子路由组件 -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

// 如果直接访问 /news，自动跳转到 /news/internal
onMounted(() => {
  if (route.path === '/news') {
    router.replace('/news/internal')
  }
})
</script>

<style scoped>
.news-container {
  padding: 20px;
  margin: 0 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e74c3c;
}

.page-header h2 {
  color: #e74c3c;
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: 600;
}

.page-description {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* 导航菜单 */
.news-nav {
  display: flex;
  gap: 0;
  margin-bottom: 30px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 20px;
  text-decoration: none;
  color: #666;
  background: white;
  border-right: 1px solid #eee;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item:last-child {
  border-right: none;
}

.nav-item:hover {
  background: #f8f9fa;
  color: #e74c3c;
  transform: translateY(-1px);
}

.nav-item.active {
  background: #e74c3c;
  color: white;
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}

.nav-icon {
  font-size: 16px;
  transition: transform 0.3s ease;
}

/* 内容区域 */
.content-area {
  background: white;
  border-radius: 8px;
  min-height: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .news-container {
    margin: 0 10px;
    padding: 15px;
  }
  
  .news-nav {
    flex-direction: column;
    gap: 1px;
  }
  
  .nav-item {
    border-right: none;
    border-bottom: 1px solid #eee;
  }
  
  .nav-item:last-child {
    border-bottom: none;
  }
  
  .page-header h2 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .nav-item {
    padding: 12px 15px;
    font-size: 14px;
  }
  
  .nav-icon {
    font-size: 14px;
  }
}
</style>