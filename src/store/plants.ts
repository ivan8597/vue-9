import { defineStore } from "pinia";

type Plant = {
  id?: string;
  name: string;
  watering: string;
  fertilizing: string;
  repotting: string;
  note?: string;
};

export const usePlantsStore = defineStore("plants", {
  state: () => ({
    plants: [] as Plant[],
  }),
  actions: {
    fetchPlants() {
      const storedPlants = localStorage.getItem("plants");
      if (storedPlants) {
        this.plants = JSON.parse(storedPlants);
      } else {
        this.plants = []; 
      }
    },
   addPlant(plant: Omit<Plant, "id"> & { note?: string }) {
      const newPlant: Plant = {
        id: Date.now().toString(),
        ...plant,
      };
      this.plants.push(newPlant);
      localStorage.setItem("plants", JSON.stringify(this.plants));
    }, 

    editPlant(id: string, updatedPlant: Omit<Plant, "id"> & { note?: string }) {
      const index = this.plants.findIndex((plant) => plant.id === id);
      if (index !== -1) {
        this.plants[index] = { ...this.plants[index], ...updatedPlant };
        localStorage.setItem("plants", JSON.stringify(this.plants));
      }
    },
    removePlant(id: string) {
      this.plants = this.plants.filter((plant) => plant.id !== id);
      localStorage.setItem("plants", JSON.stringify(this.plants));
    },
  },
});
