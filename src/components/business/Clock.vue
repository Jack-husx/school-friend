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
        <div class="solar-term">{{ currentSolarTerm }}</div>
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

// -------------------- 数据与静态表 --------------------
const lunarInfo = [
  // 与你原始数据保持一致（1900 起），长度覆盖到 2050 左右
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  // 补充到 2050（如果需要可以继续扩充）
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
  0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
]

const solarTerms = [
  '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑',
  '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'
]

const solarTermDates2024 = [
  [1, 6], [1, 20], [2, 4], [2, 19], [3, 5], [3, 20], [4, 4], [4, 19],
  [5, 5], [5, 20], [6, 5], [6, 21], [7, 6], [7, 22], [8, 7], [8, 22],
  [9, 7], [9, 22], [10, 8], [10, 23], [11, 7], [11, 22], [12, 6], [12, 21]
]

const solarTermDates2025 = [
  [1, 5], [1, 20], [2, 3], [2, 18], [3, 5], [3, 20], [4, 4], [4, 19],
  [5, 5], [5, 20], [6, 5], [6, 21], [7, 6], [7, 22], [8, 7], [8, 22],
  [9, 7], [9, 22], [10, 8], [10, 23], [11, 7], [11, 22], [12, 6], [12, 21]
]

const lunarMonths = ['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','冬月','腊月']
const lunarDays = [
  '', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
]

// -------------------- 时钟显示相关 --------------------
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

// -------------------- 农历计算：优先 Intl（靠谱） -> 否则 fallback 算法 --------------------

function supportsChineseLunarIntl() {
  try {
    // 试着创建格式器并调用 formatToParts 测试是否返回 month/day
    const f = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'long', day: 'numeric' })
    const parts = f.formatToParts(new Date())
    return parts.some(p => p.type === 'month') && parts.some(p => p.type === 'day')
  } catch (e) {
    return false
  }
}

function formatLunarByIntl(date) {
  // formatToParts 通常会返回中文的农历月/日（例如 "闰六月", "廿六"）
  try {
    const fmt = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { month: 'long', day: 'numeric' })
    const parts = fmt.formatToParts(date)
    const monthPart = parts.find(p => p.type === 'month')?.value || ''
    const dayPart = parts.find(p => p.type === 'day')?.value || ''
    // 有些实现 monthPart 会是 '八月' 或 '闰六月'，dayPart 会是 '廿六' 或 '26' 等
    let isLeap = monthPart.includes('闰') || monthPart.includes('閏')
    // 规范化 monthName（保留带“闰”的中文形式）
    let monthName = monthPart
    if (!monthName) {
      // 极端回退：尝试用 format 获取纯文本并解析
      monthName = fmt.format(date).replace(/\s*\S+$/, '') // 粗糙回退（一般不会到这里）
    }
    let dayName = dayPart
    // 如果 dayPart 是阿拉伯数字，映射到 lunarDays
    const num = parseInt(dayPart, 10)
    if (!isNaN(num) && num >= 1 && num <= 30) {
      dayName = lunarDays[num]
    }
    // 最终显示：若 monthName 中没有 '闰'，而 isLeap 为 true，则加上前缀
    if (isLeap && !/闰|閏/.test(monthName)) {
      monthName = '闰' + monthName
    }
    return `${monthName}${dayName}`
  } catch (e) {
    console.warn('formatLunarByIntl error', e)
    return ''
  }
}

/* ---------- fallback 算法：参考常见实现，修正位掩码与边界 ---------- */

// 返回某年闰月（0 表示无闰月）
function getLeapMonth(year) {
  return lunarInfo[year - 1900] & 0xf
}

// 返回某年闰月天数
function getLeapDays(year) {
  const lm = getLeapMonth(year)
  if (lm) {
    return (lunarInfo[year - 1900] & 0x10000) ? 30 : 29
  }
  return 0
}

// 返回某年某月天数（month: 1-12）
function getMonthDays(year, month) {
  // 修正为常见实现：使用 0x8000 >> (month - 1)
  const info = lunarInfo[year - 1900]
  const mask = 0x8000 >> (month - 1)
  return (info & mask) ? 30 : 29
}

