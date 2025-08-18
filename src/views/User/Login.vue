<template>
    <div class="login">
      <h2>登录</h2>
      <form>
        <input type="text" placeholder="用户名" />
        <input type="password" placeholder="密码" />
        <button type="submit">登录</button>
      </form>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px #eee;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  button {
    background: #e74c3c;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
  }
  </style>