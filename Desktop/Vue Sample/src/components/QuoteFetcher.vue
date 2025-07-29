<template>
  <div class="quote-container">
    <h2>🎯 Random Quote Generator</h2>

    <transition name="fade" mode="out-in">
      <div v-if="quote.length" :key="currentIndex">
        <p>"{{ quote[currentIndex].quote }}"</p>
        <small>-{{ quote[currentIndex].author }}</small>
      </div>
    </transition>
     
    <button @click="prevQuote" :disabled="currentIndex === 0">Prev</button>
    <button @click="nextQuote" :disabled="currentIndex === quote.length-1">Next</button>
    <button @click="saveFavorite">Save</button>
    <button @click="getQuote">Get Another Quote</button>
</div>

<div v-if="favorites.length">
  <h3>Favourite Quotes</h3>
  <ul>
    <li v-for="(fav,index) in favorites" :key="index">"{{ fav.quote }}" - <strong>{{ fav.author }}</strong></li>
  </ul>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const quote = ref([]);
const favorites = ref([]);
const currentIndex = ref(0);
const loading = ref(false);
const error = ref(null);

async function getQuote() {
  loading.value = true;
  error.value = null;

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error("Failed to fetch quote");
    const data = await res.json();
    quote.value.push(data);
    currentIndex.value = quote.value.length - 1;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function nextQuote() {
  if (currentIndex.value < quote.value.length - 1) currentIndex.value++;
}

function prevQuote() {
  if (currentIndex.value > 0) currentIndex.value--;
}
function saveFavorite(){
    const currentQuote = quote.value[currentIndex.value]
    const alreadySaved = favorites.value.some((q) => q.quote === currentQuote.quote && q.author === currentQuote.author);
    if(!alreadySaved){
        favorites.value.push(currentQuote)
    }else{
        alert("Already Saved")
    }
}
onMounted(getQuote)
</script>

<style scoped>
.quote-container {
  max-width: 500px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.quote-box {
  margin: 20px 0;
  min-height: 80px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 12px;
  border: none;
  background: #4caf50;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.favorites {
  margin-top: 30px;
  text-align: left;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
