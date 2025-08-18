<script setup>
import Banner from '../../components/business/Banner.vue';
import NewsCard from '../../components/business/NewsCard.vue';
import UserProfile from '../../components/business/UserProfile.vue';
import Clock from '../../components/business/Clock.vue';
import MediaPlayer from '../../components/business/MediaPlayer.vue';
</script>

<template>
  <div class="home">
    <div class="banner-wrapper">
      <Banner />
    </div>
    <div class="main-section">
      <div class="main-row">
        <div class="clock-col">
          <Clock />
        </div>
        <div class="notification-col">
          <NewsCard />
        </div>
        <div class="notification-col">
          <UserProfile />
        </div>
      </div>
    </div>
    <div class="video-wrapper">
        <MediaPlayer mediaSrc="../public/media/qzzg.mp4" :isVideo="true" class="media-player" />
      </div>
  </div>
</template>

<style scoped>
.banner-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.main-section {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.main-row {
  width: 1100px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.clock-col {
  flex: 1;
  margin: 0 10px;
  min-width: 250px;
  min-height: 180px;
  background: transparent; /* 时钟无背景 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-col {
  flex: 1;
  margin: 0 10px;
  min-width: 250px;
  min-height: 180px;
  background: #fff; /* 通知栏背景色 */
  border: 1.5px solid #e74c3c; /* 通知栏边框 */
  border-radius: 12px; /* 保持圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-wrapper {
  width: 100%; /* 视频容器宽度 */
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 30px; /* 增加顶部间距 */
  padding: 0 10px; /* 添加左右内边距 */
}

</style>
