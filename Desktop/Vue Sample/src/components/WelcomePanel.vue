<template>
    <div>
       <transition name="slide-fade">
        <div v-if="visible" >
        <h1>Welcome,{{ data.companyName }}</h1>
        <h2>{{ data.email }}</h2>
        <h3>{{ data.phone }}</h3>
        <h4>{{ data.country }}</h4>
        <p>Service for:{{ data.serviceType }}</p>
    </div>
       </transition>
    </div>
</template>

<script setup>
   defineProps({
    data:Object,
    visible:Boolean
   })
</script>

<style scoped>

/* Slide-Fade Animation */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

</style>