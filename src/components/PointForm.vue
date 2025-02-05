<template>
  <form @submit.prevent="savePoint" class="p-4 bg-white rounded shadow-md">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
      <input
        id="name"
        v-model="name"
        placeholder="Enter point name"
        class="mt-1 p-2 border border-gray-300 rounded-md w-full"
      />
    </div>
   
    <div class="flex justify-between">
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Save</button>
      <button type="button" @click="createPoint" class="bg-green-500 text-white p-2 rounded">Create Point</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import { usePointStore } from "../store";
import { Point } from "../model/Point";

export default defineComponent({
  setup() {
    const store = usePointStore();

    const name = ref("");


    const savePoint = () => {
      if (store.currentPoint) {
        store.updatePoint(new Point(store.currentPoint.id, name.value));
      }
    };

    const createPoint = () => {
      const newPoint = new Point(store.points.length + 1, name.value);
      
      console.log(`Creating new point:`, newPoint);
      
      store.addPoint(newPoint.name);

      console.log(`Total points after addition: ${store.points.length}`);
      
      nextTick(() => {
        const virtualScroll = document.querySelector('.q-virtual-scroll');
        if (virtualScroll) {
          virtualScroll.scrollTo({ top: virtualScroll.scrollHeight, behavior: 'smooth' });
          console.log(`Scrolled to new point: point-${newPoint.id}`);
        }
      });
    };

    return {
      name,
      savePoint,
      createPoint,
    };
  },
});
</script>
