<!-- Footer.vue (美化重设计版本) -->
<template>
  <footer class="footer">
    <!-- 主要内容区域 -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- 学校信息区域 -->
          <div class="school-section">
            <div class="school-logo">
              <div class="logo-icon">闻</div>
              <div class="logo-text">
                <h2 class="school-title">闻一多中学校友会</h2>
                <p class="school-subtitle">传承文化 连接未来</p>
              </div>
            </div>
            
            <div class="contact-grid">
              <div class="contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div class="contact-info">
                  <span class="contact-label">地址</span>
                  <span class="contact-value">湖北省黄冈市浠水县巴河镇闻一多大道01号</span>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div class="contact-info">
                  <span class="contact-label">联系方式</span>
                  <span class="contact-value">邮编 438207 | 电话 0713-xxxxxxx</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 快速链接 -->
          <div class="links-section">
            <h3 class="section-title">
              <span class="title-icon">🔗</span>
              快速链接
            </h3>
            <nav class="nav-links">
              <router-link to="/" class="nav-item">
                <span class="nav-icon">🏠</span>
                <span>首页</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/news" class="nav-item">
                <span class="nav-icon">📰</span>
                <span>校园快讯</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/pastHistory" class="nav-item">
                <span class="nav-icon">📚</span>
                <span>往昔岁月</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/contact" class="nav-item">
                <span class="nav-icon">📞</span>
                <span>联系我们</span>
                <span class="nav-arrow">→</span>
              </router-link>
            </nav>
          </div>

          <!-- 热门内容 -->
          <div class="content-section">
            <h3 class="section-title">
              <span class="title-icon">🔥</span>
              热门内容
            </h3>
            <nav class="nav-links">
              <router-link to="/news/internal" class="nav-item">
                <span class="nav-icon">📋</span>
                <span>校内新闻</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/news/announcement" class="nav-item">
                <span class="nav-icon">📢</span>
                <span>公告通知</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/pastHistory/stories" class="nav-item">
                <span class="nav-icon">📖</span>
                <span>校友故事</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/pastHistory/photos" class="nav-item">
                <span class="nav-icon">📷</span>
                <span>历史照片</span>
                <span class="nav-arrow">→</span>
              </router-link>
            </nav>
          </div>

          <!-- 用户中心 -->
          <div class="user-section">
            <h3 class="section-title">
              <span class="title-icon">👤</span>
              用户中心
            </h3>
            <nav class="nav-links">
              <router-link to="/login" class="nav-item login-item">
                <span class="nav-icon">🔐</span>
                <span>用户登录</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/register" class="nav-item register-item">
                <span class="nav-icon">📝</span>
                <span>用户注册</span>
                <span class="nav-arrow">→</span>
              </router-link>
              <router-link to="/forgot-password" class="nav-item">
                <span class="nav-icon">🔑</span>
                <span>忘记密码</span>
                <span class="nav-arrow">→</span>
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部版权区域 -->
    <div class="footer-bottom">
      <div class="container">
        <div class="bottom-content">
          <div class="copyright">
            <span class="copyright-text">© 2025 闻一多中学校友会</span>
            <span class="rights">版权所有</span>
          </div>
          
          <div class="bottom-links">
            <router-link to="/" class="bottom-link">首页</router-link>
            <span class="divider">•</span>
            <router-link to="/news" class="bottom-link">校园快讯</router-link>
            <span class="divider">•</span>
            <router-link to="/pastHistory" class="bottom-link">往昔岁月</router-link>
            <span class="divider">•</span>
            <router-link to="/contact" class="bottom-link">联系我们</router-link>
          </div>
          
          <div class="back-to-top" @click="scrollToTop">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
            <span>回到顶部</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 回到顶部功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 监听滚动，显示/隐藏回到顶部按钮
const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 整体布局 */
.footer {
  background: linear-gradient(135deg, #1a2332 0%, #2c3e50 50%, #34495e 100%);
  color: #ecf0f1;
  position: relative;
  overflow: hidden;
  margin-top: 0;
}

/* 装饰背景 */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #e74c3c 0%, #f39c12 25%, #e67e22 50%, #d35400 75%, #e74c3c 100%);
  background-size: 200% 100%;
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(231, 76, 60, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(52, 152, 219, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* 主要内容区域 */
.footer-main {
  padding: 60px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 50px;
  align-items: start;
}

/* 学校信息区域 */
.school-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.school-logo {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  box-shadow: 0 8px 20px rgba(231, 76, 60, 0.3);
}

.logo-text {
  flex: 1;
}

.school-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.school-subtitle {
  font-size: 14px;
  color: #bdc3c7;
  margin: 0;
  font-style: italic;
}

.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 4px solid #e74c3c;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: #e74c3c;
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-size: 12px;
  color: #95a5a6;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 14px;
  color: #ecf0f1;
  line-height: 1.4;
}

/* 导航区域 */
.links-section,
.content-section,
.user-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.title-icon {
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #bdc3c7;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(90deg, #e74c3c, #c0392b);
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(8px);
}

.nav-item:hover::before {
  width: 4px;
}

.nav-item.router-link-active {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  font-weight: 500;
}

.nav-item.router-link-active::before {
  width: 4px;
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.nav-arrow {
  margin-left: auto;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
  font-weight: bold;
  color: #e74c3c;
}

.nav-item:hover .nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* 特殊样式 */
.login-item:hover {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.register-item:hover {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

/* 底部版权区域 */
.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.copyright-text {
  color: #bdc3c7;
}

.rights {
  color: #95a5a6;
  font-size: 12px;
}

.bottom-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bottom-link {
  color: #95a5a6;
  text-decoration: none;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.bottom-link:hover {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
}

.bottom-link.router-link-active {
  color: #e74c3c;
}

.divider {
  color: #7f8c8d;
  font-size: 16px;
}

.back-to-top {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #95a5a6;
  cursor: pointer;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.back-to-top:hover {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border-color: #e74c3c;
  transform: translateY(-2px);
}

.back-to-top svg {
  width: 16px;
  height: 16px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .user-section {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .school-logo {
    justify-content: center;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .contact-icon {
    margin: 0 auto;
  }
  
  .bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .bottom-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-main {
    padding: 40px 0 30px;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .school-title {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .nav-item {
    padding: 10px 12px;
  }
}

/* 动画效果 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-grid > * {
  animation: slideInUp 0.6s ease-out both;
}

.footer-grid > *:nth-child(1) { animation-delay: 0.1s; }
.footer-grid > *:nth-child(2) { animation-delay: 0.2s; }
.footer-grid > *:nth-child(3) { animation-delay: 0.3s; }
.footer-grid > *:nth-child(4) { animation-delay: 0.4s; }

/* 无障碍优化 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 高对比度支持 */
@media (prefers-contrast: high) {
  .footer {
    background: #000;
    color: #fff;
  }
  
  .nav-item {
    border: 1px solid #fff;
  }
  
  .contact-item {
    border: 1px solid #fff;
  }
}
</style>