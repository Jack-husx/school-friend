<template>
  <div class="contact-container" role="region" aria-label="联系我们">
    <h2>联系我们</h2>
    <div class="contact-info">
      <p><strong>地址：</strong>中国湖北省黄冈市浠水县巴河镇闻一多大道01号</p>
      <p>邮编：438207 | 电话：0713-xxxxxxx</p>
    </div>

    <!-- 地图容器 -->
    <div id="map" class="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-fullscreen" // 引入全屏插件
import "leaflet-fullscreen/dist/leaflet.fullscreen.css" // 引入全屏插件样式

// 修复 marker 图标丢失问题
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

// 经纬度（换成你的：30.429188747976934, 115.03464176016068）
const lat = 30.429188747976934
const lon = 115.03464176016068

onMounted(() => {
  // 初始化地图
  const map = L.map("map").setView([lat, lon], 15)

  // OSM 瓦片层
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(map)

  // 添加全屏控制
  L.control.fullscreen({
    position: 'topleft', // 全屏按钮位置
    title: '全屏',
    titleCancel: '退出全屏',
    forceSeparateButton: true, // 强制使用单独的全屏按钮
  }).addTo(map);

  // 添加 marker
  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("我们在这里 📍")
    .openPopup()
})
</script>

<style scoped>
.contact-container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border: 1.5px solid #e74c3c;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #111;
}
.contact-info {
  margin-bottom: 16px;
}
.map {
  width: 100%;
  height: 420px;
  border-radius: 8px;
  border: 1px dashed #e74c3c;
}
</style>
