<template>
  <div>
    <div class="admin-dashboard">
      <h2>🛠️ Admin Dashboard</h2>
      <p>This is where you manage your company services.</p>
      <!-- Add your main dashboard UI here -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.admin-dashboard {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.8s ease-in-out;
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
