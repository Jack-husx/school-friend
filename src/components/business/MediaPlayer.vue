<template>
  <div class="media-player">
    <video v-if="isVideo" controls>
      <source :src="mediaSrc" type="video/mp4" />
      你的浏览器不支持视频标签。
    </video>
    <audio v-else controls>
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
  margin: 20px auto; /* 上下各20px，左右自动居中 */
  text-align: center;
  background: transparent; /* 去掉背景 */
  max-width: 80%; /* 设置最大宽度为 80% */
}

.media-player video,
.media-player audio {
  width: 80%; /* 宽度为 100% */
  height: auto; /* 高度自适应 */
}
</style>
