<script setup>
import { RouterLink } from 'vue-router'

import { useFavoritesStore } from '@/stores/favorites'
import { computed } from 'vue'

const favoritesStore = useFavoritesStore()

const favCount = computed(() => favoritesStore.items.length)
</script>

<template>
  <nav class="p-4 flex bg-black items-center justify-between px-5">
    <h1 class="text-4xl text-white font-bold">
      <RouterLink to="/"> CAFE GRILL </RouterLink>
    </h1>
    <div>
      <ul class="flex gap-4 text-gray-400 font-semibold items-center">
        <li>
          <RouterLink
            to="/"
            class="cursor-pointer rounded-4xl p-2 hover:text-orange-500"
            active-class="bg-orange-500/30 text-orange-500"
            exact-active-class="bg-orange-500/30 text-orange-500"
          >
            Menu
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/favorites"
            class="cursor-pointer rounded-4xl p-2 hover:text-orange-500 flex items-center gap-1"
            active-class="bg-orange-500/30 text-orange-500"
          >
            Favorites
            <span data-testid="fav-count" v-if="favCount > 0">{{ favCount }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
