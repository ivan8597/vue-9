<template>
  <div class="auth-container">
    <h2>Авторизация</h2>
    <form @submit.prevent="login" class="auth-form">
      <input v-model="email" type="email" placeholder="Электронная почта" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const login = () => {
      // Проверяем, что поля не пустые
      if (!email.value || !password.value) {
        alert("Пожалуйста, заполните все поля");
        return;
      }

      // Сохраняем электронную почту и пароль в localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("email", email.value); // Сохраняем электронную почту
      localStorage.setItem("password", password.value); // Сохраняем пароль
      router.push("/plantform");
    };

    return { email, password, login };
  },
});
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-form input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.auth-form button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.auth-form button:hover {
  background-color: #218838;
}
</style>