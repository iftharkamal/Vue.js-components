<template>
  <div>
    <h1>Grocery Lists</h1>
    <!-- form for add items -->
    <form @submit.prevent="addItem">
      <input type="text" placeholder="Add new items..." v-model="newItem" />
      <button type="submit">Add item</button>
    </form>

    <!-- Display items -->
    <ul v-for="(item, index) in groceryItems" :key="index">
      <li>
        {{ item }}
        <button @click="deleteItem(index)">Delete</button>
      </li>
    </ul>

    <!-- Total items -->
    <p><strong>Total items:</strong>{{ totalItems }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const groceryItems = ref([]);
const newItem = ref("");

function addItem() {
  const text = newItem.value.trim();
  if (text) {
    groceryItems.value.push(text);
    newItem.value = "";
  }
}

function deleteItem(index) {
  groceryItems.value.splice(index, 1);
}
// computed value for total items
const totalItems = computed(() => groceryItems.value.length);
</script>

<style scoped></style>
