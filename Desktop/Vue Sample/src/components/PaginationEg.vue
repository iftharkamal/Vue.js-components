<template>
    <div class="container">
       <h2>Pagination Example</h2>
       <ul>
        <li v-for="item in paginatedItems" :key="item">{{ item }}</li>
       </ul>

       <div class="pagination">
          <button @click="prevPage">Prev</button>
          <button v-for="page in totalPages"  :key="page" @click="currentPage = page" :class="{active : currentPage === page}">{{ page }}</button>
          <button @click="nextPage">Next</button>
       </div>
    </div>
</template>

<script setup>
import { ref,computed } from 'vue';


const items = ref([
    'Ali','Shahabaz','Ansaf','Savad','Sabeeh',
    'Amal','Rashid','Salman','Ameer','Nameer',
    'Sabah','Shibili','Sahad','Haris','Visual'
])

const currentPage = ref(1)
const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage))
const paginatedItems = computed(() => {
    const start = (currentPage.value -1) * itemsPerPage
    const end = start + itemsPerPage
    return items.value.slice(start,end)
})
 
function nextPage(){
    if(currentPage.value < totalPages.value){
        currentPage.value ++
    }
}
function prevPage(){
    if(currentPage.value > 1){
        currentPage.value --
    }
}
    
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 40px auto;
  font-family: Arial;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px 12px;
  border: 1px solid #ccc;
  margin-bottom: 4px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
}

button {
  padding: 6px 12px;
  border: 1px solid #999;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: white;
}

button:disabled {
  background-color: #eee;
  cursor: not-allowed;
}

</style>