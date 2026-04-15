<script setup lang="ts">
import ProductList from '@/components/ProductList.vue'
import { ref} from 'vue'

const searchedFood = ref("")

</script>

<template>
  <header class=" p-6">
    <div class="flex justify-between gap-5">
      <div class=" flex flex-col font-bold gap-4 justify-center">
        <h1 class="text-4xl">
          <p class="text-orange-600">Fresh & Hot, Delivered Fast</p>
          <span class="text-white"> Whar are you </span>
          <br />
           <p class="text-orange-600">craving</p>
          <span class="text-white"> today? </span>
        </h1>
        <input
          v-model="searchedFood"
          class="text-white p-2 w-80 rounded-2xl border mt-12 border-gray-500"
          type="text"
          placeholder="Search burgers, sushi, pasta..."
        />
      </div>
      <img loading="lazy" class="w-100 h-100" src="../assets/logo.png" alt="" />
    </div>
  </header>
  <main class="p-5">
    <div class="text-white flex justify-evenly">
      <button class="bg-orange-500 px-6 py-2 rounded-4xl">All</button>
      <button>Pizza</button>
      <button>Roll</button>
      <button>Sandwitch</button>
      <button>Tikka</button>
    </div>
    <div>
      <ProductList :searchedFood=" searchedFood" />
    </div>
    
  </main>
</template>
