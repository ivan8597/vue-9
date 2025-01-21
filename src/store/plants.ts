import { defineStore } from "pinia";

// Определим интерфейс для растения
type Plant = {
  id?: string; // id может отсутствовать при добавлении нового растения
  name: string;
  watering: string;
  fertilizing: string;
  repotting: string;
};

export const usePlantsStore = defineStore("plants", {
  state: () => ({
    plants: [] as Plant[], // Используем интерфейс Plant для типизации
  }),
  actions: {
    fetchPlants() {
      // Загружаем данные из localStorage
      const storedPlants = localStorage.getItem("plants");
      if (storedPlants) {
        this.plants = JSON.parse(storedPlants);
      }
    },
    addPlant(plant: Omit<Plant, "id">) {
      // Генерация уникального ID для нового растения
      const newPlant: Plant = {
        id: Date.now().toString(), // Используем timestamp как уникальный ID
        ...plant,
      };

      // Добавляем растение в локальное состояние
      this.plants.push(newPlant);

      // Сохраняем обновленный список в localStorage
      localStorage.setItem("plants", JSON.stringify(this.plants));
    },


    editPlant(id: string, updatedPlant: Omit<Plant, "id">) {
      // Находим индекс растения по ID
      const index = this.plants.findIndex(plant => plant.id === id);
      if (index !== -1) {
        this.plants[index] = { ...this.plants[index], ...updatedPlant }; // Обновляем информацию о растении
        localStorage.setItem("plants", JSON.stringify(this.plants)); // Сохраняем изменения в localStorage
      }
    },
    removePlant(id: string) {
      this.plants = this.plants.filter((plant) => plant.id !== id);
      localStorage.setItem("plants", JSON.stringify(this.plants));
    },
  },
});
