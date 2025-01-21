<template>
  <div>
    <div v-if="!isAuthenticated">
      <Login @login="onLogin" />
    </div>
    <div v-else>
    <h1>Управление растениями</h1>
      <PlantForm @submit="onPlantFormSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import Login from "@/pages/login.vue"; 
import PlantForm from "@/pages/plantform.vue"; 
// import PlantList from "@/src/components/PlantList.vue"; 
import { ref } from "vue";

export default {
  components: {
    Login,
    PlantForm,
    // PlantList,
  },
  setup() {
    const isAuthenticated = ref(false);
    console.log("isAuthenticated:", isAuthenticated.value); // Для отладки

    const onLogin = () => {
      isAuthenticated.value = true; // Устанавливаем аутентификацию в true
      console.log("User logged in, isAuthenticated:", isAuthenticated.value); // Для отладки
    };

    const onPlantFormSubmit = () => {
      console.log("Plant form submitted"); // Для отладки
    };

    return {
      isAuthenticated,
      onLogin,
      onPlantFormSubmit,
    };
  },
};
</script>
