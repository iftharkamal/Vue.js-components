<script setup>
import { computed, ref } from 'vue';

const jobs = ref([
    { id: 1, title: 'Fix Screen Issue', status: 'open' },
  { id: 2, title: 'Battery Replacement', status: 'in progress' },
  { id: 3, title: 'Speaker Malfunction', status: 'completed' },
  { id: 4, title: 'Camera not working', status: 'pending' },
  { id: 5, title: 'Touch not responsive', status: 'review changes' },
  { id: 6, title: 'Software Update', status: 'open' },
  { id: 7, title: 'Charging Port Repair', status: 'completed' },

])

const searchQuery = ref('')
const selectedFilter = ref('')

const filteredJobs = computed(() =>{
    return jobs.value.filter((job) =>{
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesFilter = selectedFilter.value? job.status.toLowerCase() === selectedFilter.value.toLowerCase() : true

        return matchesSearch && matchesFilter
    })
})
</script>


<template>
    <div>
        <h1>Jobs</h1>

        <div class="filter-controls">
          <input type="text" placeholder="Search by Job title" v-model="searchQuery">
          <select v-model="selectedFilter">
           <option value="">All</option>
           <option value="open">Open</option>
           <option value="on progress">On Progress</option>
           <option value="pending">Pending</option>
           <option value="completed">Completed</option>
           <option value="review changes">Review changes</option>
          </select>
        </div>

        <div v-if="filteredJobs.length">
            <ul class="job-list" >
                <li  v-for="job in filteredJobs" :key="job.id">
                    <h3>{{ job.title }}</h3>
                    <p>Status : {{ job.status }}</p>
                </li>
            </ul>
        </div>

     <p v-else>No jobs match your criteria</p>

        
    </div>
</template>



<style scoped>
.job-list-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
input,
select {
  padding: 8px;
  width: 50%;
}
.job-list {
  list-style: none;
  padding: 0;
}
.job-list li {
  background: #727070;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>
