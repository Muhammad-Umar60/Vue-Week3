<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { useFavoritesStore } from '@/stores/favorites';

import { computed } from 'vue';

const favoritesStore = useFavoritesStore()

const isEmpty = computed(() => favoritesStore.items.length === 0)

</script>
<template>
  <div class="text-white">
    <p class="text-orange-500">YOUR SAVED DISHES</p>
    <h1 class="text-4xl font-bold">Favorites</h1>
  </div>
  <div class="flex flex-col justify-center items-center min-h-[60vh] " v-if="isEmpty">
    <p class="text-white font-bold">No dishes selected yet</p>
    <p class="text-white font-bold">Browse the menu and save dishes you love</p>
    <button class="text-white rounded-2xl p-2 cursor-pointer bg-orange-500"><RouterLink to="/">Explore Menu</RouterLink></button>
  </div>
  <ul  v-else class="grid grid-cols-3">
    <li  class="w-78" v-for="item in favoritesStore.items" :key="item.id">
        <ProductCard  :product="item" />
    </li>
  </ul>
</template>
