<template>
  <div class="container">
    <div class="form-container">
      <h1>Управление растениями</h1>
      <PlantsForm
        :formData="formData"
        :onSubmit="submitPlant"
        submitButtonText="Добавить растение"
      />
    </div>

    <div class="plant-list" v-if="plants.length">
      <h2>Мои растения</h2>
      <ul>
        <li v-for="plant in plants" :key="plant.id" class="plant-item">
          <div class="plant-info">
            <div class="plant-care">
              <div class="plant-name">{{ plant.name }}</div>
              <div class="plant-watering">
                <span>Поливать:</span> {{ plant.watering }}
              </div>
              <div class="plant-fertilizing">
                <span>Удобрять:</span> {{ plant.fertilizing }}
              </div>
              <div class="plant-repotting">
                <span>Пересаживать:</span> {{ plant.repotting }}
              </div>
            </div>
            <div class="plant-note"><span>Заметки: </span>{{ plant.note }}</div>
          </div>
          <div class="button-container">
            <button @click="openEditModal(plant)">Редактировать</button>
            <button @click="deletePlant(plant.id)">Удалить</button>
          </div>
        </li>
      </ul>
    </div>

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
import PlantsForm from "@/src/components/PlantsForm.vue";

export default defineComponent({
  components: {
    ModalPlants,
    PlantsForm,
  },
  setup() {
    const store = usePlantsStore();
    store.fetchPlants();
    const plants = computed(() => store.plants);

    const formData = ref({
      name: "",
      watering: "",
      fertilizing: "",
      repotting: "",
      note: "",
    });

    const currentPlant = ref(null);
    const isModalOpen = ref(false);

    const submitPlant = async () => {
      console.log("Current values:", formData.value);
      await store.addPlant(formData.value);
      console.log("Added new plant:", formData.value);
      // Сброс значений
      formData.value = {
        name: "",
        watering: "",
        fertilizing: "",
        repotting: "",
        note: "",
      };
      store.fetchPlants();
    };

    const deletePlant = (id: string) => {
      store.removePlant(id);
    };

    const openEditModal = (plant) => {
      console.log("Opening modal with plant data:", plant);
      currentPlant.value = { ...plant };
      isModalOpen.value = true;
    };

    const closeEditModal = () => {
      isModalOpen.value = false;
      currentPlant.value = null;
    };

    const savePlant = (updatedPlant) => {
      console.log("Saving plant data:", updatedPlant);
      store.editPlant(currentPlant.value.id, updatedPlant);
      closeEditModal();
    };

    return {
      plants,
      formData,
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
.container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.form-container {
  flex: 1;
  max-width: 400px;
  margin-right: 20px;
}
.plant-list {
  position: relative;
  background-color: #f0f8ff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
  max-height: 700px;
  overflow-y: auto; 
}

.plant-list h2 {
  background-color: #f0f8ff; 
  padding: 10px 0; 
  z-index: 10; 
  text-align: center;
  color: #2c3e50; 
}

ul {
  list-style-type: none;
  padding: 0;
}

.plant-item {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin: 10px 0;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.plant-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.plant-info {
  display: flex;
  justify-content: space-between; 
  align-items: flex-start; 
}

span {
  font-weight: bold;
}
.plant-name {
  font-weight: bold; 
  font-size: 16px;
  color: #3498db; 
}

.plant-care {
  display: flex;
  flex-direction: column; 
  flex: 1; 

  margin-right: 19px;
}

.plant-watering,
.plant-fertilizing,
.plant-repotting {
  font-size: 14px;
  color: #7f8c8d; 
}

.plant-note {
  font-size: 14px;
  color: #7f8c8d;
  font-style: italic;
  margin-top: 10px; 
}

.button-container {
  display: flex;
  justify-content: flex-end; 
  margin-top: 10px; 
}

button {
  background-color: #3498db; 
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px; 
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9; 
}

button:focus {
  outline: none; 
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 300px;
}
</style>
