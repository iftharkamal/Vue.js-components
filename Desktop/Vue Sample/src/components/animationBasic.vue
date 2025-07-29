<script setup>
import { ref } from 'vue';

const show = ref(true)
const toggle = () => (show.value = !show.value )
</script>

<template>
    <transition name="fade">
        <div v-if="show" class="welcome-box">
          <h1>Welcome Kamal</h1>
        </div>
    </transition>

    <button @click="toggle">Toggle Welcome</button>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active{
    transition: opacity 5s ease;
}
.fade-enter-from, .fade-leave-from{
    opacity: 0;
}
.fade-enter-to, .fade-leave-to{
    opacity: 1;
}
.welcome-box{
    background-color: blue;
    color: white;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
}
</style>