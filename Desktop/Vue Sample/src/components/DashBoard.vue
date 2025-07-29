<template>
  <div>
    <OnBoardingModal v-if="showModal" @submit="handleSubmit" />
    <WelcomePanel v-if="showWelcome" :data="formData" :visible="showWelcome"/>
     <AdminMainDashBoard v-else/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OnBoardingModal from "./OnBoardingModal.vue";
import WelcomePanel from "./WelcomePanel.vue";
import AdminMainDashBoard from "./AdminMainDashBoard.vue";

const showModal = ref(true);
const showWelcome = ref(false)
const showDashboard = ref(false)
const formData = ref({})



function handleSubmit(data){
    formData.value = data;
    showModal.value = false
    showWelcome.value=true
}

setTimeout(() => {
   showWelcome.value= false
   showDashboard.value=true
}, 1000);

</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
