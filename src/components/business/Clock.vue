<template>
  <div class="clock-widget">
    <!-- 顶部标题 -->
    <div class="widget-header">
      <span class="clock-icon">⏰</span>
      <span class="widget-title">当前时间</span>
    </div>

    <!-- 问候语 -->
    <div class="greeting-bar">
      <span class="weather-icon">{{ weatherEmoji }}</span>
      <span class="greeting-text">{{ greeting }}</span>
      <span class="wave-icon">👋</span>
    </div>

    <!-- 主时间显示 -->
    <div class="time-display">
      <div class="time-container">
        <span v-for="(part, index) in timeParts" :key="index" class="time-segment">
          <span class="time-digit">{{ part }}</span>
          <span class="time-glow">{{ part }}</span>
          <span v-if="index < 2" class="time-colon">:</span>
        </span>
        <!-- 脉冲效果 -->
        <div class="pulse-effect"></div>
      </div>
    </div>

    <!-- 日期信息卡片 -->
    <div class="date-cards">
      <div class="date-card solar">
        <div class="card-icon">📅</div>
        <div class="card-label">公历</div>
        <div class="card-value">{{ formatSolarDate }}</div>
      </div>
      
      <div class="date-card lunar">
        <div class="card-icon">🏮</div>
        <div class="card-label">农历</div>
        <div class="card-value">{{ formatLunarDate }}</div>
      </div>
    </div>

    <!-- 系统状态 -->
    <div class="status-bar">
      <div class="status-indicator">
        <div class="status-dot active"></div>
        <span class="status-text">系统正常</span>
      </div>
      <div class="status-indicator">
        <div class="status-dot sync"></div>
        <span class="status-text">实时同步</span>
      </div>
    </div>

    <!-- 装饰元素 -->
    <div class="decoration-ring ring-1"></div>
    <div class="decoration-ring ring-2"></div>
    <div class="bottom-glow"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentTime = ref(new Date())
let timer = null

// 计算属性
const timeParts = computed(() => {
  const h = String(currentTime.value.getHours()).padStart(2, '0')
  const m = String(currentTime.value.getMinutes()).padStart(2, '0')
  const s = String(currentTime.value.getSeconds()).padStart(2, '0')
  return [h, m, s]
})

const greeting = computed(() => {
  const hour = currentTime.value.getHours()
  if (hour < 6) return '深夜好'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  if (hour < 22) return '晚上好'
  return '夜晚好'
})

const weatherEmoji = computed(() => {
  const hour = currentTime.value.getHours()
  if (hour < 6 || hour > 20) return '🌙'
  const daytimeEmojis = ['☀️', '⛅', '🌤️']
  return daytimeEmojis[Math.floor(Math.random() * daytimeEmojis.length)]
})

const formatSolarDate = computed(() => {
  const date = currentTime.value
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDay = '日一二三四五六'[date.getDay()]
  return `${year}年${month}月${day}日 星期${weekDay}`
})

const formatLunarDate = computed(() => {
  const month = currentTime.value.getMonth() + 1
  const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', 
                      '七月', '八月', '九月', '十月', '冬月', '腊月']
  return `农历 ${lunarMonths[month - 1] || month + '月'}`
})

function updateTime() {
  currentTime.value = new Date()
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style scoped>
.clock-widget {
  width: 320px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 16px;
  padding: 20px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 顶部标题 */
.widget-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  gap: 8px;
}

.clock-icon {
  font-size: 1.5rem;
}

.widget-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fbbf24;
  letter-spacing: 0.5px;
}

/* 问候语 */
.greeting-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 8px 16px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.weather-icon, .wave-icon {
  font-size: 1.2rem;
  animation: gentle-bounce 2s ease-in-out infinite;
}

.wave-icon {
  animation-delay: 0.3s;
}

.greeting-text {
  font-size: 1rem;
  color: #60a5fa;
  font-weight: 500;
}

/* 时间显示 */
.time-display {
  margin-bottom: 24px;
}

.time-container {
  position: relative;
  text-align: center;
  padding: 20px 0;
}

.time-segment {
  position: relative;
  display: inline-block;
}

.time-digit {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
  font-size: 3.5rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
}

.time-glow {
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
  font-size: 3.5rem;
  font-weight: 700;
  color: #60a5fa;
  opacity: 0.4;
  filter: blur(2px);
  z-index: 1;
}

.time-colon {
  color: #60a5fa;
  font-size: 3.5rem;
  font-weight: 700;
  animation: colon-blink 1s infinite;
  margin: 0 4px;
}

.pulse-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 80%;
  border: 2px solid rgba(96, 165, 250, 0.3);
  border-radius: 12px;
  animation: pulse-ring 2s ease-out infinite;
}

/* 日期卡片 */
.date-cards {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.date-card {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.date-card.solar {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.date-card.lunar {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.card-label {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 4px;
  font-weight: 500;
}

.solar .card-label {
  color: #34d399;
}

.lunar .card-label {
  color: #c084fc;
}

.card-value {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: dot-pulse 2s ease-in-out infinite;
}

.status-dot.active {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.status-dot.sync {
  background: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  animation-delay: 0.5s;
}

.status-text {
  font-size: 0.75rem;
  color: #cbd5e1;
  font-weight: 500;
}

/* 装饰元素 */
.decoration-ring {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: rotate 4s linear infinite;
}

.ring-1 {
  top: -8px;
  left: -8px;
  width: 24px;
  height: 24px;
  border-color: rgba(96, 165, 250, 0.4);
}

.ring-2 {
  bottom: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-color: rgba(168, 85, 247, 0.4);
  animation-direction: reverse;
  animation-duration: 3s;
}

.bottom-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  opacity: 0.6;
}

/* 动画 */
@keyframes gentle-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes colon-blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0.3;
  }
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0;
  }
}

@keyframes dot-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式优化 */
@media (max-width: 480px) {
  .clock-widget {
    width: 300px;
    padding: 16px;
  }
  
  .time-digit,
  .time-glow,
  .time-colon {
    font-size: 3rem;
  }
}
</style>