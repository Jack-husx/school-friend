<template>
    <div class="forgot-password">
      <h2>找回密码</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="请输入用户名" v-model.trim="username" />
        <input type="text" placeholder="请输入邮箱或手机号" v-model.trim="account" />
        <div class="verification">
          <input type="text" placeholder="验证码" v-model.trim="code" />
          <button type="button" @click="sendCode" :disabled="countdown > 0">
            {{ countdown > 0 ? countdown + '秒后重发' : '发送验证码' }}
          </button>
        </div>
        <input type="password" placeholder="新密码" v-model.trim="newPassword" />
        <input type="password" placeholder="确认新密码" v-model.trim="confirmPassword" />
        <button type="submit">确认修改</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const account = ref('');
  const code = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  const countdown = ref(0);
  let timer = null;
  
  // 模拟发送验证码
  const sendCode = () => {
    if (!account.value) {
      alert('请输入邮箱或手机号');
      return;
    }
    alert('验证码已发送（模拟）');
    countdown.value = 60;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) clearInterval(timer);
    }, 1000);
  };
  
  // 提交修改
  const handleSubmit = () => {
    if (!username.value) {
      alert('请输入用户名');
      return;
    }
    if (!account.value) {
      alert('请输入邮箱或手机号');
      return;
    }
    if (!code.value) {
      alert('请输入验证码');
      return;
    }
    if (!newPassword.value) {
      alert('请输入新密码');
      return;
    }
    if (newPassword.value !== confirmPassword.value) {
      alert('两次输入的密码不一致');
      return;
    }
    alert('密码修改成功！请返回登录');
  };
  </script>
  
  <style scoped>
  .forgot-password {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  .verification {
    display: flex;
    gap: 10px;
  }
  .verification input {
    flex: 2;
  }
  .verification button {
    flex: 1;
    background: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .verification button:disabled {
    background: #ccc;
  }
  button[type="submit"] {
    background: #e74c3c;
    color: #fff;
    border: none;
    padding: 12px;
    font-size: 16px;
    border-radius: 4px;
  }
  button[type="submit"]:hover {
    background: #c0392b;
  }
  </style>
  