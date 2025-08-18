<template>
    <form>
      <input type="text" placeholder="您的姓名" />
      <input type="email" placeholder="您的邮箱" />
      <textarea placeholder="留言内容"></textarea>
      <button type="submit">提交</button>
    </form>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  button {
    background: #e74c3c;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
  }
  </style>