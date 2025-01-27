<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Редактировать растение</h2>
      <PlantsForm
        :formData="formData"
        :onSubmit="savePlant"
        submitButtonText="Сохранить"
      />
      <button type="button" @click="closeModal">Отмена</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import PlantsForm from "@/src/components/PlantsForm.vue";

export default defineComponent({
  components: {
    PlantsForm,
  },
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
    // Инициализируем formData как реактивный объект
    const formData = ref({
      name: props.plant.name,
      watering: props.plant.watering,
      fertilizing: props.plant.fertilizing,
      repotting: props.plant.repotting,
      note: props.plant.note,
    });

    // Наблюдение за изменениями в пропсе `plant`
    watch(
      () => props.plant,
      (newPlant) => {
        formData.value = {
          name: newPlant.name,
          watering: newPlant.watering,
          fertilizing: newPlant.fertilizing,
          repotting: newPlant.repotting,
          note: newPlant.note,
        };
      }
    );

    const savePlant = () => {
      console.log("Plant data before saving:", formData.value);
      props.onSave(formData.value); 
    };

    const closeModal = () => {
      props.onClose(); 
    };

    return {
      formData,
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
}
</style>
