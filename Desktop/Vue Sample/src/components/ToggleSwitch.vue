<template>
    <div class="toggle-container"  @click="toggle">
        <div :class="['switch',{active : isOn}]"></div>
        <p>{{ isOn? "Enabled" : "Disabled" }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isOn = ref(false)
function toggle(){
    isOn.value = !isOn.value
}
</script>

<style scoped>
.toggle-container{
    cursor: pointer;
}
.switch {
  width: 60px;
  height: 30px;
  background: #ccc;
  border-radius: 30px;
  position: relative;
  transition: background 0.3s;
  margin: 0 auto 10px;
}

.switch::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
}
.switch.active {
  background: #4caf50;
}
.switch.active::before {
  transform: translateX(30px);
}

</style>