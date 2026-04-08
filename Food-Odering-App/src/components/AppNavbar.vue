<script setup>
import { RouterLink } from 'vue-router'

import { useFavoritesStore } from '@/stores/favorites';
import { computed } from 'vue';

const favoritesStore = useFavoritesStore()

const favCount = computed(()=>favoritesStore.items.length)


</script>

<template>
  <nav class="p-4 flex bg-black items-center justify-between px-5">
    <h1 class="text-4xl text-white">Cafe Grill</h1>
    <div>
      <ul class="flex gap-4 text-gray-400 font-semibold">
        <li class="cursor-pointer bg-orange-500/30 rounded-4xl p-2 hover:text-orange-500">
          <RouterLink to="/"> Menu </RouterLink>
        </li>
        <li class="cursor-pointer hover:text-orange-500">
          <RouterLink to="/favorites"> Favorites </RouterLink>
          <span v-if="favCount>0">{{ favCount}}</span>
        </li>
      </ul>
    </div>
  </nav>
</template>
