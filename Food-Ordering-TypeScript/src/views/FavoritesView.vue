<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { useFavoritesStore } from "@/stores/favorites";

import { computed } from "vue";

const favoritesStore = useFavoritesStore();

const isEmpty = computed(() => favoritesStore.items.length === 0);
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6 text-white">
    <p class="text-orange-500 text-sm tracking-wide uppercase">
      Your Saved Dishes
    </p>
    <h1 class="text-3xl md:text-4xl font-bold mt-1">Favorites</h1>
  </div>

  <div
    v-if="isEmpty"
    class="flex flex-col justify-center items-center text-center min-h-[60vh] px-4"
  >
    <p class="text-white text-lg font-semibold">No dishes selected yet 🍽</p>

    <p class="text-gray-400 mt-2">Browse the menu and save dishes you love</p>

    <RouterLink
      to="/"
      class="mt-5 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition"
    >
      Explore Menu
    </RouterLink>
  </div>

  <div v-else class="max-w-6xl mx-auto px-4 pb-8">
    <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <li
        v-for="item in favoritesStore.items"
        :key="item.id"
        class="transition-transform hover:scale-[1.02]"
      >
        <ProductCard :product="item" />
      </li>
    </ul>
  </div>
</template>
