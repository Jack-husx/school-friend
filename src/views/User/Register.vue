<template>
  <div class="register">
    <h2>注册</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="用户名" v-model.trim="username" />
      <input type="text" placeholder="昵称" v-model.trim="nickname" />
      <input type="password" placeholder="密码" v-model.trim="password" />
      <input type="password" placeholder="确认密码" v-model.trim="confirmPassword" />

      <!-- 毕业届输入框 + 下拉 -->
      <input
        list="year-options"
        type="number"
        placeholder="请输入毕业届（1970-2030）"
        v-model.number="year"
        min="1970"
        max="2030"
      />
      <datalist id="year-options">
        <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
      </datalist>

      <!-- 身份选择按钮组 -->
      <div class="identity">
        <button
          type="button"
          :class="{ active: identity === '学生' }"
          @click="identity = '学生'"
        >
          学生
        </button>
        <button
          type="button"
          :class="{ active: identity === '教职工' }"
          @click="identity = '教职工'"
        >
          教职工
        </button>
      </div>

      <!-- 验证码区域 -->
      <div class="captcha">
        <canvas ref="captchaCanvas" width="120" height="40"></canvas>
        <button type="button" class="refresh-btn" @click="generateCaptcha">刷新</button>
        <input type="text" placeholder="请输入验证码" v-model.trim="captchaInput" />
      </div>

      <!-- 勾选框区域 -->
      <div class="checkbox-container">
        <input type="checkbox" id="agreement" v-model="agreed" />
        <label for="agreement">
          我已阅读并同意
          <a href="#" @click.prevent="showAgreement('user')">用户协议</a> 和
          <a href="#" @click.prevent="showAgreement('privacy')">隐私政策</a>。
        </label>
      </div>

      <button type="submit">注册</button>
    </form>

    <!-- 模态框 -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>{{ modalTitle }}</h3>
        <p>{{ modalContent }}</p>
        <button @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const username = ref('');
const nickname = ref('');
const password = ref('');
const confirmPassword = ref('');
const year = ref('');
const identity = ref('');
const agreed = ref(false);
const captchaInput = ref('');
const captchaCode = ref('');
const captchaCanvas = ref(null);

// 生成 1970~2030 的下拉选项
const yearRange = Array.from({ length: 2030 - 1970 + 1 }, (_, i) => 1970 + i);

// 模态框状态
const modalVisible = ref(false);
const modalTitle = ref('');
const modalContent = ref('');

const generateCaptcha = () => {
  // 生成4位随机验证码（字母+数字）
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  captchaCode.value = code;

  // 绘制到canvas
  const ctx = captchaCanvas.value.getContext('2d');
  ctx.clearRect(0, 0, 120, 40);
  
  // 背景
  ctx.fillStyle = '#f9f9f9';
  ctx.fillRect(0, 0, 120, 40);
  
  // 绘制文字
  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#333';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < code.length; i++) {
    ctx.save();
    ctx.translate(20 + i * 25, 20);
    ctx.rotate((Math.random() - 0.5) * 0.3); // 轻微旋转
    ctx.fillText(code[i], 0, 0);
    ctx.restore();
  }
  
  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 120, Math.random() * 40);
    ctx.lineTo(Math.random() * 120, Math.random() * 40);
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 50%, 70%)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  // 添加干扰点
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 120, Math.random() * 40, 1, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 70%)`;
    ctx.fill();
  }
};

onMounted(generateCaptcha);

const handleSubmit = () => {
  if (!username.value) {
    alert('请输入用户名');
    return;
  }
  if (!nickname.value) {
    alert('请输入昵称');
    return;
  }
  if (!password.value) {
    alert('请输入密码');
    return;
  }
  if (!confirmPassword.value) {
    alert('请确认密码');
    return;
  }
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致');
    return;
  }
  if (!year.value || year.value < 1970 || year.value > 2030) {
    alert('届别必须在 1970 ~ 2030 之间');
    return;
  }
  if (!identity.value) {
    alert('请选择身份');
    return;
  }
  if (!captchaInput.value) {
    alert('请输入验证码');
    return;
  }
  if (captchaInput.value.toUpperCase() !== captchaCode.value) {
    alert('验证码错误');
    captchaInput.value = '';
    generateCaptcha();
    return;
  }
  if (!agreed.value) {
    alert('请先阅读并同意 用户协议 和 隐私政策');
    return;
  }

  alert(`注册成功！用户名：${username.value}, 昵称：${nickname.value}, 届别：${year.value}, 身份：${identity.value}`);
};

// 显示协议模态框
const showAgreement = (type) => {
  if (type === 'user') {
    modalTitle.value = '用户协议';
    modalContent.value = '这里是用户协议的内容...'; // 可替换为实际内容
  } else if (type === 'privacy') {
    modalTitle.value = '隐私政策';
    modalContent.value = '这里是隐私政策的内容...'; // 可替换为实际内容
  }
  modalVisible.value = true;
};

// 关闭模态框
const closeModal = () => {
  modalVisible.value = false;
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}
h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
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
  transition: border-color 0.3s;
}
input:focus {
  border-color: #e74c3c;
  outline: none;
}

/* 身份选择美化 */
.identity {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.identity button {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  background: #f8f8f8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}
.identity button.active {
  background: #e74c3c;
  color: #fff;
  border-color: #e74c3c;
}
.identity button:hover {
  background: #f1f1f1;
}

/* 验证码样式 */
.captcha {
  display: flex;
  align-items: center;
  gap: 10px;
}
.captcha canvas {
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f9f9f9;
}
.captcha input {
  flex: 1;
}
.refresh-btn {
  padding: 8px 12px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
.refresh-btn:hover {
  background: #e0e0e0;
}

/* 复选框 */
.checkbox-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  text-align: left;
  gap: 8px;
}
.checkbox-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.checkbox-container a {
  color: #e74c3c;
  text-decoration: none;
}
.checkbox-container a:hover {
  text-decoration: underline;
}

button[type="submit"] {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}
button[type="submit"]:hover {
  background: #c0392b;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}
</style>