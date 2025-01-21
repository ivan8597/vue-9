<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Редактировать растение</h2>
      <form @submit.prevent="savePlant">
        <input
          v-model="plantData.name"
          placeholder="Название растения"
          required
          class="input-field"
        />
        <input
          v-model="plantData.watering"
          placeholder="Когда поливать"
          required
          class="input-field"
        />
        <input
          v-model="plantData.fertilizing"
          placeholder="Когда удобрять"
          required
          class="input-field"
        />
        <input
          v-model="plantData.repotting"
          placeholder="Когда пересаживать"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button">Сохранить</button>
        <button type="button" @click="closeModal">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    plant: {
      type: Object,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    onSave: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const plantData = ref({ ...props.plant }); // Заполняем данные растения

    const savePlant = () => {
      props.onSave(plantData.value); // Вызываем функцию сохранения с новыми данными
    };

    const closeModal = () => {
      props.onClose(); // Закрываем модальное окно
    };

    return {
      plantData,
      savePlant,
      closeModal,
    };
  },
});
</script>
<style scoped>
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
