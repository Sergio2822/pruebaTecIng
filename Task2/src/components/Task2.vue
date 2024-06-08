<template>
  <div class="task-details">
    <div>
      <span> Color: </span>
      <select v-model="selectedColor">
        <option v-for="color in colorOptions" :value="color.value">
          {{ color.label }}
        </option>
      </select>
    </div>
    <div>
      <span> Type: </span>
      <select v-model="selectedType">
        <option v-for="typeOption in typeOptions" :value="typeOption.value">
          {{ typeOption.label }}
        </option>
      </select>
    </div>
    <div>
      <button @click="$emit('custom-event', selectedColor, selectedType)">
        Buscar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const emits = defineEmits(["custom-event"]);

const colorOptions = ref([
  {
    label: "White",
    value: "W",
  },
  {
    label: "Blue",
    value: "U",
  },
  {
    label: "Black",
    value: "B",
  },

  {
    label: "Red",
    value: "R",
  },

  {
    label: "Green",
    value: "G",
  },
]);

const typeOptions = ref([
  {
    label: "Creature",
    value: "creature",
  },
  {
    label: "Enchantment",
    value: "enchantment",
  },
  {
    label: "Sorcery",
    value: "sorcery",
  },
  {
    label: "Instant",
    value: "instant",
  },
]);

const selectedColor = ref(null);
const selectedType = ref(null);

onMounted(() => {
  selectedColor.value = colorOptions.value[0].value;

  selectedType.value = typeOptions.value[0].value;
});
</script>

<style>
.task-details {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
</style>
