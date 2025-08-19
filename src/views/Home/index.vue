<template>
  <div class="home-page">
    <!-- 顶部横幅区域 -->
    <section class="banner-section">
      <div class="banner-wrapper">
        <Banner />
      </div>
    </section>

    <!-- 主要内容区域 -->
    <section class="main-content">
      <div class="container">
        <!-- 功能卡片区域 -->
        <div class="cards-grid">
          <!-- 时钟卡片 -->
          <article class="card clock-card">
            <header class="card-header">
              <h3 class="card-title">
                <span class="icon">⏰</span>
                当前时间
              </h3>
            </header>
            <div class="card-body">
              <Clock />
            </div>
          </article>

          <!-- 校园通知卡片 -->
          <article class="card notification-card">
            <header class="card-header">
              <h3 class="card-title">
                <span class="icon">📢</span>
                校园通知
              </h3>
              <div class="card-badge">最新</div>
            </header>
            <div class="card-body">
              <NewsCard />
            </div>
          </article>

          <!-- 用户信息卡片 -->
          <article class="card profile-card">
            <header class="card-header">
              <h3 class="card-title">
                <span class="icon">👤</span>
                校友信息
              </h3>
              <div class="card-badge online">在线</div>
            </header>
            <div class="card-body">
              <UserProfile />
            </div>
          </article>
        </div>

        <!-- 分隔线 -->
        <div class="section-divider">
          <div class="divider-line"></div>
          <div class="divider-text">精彩视频</div>
          <div class="divider-line"></div>
        </div>

        <!-- 视频播放区域 -->
        <section class="video-section">
          <div class="video-container">
            <header class="video-header">
              <h2 class="video-title">校园风采展示</h2>
              <p class="video-description">记录美好校园时光，分享精彩瞬间</p>
            </header>
            <div class="video-player-wrapper">
              <MediaPlayer 
                mediaSrc="../public/media/qzzg.mp4" 
                :isVideo="true" 
                class="media-player" 
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import Banner from '../../components/business/Banner.vue'
import NewsCard from '../../components/business/NewsCard.vue'
import UserProfile from '../../components/business/UserProfile.vue'
import Clock from '../../components/business/Clock.vue'
import MediaPlayer from '../../components/business/MediaPlayer.vue'
</script>

<style scoped>
/* 整体页面样式 - 适配 MainLayout */
.home-page {
  width: 100%;
  /* 移除 min-height 和背景，这些由 MainLayout 处理 */
  position: relative;
  overflow-x: hidden;
}

/* 顶部横幅区域 */
.banner-section {
  width: 100%;
  padding: 30px 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
}

.banner-wrapper {
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 主要内容区域 */
.main-content {
  padding: 40px 0 60px; /* 底部留适当间距给 Footer */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 卡片网格布局 */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

/* 卡片基础样式 */
.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #e74c3c, #f39c12, #e74c3c);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.card:hover::before {
  opacity: 1;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.icon {
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.card-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: #e74c3c;
  color: white;
}

.card-badge.online {
  background: #27ae60;
}

/* 卡片内容 */
.card-body {
  padding: 20px 24px 24px;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 特定卡片样式 */
.clock-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.clock-card .card-title,
.clock-card .icon {
  color: white;
}

.notification-card {
  border-left: 4px solid #e74c3c;
}

.profile-card {
  border-left: 4px solid #3498db;
}

/* 分隔线 */
.section-divider {
  display: flex;
  align-items: center;
  margin: 60px 0 40px;
}

.divider-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e74c3c, transparent);
}

.divider-text {
  padding: 0 30px;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  background: linear-gradient(135deg, #e74c3c, #f39c12);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 视频区域 - 关键优化点 */
.video-section {
  margin-bottom: 0; /* 确保与 Footer 无间隙 */
}

.video-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px 20px 0 0; /* 底部圆角移除，与 Footer 更好衔接 */
  padding: 40px 40px 60px; /* 底部增加 padding 作为视觉缓冲 */
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
}

/* 添加底部渐变过渡效果 */
.video-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.05));
}

.video-header {
  text-align: center;
  margin-bottom: 30px;
}

.video-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #2c3e50, #e74c3c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.video-description {
  color: #7f8c8d;
  font-size: 16px;
  margin: 0;
}

.video-player-wrapper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .card {
    margin: 0 10px;
  }
  
  .video-container {
    padding: 20px 20px 40px;
    margin: 0 10px;
    border-radius: 16px 16px 0 0;
  }
  
  .video-title {
    font-size: 24px;
  }
  
  .container {
    padding: 0 10px;
  }
  
  .divider-text {
    font-size: 16px;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .card-header {
    padding: 16px 20px 12px;
  }
  
  .card-body {
    padding: 16px 20px 20px;
    min-height: 140px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .video-container {
    padding: 16px 16px 32px;
  }

  .main-content {
    padding: 30px 0 40px;
  }
}

/* 加载动画 */
.card {
  animation: slideUp 0.6s ease-out;
}

.card:nth-child(1) {
  animation-delay: 0.1s;
}

.card:nth-child(2) {
  animation-delay: 0.2s;
}

.card:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>