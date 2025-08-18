<template>
  <div class="login">
    <h2>登录</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="用户名" v-model.trim="username" />
      <input type="password" placeholder="密码" v-model.trim="password" />
      <button type="submit">登录</button>
    </form>

    <!-- 忘记密码 -->
    <div class="extra-options">
      <a href="#" @click.prevent="goForgotPassword">忘记密码？</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = () => {
  if (!username.value) {
    alert('请输入用户名');
    return;
  }
  if (!password.value) {
    alert('请输入密码');
    return;
  }

  alert('登录成功！');
};

// 跳转忘记密码页
const goForgotPassword = () => {
  router.push('/forgot-password');
};
</script>

<style scoped>
/* 保持和注册页面一致 */
.login {
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
button {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
}
button:hover {
  background: #c0392b;
}
.extra-options {
  margin-top: 10px;
  text-align: right;
}
.extra-options a {
  font-size: 14px;
  color: #e74c3c;
  text-decoration: none;
}
.extra-options a:hover {
  text-decoration: underline;
}
</style>
