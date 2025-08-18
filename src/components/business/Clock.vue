<template>
  <div class="clock-container">
    <div class="clock-header">
      <span>⏰</span>
      <span class="clock-title">时钟</span>
    </div>
    <div class="time">{{ timeStr }}</div>
    <div class="date">{{ dateStr }}</div>
    <div class="lunar" :class="{ error: lunarStr.includes('失败') }">{{ lunarStr }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import chineseLunar from 'chinese-lunar';

const timeStr = ref('');
const dateStr = ref('');
const lunarStr = ref('');
let timer = null;

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

function updateTime() {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  const week = '日一二三四五六'.charAt(date.getDay());
  timeStr.value = `${h}:${min}:${s}`;
  dateStr.value = `公历：${y}年${m}月${d}日 星期${week}`;

  // 农历
  try {
    const lunar = chineseLunar.solarToLunar(date);
    const formatted = typeof lunar?.format === 'function'
      ? lunar.format('YMD')
      : chineseLunar.format(lunar, 'YMD');
    lunarStr.value = `农历: ${formatted}`;
  } catch (e) {
    console.error('solarToLunar error:', e);
    lunarStr.value = '农历信息获取失败';
  }
}

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.clock-container {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  color: #fff;
  padding: 24px; /* 调整内边距 */
  text-align: center;
  border-radius: 12px; /* 调整圆角 */
  min-width: 240px;
  min-height: 180px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 轻微的阴影效果 */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s ease; /* 增加渐变效果 */
}

.clock-container:hover {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3); /* 鼠标悬停时的阴影效果 */
}

.clock-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.clock-header span:first-child {
  font-size: 2rem;
  margin-right: 8px;
}

.clock-title {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #ffe066;
}

.time {
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin: 8px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.date {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #e0e0e0;
}

.lunar {
  font-size: 1.1rem;
  margin-top: 6px;
  color: #ffb347;
}

.lunar.error {
  color: #ff6666;
  border: 1px solid #ff6666;
  border-radius: 4px;
  padding: 4px;
  margin-top: 6px;
}
</style>
