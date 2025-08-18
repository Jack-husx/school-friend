<template>
    <div class="not-found-container">
      <div class="not-found-content">
        <!-- 404 数字 -->
        <div class="error-code">
          <span class="digit">4</span>
          <span class="digit">0</span>
          <span class="digit">4</span>
        </div>
        
        <!-- 错误信息 -->
        <div class="error-message">
          <h2>页面未找到</h2>
          <p class="error-description">
            抱歉，您访问的页面不存在或已被移动
          </p>
        </div>
        
        <!-- 操作按钮 -->
        <div class="error-actions">
          <button class="btn-primary" @click="goHome">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            返回首页
          </button>
          
          <button class="btn-secondary" @click="goBack">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            返回上页
          </button>
        </div>
        
        <!-- 建议链接 -->
        <div class="suggestions">
          <p class="suggestions-title">您可能想要访问：</p>
          <ul class="suggestions-list">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/news">校园快讯</router-link></li>
            <li><router-link to="/pastHistory">往昔岁月</router-link></li>
            <li><router-link to="/contact">联系我们</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // 返回首页
  const goHome = () => {
    router.push('/')
  }
  
  // 返回上一页
  const goBack = () => {
    if (window.history.length > 1) {
      router.go(-1)
    } else {
      router.push('/')
    }
  }
  </script>
  
  <style scoped>
  .not-found-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .not-found-content {
    text-align: center;
    background: white;
    border-radius: 20px;
    padding: 60px 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    animation: slideUp 0.6s ease-out;
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
  
  .error-code {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .digit {
    font-size: 120px;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: bounce 2s infinite;
  }
  
  .digit:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  .digit:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  .error-message h2 {
    font-size: 32px;
    color: #2d3748;
    margin-bottom: 15px;
    font-weight: 700;
  }
  
  .error-description {
    font-size: 18px;
    color: #718096;
    margin-bottom: 40px;
    line-height: 1.6;
  }
  
  .error-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  
  .btn-primary, .btn-secondary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
  
  .btn-secondary {
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
  }
  
  .btn-secondary:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  .suggestions {
    border-top: 1px solid #e2e8f0;
    padding-top: 30px;
  }
  
  .suggestions-title {
    font-size: 16px;
    color: #4a5568;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .suggestions-list {
    display: flex;
    gap: 30px;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
  }
  
  .suggestions-list a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;
  }
  
  .suggestions-list a:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .not-found-content {
      padding: 40px 20px;
      margin: 10px;
    }
    
    .digit {
      font-size: 80px;
    }
    
    .error-message h2 {
      font-size: 24px;
    }
    
    .error-description {
      font-size: 16px;
    }
    
    .error-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .btn-primary, .btn-secondary {
      width: 200px;
      justify-content: center;
    }
    
    .suggestions-list {
      flex-direction: column;
      gap: 15px;
    }
  }
  
  @media (max-width: 480px) {
    .digit {
      font-size: 60px;
    }
    
    .error-code {
      gap: 5px;
    }
  }
  </style>