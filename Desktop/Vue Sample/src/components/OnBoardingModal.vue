<template>
    <transition name="fade">
        <div v-if="visible" class="modal-backdrop">
          <div class="modal">
            <h2>Admin Onboarding</h2>
            <form @submit.prevent="submitForm">
              <input
                type="text"
                v-model="form.companyName"
                placeholder="Company Name"
                required
              />
              <select v-model="form.serviceType" required>
                <option disabled value="">Select Service Type</option>
                <option>Repair</option>
                <option>Sales</option>
                <option>Support</option>
              </select>
              <input type="email" v-model="form.email" placeholder="Email" required />
              <input
                type="number"
                v-model="form.phone"
                placeholder="Phone Number"
                required
              />
              <select v-model="form.country" required>
                <option disabled value="">Select Country</option>
                <option>UAE</option>
                <option>India</option>
                <option>UK</option>
              </select>
              <select v-model="form.currency" required>
                <option disabled value="">Select currency</option>
                <option>AED</option>
                <option>RPS</option>
              </select>
      
              <button type="submit">Start</button>
            </form>
          </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["submit"]);
const visible = ref(true)

const form = ref({
  companyName: "",
  serviceType: "",
  email: "",
  phone: "",
  country: "",
  currency: "",
});

function submitForm() {
  if (Object.values(form.value).some((value) => value === "")) {
    alert("All Fields required");
    return;
  }
  visible.value = false;
  setTimeout(() =>{
    emit("submit", form.value);
  },300)
 
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: rgb(151, 140, 140);
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.modal form{
    display: flex;
    flex-direction: column;
    padding: 3px;
    gap: 15px;
}
.modal form input,select{
    padding: 15px;
}
/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>
