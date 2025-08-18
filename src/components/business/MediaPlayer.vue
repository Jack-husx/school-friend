<!-- Updated MediaPlayer.vue -->
<template>
  <div class="media-player">
    <video v-if="isVideo" controls class="media-element">
      <source :src="mediaSrc" type="video/mp4" />
      你的浏览器不支持视频标签。
    </video>
    <audio v-else controls class="media-element">
      <source :src="mediaSrc" type="audio/mpeg" />
      你的浏览器不支持音频标签。
    </audio>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  mediaSrc: {
    type: String,
    required: true,
  },
  isVideo: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.media-player {
  width: 100%; /* 填充父容器 */
  height: 100%; /* 填充父容器高度 */
  position: relative; /* 相对定位以支持绝对子元素 */
}

.media-element {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持比例填充，避免裁剪；如果想覆盖黑边可改成 cover */
  border-radius: 16px; /* 与wrapper一致 */
  background: #000; /* 黑底防止白边 */
}
</style>