// 返回某年农历年总天数
function getLunarYearDays(year) {
  let sum = 0
  for (let m = 1; m <= 12; m++) {
    sum += getMonthDays(year, m)
  }
  sum += getLeapDays(year)
  return sum
}

function solarToLunarFallback(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 使用 UTC 基准，避免时区偏移
  const baseUTC = Date.UTC(1900, 0, 31)
  let offset = Math.floor((Date.UTC(year, month - 1, day) - baseUTC) / 86400000)

  let i = 1900
  let temp = 0

  // 找到农历年
  for (i = 1900; i < 2050 && offset > 0; i++) {
    temp = getLunarYearDays(i)
    offset -= temp
  }
  if (offset < 0) {
    offset += temp
    i--
  }

  const lunarYear = i
  const leap = getLeapMonth(lunarYear)
  let isLeap = false
  let monthIndex = 1

  // 找到月
  for (monthIndex = 1; monthIndex <= 13 && offset > 0; monthIndex++) {
    if (leap > 0 && monthIndex === leap + 1 && !isLeap) {
      monthIndex--
      isLeap = true
      temp = getLeapDays(lunarYear)
    } else {
      temp = getMonthDays(lunarYear, monthIndex)
    }

    // 处理离开闰月的情况
    if (isLeap && monthIndex === leap + 1) {
      isLeap = false
    }

    offset -= temp
  }

  // 边界调整
  if (offset === 0 && leap > 0 && monthIndex === leap + 1) {
    if (isLeap) {
      isLeap = false
    } else {
      isLeap = true
      monthIndex--
    }
  }

  if (offset < 0) {
    offset += temp
    monthIndex--
  }

  const lunarMonth = monthIndex
  const lunarDay = offset + 1

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeap
  }
}

function formatLunarFallback(date) {
  try {
    const l = solarToLunarFallback(date)
    if (!l) return ''
    const monthName = l.isLeap ? `闰${lunarMonths[l.month - 1]}` : lunarMonths[l.month - 1]
    const dayName = lunarDays[l.day] || ''
    return `${monthName}${dayName}`
  } catch (e) {
    console.warn('formatLunarFallback error', e)
    return ''
  }
}

const formatLunarDate = computed(() => {
  // 优先使用 Intl，如果支持就用浏览器实现（最靠谱）
  if (supportsChineseLunarIntl()) {
    const s = formatLunarByIntl(currentTime.value)
    // 如果 Intl 返回空或异常，则退回算法
    if (s && s.trim()) {
      // debugging: 在控制台输出以便确认（可删）
      // console.debug('农历（Intl）:', s)
      return s
    }
  }
  // fallback 算法（在没有 Intl 或 Intl 不可用时使用）
  const s2 = formatLunarFallback(currentTime.value)
  // console.debug('农历（fallback）:', s2)
  return s2
})

// 简化节气（沿用原表）
const currentSolarTerm = computed(() => {
  const now = currentTime.value
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  const termDates = year === 2025 ? solarTermDates2025 : solarTermDates2024

  let currentTerm = ''
  let nextTerm = ''

  for (let i = 0; i < termDates.length; i++) {
    const [tm, td] = termDates[i]
    if (month < tm || (month === tm && day < td)) {
      nextTerm = solarTerms[i]
      break
    }
    currentTerm = solarTerms[i]
  }

  if (!nextTerm) nextTerm = '小寒'
  return currentTerm || '冬至'
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
/* （样式与你的原来完全一致 — 我不做改动） */
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
  margin-bottom: 4px;
}

.solar-term {
  font-size: 0.7rem;
  color: #fbbf24;
  font-weight: 500;
  opacity: 0.9;
  padding: 2px 6px;
  background: rgba(251, 191, 36, 0.2);
  border-radius: 8px;
  margin-top: 2px;
  display: inline-block;
  border: 1px solid rgba(251, 191, 36, 0.3);
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