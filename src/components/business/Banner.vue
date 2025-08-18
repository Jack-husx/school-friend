<template>
  <div class="banner-carousel">
    <el-carousel
      height="180px"
      :interval="2000"
      arrow="always"
      indicator-position="outside"
      autoplay
    >
      <el-carousel-item v-for="(img, idx) in images" :key="idx">
        <img :src="img" class="banner-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 静态导入图片
import banner1 from '@/assets/images/banner1.jpg'
import banner2 from '@/assets/images/banner2.jpg'
import banner3 from '@/assets/images/banner3.jpg'

const images = ref([banner1, banner2, banner3])
</script>

<style scoped>
.banner-carousel {
  width: 900px;
  margin: 30px auto 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px #eee;
  border: 1.5px solid #e74c3c;
  background: #fff;
}
.banner-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}
</style>