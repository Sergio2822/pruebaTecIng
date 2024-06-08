<template>
  <TaskItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Task 1</template>
    Por favor, introduzca una cadena de texto
    <br />
    <Task1 />
  </TaskItem>

  <TaskItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Task 2</template>

    Por favor, filtre usando los dropdowns y pulse el boton "buscar" para
    iniciar su busqueda
    <br />
    <Task2 @custom-event="handleSearch" />
    <div v-if="loading">Loading ...</div>
    <CardItem v-else-if="!loading && cardItems.length" :cards="cardItems" />
  </TaskItem>
</template>

<script setup>
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import TaskItem from "./TaskItem.vue";
import Task1 from "./Task1.vue";
import Task2 from "./Task2.vue";
import CardItem from "./CardItem.vue";

import { ref } from "vue";

const cardItems = ref([]);
const loading = ref(false);

const handleSearch = (selectedColor, selectedType) => {
  searchCards(selectedColor, selectedType);
};

function getFilters(selectedColor, selectedType) {
  const typeFilter = `q=type:${selectedType}`;
  const colors = ["W", "U", "B", "R", "G"];

  function getColorFilter(color) {
    return colors
      .filter((c) => c !== color)
      .map((c) => `-color:${c}`)
      .join("+");
  }

  const excludedColors = getColorFilter(selectedColor);

  return `${typeFilter}+and+color:${selectedColor}+${excludedColors}`;
}

function searchCards(color, type) {
  loading.value = true;
  const filters = getFilters(color, type);
  const apiUrl = `https://api.scryfall.com/cards/search?${filters}&order=released&dir=desc`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.data && data.data.length > 0) {
        const limitedResults = data.data.slice(0, 3);

        cardItems.value = limitedResults.map((result) => {
          return {
            name: result.name,
            colors: result.colors,
            type: result.type_line,
            imageUrl:
              result.image_uris && result.image_uris.small
                ? result.image_uris.small
                : null,
          };
        });
      } else {
        console.log("No results found.");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
