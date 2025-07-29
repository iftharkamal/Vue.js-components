<script setup>
import { ref,computed } from 'vue';



const quantity = ref(1);
const price = ref(100)

const total = computed(() => quantity.value * price.value)
</script>

<template>
    <div>
        <input type="number" placeholder="quantity" v-model="quantity">
        <input type="number" placeholder="price" v-model="price">

        <p>Total : {{ total }}</p>

    </div>
</template>