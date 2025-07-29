<template>
    <div>
        <h2>Count : {{ count }} </h2>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const count = ref(0)

function increment(){
    count.value++;
}
function decrement(){
    if(count.value > 0){
        count.value--
    }
}
</script>