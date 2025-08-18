<template>
    <div>
      <Header />
      <main>
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '../common/Header.vue'
  import Footer from '../common/Footer.vue'
  </script>
  
  <style scoped>
  main {
    min-height: 70vh;
    background: #f8f9fa;
    padding-bottom: 30px;
  }
  </style>