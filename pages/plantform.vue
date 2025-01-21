<template>
  <div>
    <h1>Управление растениями</h1>
    <form @submit.prevent="submitPlant" class="plantform">
      <input
        v-model="name"
        placeholder="Название растения"
        required
        class="input-field"
      />
      <input
        v-model="watering"
        placeholder="Когда поливать"
        required
        class="input-field"
      />
      <input
        v-model="fertilizing"
        placeholder="Когда удобрять"
        required
        class="input-field"
      />
      <input
        v-model="repotting"
        placeholder="Когда пересаживать"
        required
        class="input-field"
      />
      <button type="submit" class="submit-button">Добавить растение</button>
    </form>

    <div class="plant-list" v-if="plants.length">
      <h2>Мои растения</h2>
      <ul>
        <li v-for="plant in plants" :key="plant.id" class="plant-item">
          <div class="plant-info">
            <span class="plant-name">{{ plant.name }}</span>
            <span class="plant-watering">Поливать: {{ plant.watering }}</span>
          </div>
          <div class="plant-care">
            <span class="plant-fertilizing">Удобрять: {{ plant.fertilizing }}</span>
            <span class="plant-repotting">Пересаживать: {{ plant.repotting }}</span>
          </div>
          <button @click="openEditModal(plant)">Редактировать</button>
          <button @click="deletePlant(plant.id)">Удалить</button>
        </li>
      </ul>
    </div>

    <!-- Модальное окно для редактирования -->
    <ModalPlants
      v-if="isModalOpen"
      :plant="currentPlant"
      :onClose="closeEditModal"
      :onSave="savePlant"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { usePlantsStore } from "@/src/store/plants";
import ModalPlants from "@/src/components/ModalPlants.vue";

export default defineComponent({
  components: {
    ModalPlants,
  },
  setup() {
    const store = usePlantsStore();
    store.fetchPlants(); // Загружаем растения из хранилища
    const plants = computed(() => store.plants);

    const name = ref("");
    const watering = ref("");
    const fertilizing = ref("");
    const repotting = ref("");
    
    const currentPlant = ref(null);
    const isModalOpen = ref(false);

    const submitPlant = async () => {
      await store.addPlant({
        name: name.value,
        watering: watering.value,
        fertilizing: fertilizing.value,
        repotting: repotting.value,
      });
      name.value = "";
      watering.value = "";
      fertilizing.value = "";
      repotting.value = "";
      store.fetchPlants(); // Обновляем список растений
    };

    const deletePlant = (id: string) => {
      store.removePlant(id);
    };

    const openEditModal = (plant) => {
      currentPlant.value = plant; // Устанавливаем текущее растение для редактирования
      isModalOpen.value = true; // Открываем модальное окно
    };

    const closeEditModal = () => {
      isModalOpen.value = false; // Закрываем модальное окно
      currentPlant.value = null; // Сбрасываем текущее растение
    };

    const savePlant = (updatedPlant) => {
      store.editPlant(currentPlant.value.id, updatedPlant); // Обновляем растение
      closeEditModal(); // Закрываем модальное окно
    };

    return {
      plants,
      name,
      watering,
      fertilizing,
      repotting,
      submitPlant,
      deletePlant,
      openEditModal,
      isModalOpen,
      currentPlant,
      closeEditModal,
      savePlant,
    };
  },
});
</script>

<style scoped>
.plantform {
  background-color: #f9f9f9; /* Светлый фон */
  border-radius: 12px; /* Скругление углов */
  padding: 20px; /* Отступы внутри формы */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Тень для глубины */
  max-width: 400px; /* Максимальная ширина формы */
  margin: 20px auto; /* Центрирование формы */
}

.input-field {
  width: 100%; /* Полная ширина */
  padding: 12px; /* Паддинг внутри полей */
  margin: 10px 0; /* Отступы между полями */
  border: 1px solid #ccc; /* Светлая рамка */
  border-radius: 6px; /* Скругление углов */
  font-size: 16px; /* Размер шрифта */
  transition: border-color 0.3s; /* Плавный переход цвета рамки */
}

.input-field:focus {
  border-color: #3498db; /* Цвет рамки при фокусе */
  outline: none; /* Убираем стандартную рамку при фокусе */
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); /* Легкая тень при фокусе */
}

.submit-button {
  background-color: #28a745; /* Зеленый цвет кнопки */
  color: white; /* Цвет текста */
  padding: 10px 15px; /* Паддинг внутри кнопки */
  border: none; /* Убираем рамку */
  border-radius: 6px; /* Скругление углов */
  cursor: pointer; /* Указатель при наведении */
  font-size: 16px; /* Размер шрифта */
  transition: background-color 0.3s; /* Плавный переход цвета фона */
}

.submit-button:hover {
  background-color: #218838; /* Темный зеленый цвет при наведении */
}

.plant-list {
  background-color: #f0f8ff; /* Легкий фон */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif; /* Шрифт для всего компонента */
}

.plant-list h2 {
  text-align: center;
  color: #2c3e50; /* Темный цвет заголовка */
  margin-bottom: 20px; /* Отступ снизу */
}

ul {
  list-style-type: none; /* Убираем маркеры */
  padding: 0; /* Убираем отступы */
}

.plant-item {
  background-color: #ffffff; /* Белый фон для элементов списка */
  margin: 10px 0; /* Отступы между элементами */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s; /* Плавный эффект при наведении */
}

.plant-item:hover {
  transform: translateY(-2px); /* Подъем при наведении */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Увеличенная тень при наведении */
}

.plant-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold; /* Жирный шрифт для имени растения */
}

.plant-care {
  margin-top: 5px;
  font-size: 14px;
  color: #7f8c8d; /* Серый цвет для дополнительной информации */
}

.plant-fertilizing,
.plant-repotting {
  display: inline-block; /* Отображение в одной строке */
  margin-right: 15px; /* Отступ между элементами */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white; /* Белый фон для модального окна */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 300px; /* Ширина модального окна */
}
</style>