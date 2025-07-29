<script setup>
import { ref } from 'vue';


const show= ref(true)
const toggle = () => (show.value = !show.value)
const jobs = [
    {id:1,title:"Developer"},
    {id:2,title:"Devops"},
    {id:3,title:"Data Analyst"},
] 
</script>

<template>
    <div>
        <button @click="toggle">Shown Lists</button>
        <div>
            <transition-group name="list" tag="div">
                <li v-if="show" v-for="(job,index) in jobs" :key="job.id">
                   {{ job.title }}
                </li>
            
            </transition-group>
        </div>
    </div>
</template>


<style scoped>
.list-enter-active, .list-leave-active{
    transition: all 1s ease;
}
.list-enter-from, .list-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
.list-enter-to, .list-leave-from {
    opacity: 1;
    transform: translateY(0);
    
}
</style>