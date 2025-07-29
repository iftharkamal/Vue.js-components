<script setup>
import { ref } from "vue";

const items = ref([
  {
    title: "What is Vue.js?",
    content: "Vue is a progressive JavaScript framework.",
  },
  {
    title: "Why use Vue?",
    content: "Because it is simple, fast, and flexible.",
  },
  {
    title: "What is Composition API?",
    content: "A new way to write logic in Vue 3.",
  },
]);

const openIndex = ref(null);
function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <div class="accordion">
    <div class="accordion-item" v-for="(item, index) in items" :key="index">
      <div class="accordion-header" @click="toggle(index)">
        {{ item.title }} <span>{{ openIndex === index ? "▲" : "▼" }}</span>
      </div>
      <transition name="accordion">
        <div class="accordion-content" v-if="openIndex === index">
          {{ item.content }}
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  max-width: 600px;
  margin: auto;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #ddd;
}
.accordion-item {
  border-bottom: 1px solid #ddd;
}
.accordion-header {
  padding: 15px;
  font-weight: bold;
  background: #504949;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.accordion-content {
  padding: 15px;
  background: #7a7272;
}

/* Animation */
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.3s ease;
}
.accordion-enter-from, .accordion-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

