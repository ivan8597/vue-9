<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="formData.name"
      @input="validateInput"
      placeholder="Название растения"
      required
      class="input-field"
    />
    <label>Когда поливать:</label>
    <input
      v-model="formData.watering"
      type="date"
      placeholder="Когда поливать"
      required
      class="input-field"
    />
    <label>Когда удобрять:</label>
    <input
      v-model="formData.fertilizing"
      type="date"
      placeholder="Когда удобрять"
      required
      class="input-field"
    />
    <label>Когда пересаживать:</label>
    <input
      v-model="formData.repotting"
      type="date"
      placeholder="Когда пересаживать"
      required
      class="input-field"
    />
    <textarea
      v-model="formData.note"
      placeholder="Заметки о растении"
      class="input-field"
    ></textarea>
    <button type="submit" class="submit-button">{{ submitButtonText }}</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    formData: {
      type: Object as PropType<{
        name: string;
        watering: string;
        fertilizing: string;
        repotting: string;
        note: string;
      }>,
      required: true,
    },
    submitButtonText: {
      type: String,
      default: "Добавить растение",
    },
    onClose: {
      type: Function,
      required: false,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleSubmit() {
      if (this.formData && this.onSubmit) {
        this.onSubmit(this.formData);
      } else {
        console.error("formData или onSubmit не определены", {
          formData: this.formData,
          onSubmit: this.onSubmit,
        });
      }
    },

    validateInput(event: Event) {
      const input = event.target as HTMLInputElement;
      const newValue = input.value.replace(/[^A-Za-zА-Яа-яёЁ\s]/g, "");
      input.value = newValue;
      this.formData.name = newValue;
    },
    closeModal() {
      if (this.onClose) {
        this.onClose();
      }
    },
  },
});
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.submit-button {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;
}

.submit-button:hover {
  background-color: #218838;
  transform: scale(1.05); 
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

form {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
