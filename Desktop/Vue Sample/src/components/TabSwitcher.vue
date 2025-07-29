<template>
  <div class="tabs-container">
    <div class="tab-buttons">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="{active : activeTab === tab}">
        {{ tab }}
      </button>
    </div>

    <div class="tab-content">
      <p v-if="activeTab === 'Home'">🏠 Welcome to the Home tab</p>
      <p v-if="activeTab === 'Profile'">👤 This is your Profile info</p>
      <p v-if="activeTab === 'Settings'">⚙️ Here are your Settings</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tabs = ["Home", "Profile", "Settings"];
const activeTab = ref("Home");
</script>

<style scoped>
.tab-buttons{
    display: flex;
    gap: 15px;
}
.tab-buttons button.active {
  background-color: #54a140;
  color: white;
}

.tab-content {
  background: #444444;
  padding: 15px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>
