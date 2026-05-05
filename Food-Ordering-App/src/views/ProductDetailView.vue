<script setup>
import { useFetch } from '@/composables/useFetch'
import { RouterLink } from 'vue-router'

import { useRoute } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()
const route = useRoute()

const productId = route.params.id

const { data, loading, error } = useFetch(`http://localhost:3000/products/${productId}`)
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-4">
    <RouterLink to="/" class="text-gray-300 hover:text-white transition duration-200">
      ← Back to Menu
    </RouterLink>
  </div>

  <p class="text-center text-gray-400 mt-10" v-if="loading">Loading product...</p>

  <p class="text-center text-red-500 mt-10" v-else-if="error">
    {{ error }}
  </p>

  <div v-if="data" class="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 text-white">
    <div class="overflow-hidden rounded-2xl shadow-lg">
      <img
        loading="lazy"
        class="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition duration-300"
        :src="data.image"
        alt="product"
      />
    </div>

    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-4 text-sm text-gray-400">
        <span class="bg-gray-800 px-3 py-1 rounded-full">
          {{ data.category }}
        </span>
        <span>⭐ {{ data.rating }}</span>
      </div>

      <h1 class="text-3xl font-semibold">
        {{ data.name }}
      </h1>

      <p class="text-gray-400 leading-relaxed">
        {{ data.description }}
      </p>

      <p class="text-2xl font-bold text-orange-400">Rs. {{ data.price }}</p>

      <div class="flex gap-4 mt-4">
        <button
          @click="favoritesStore.toggleItem(data)"
          class="px-5 py-2 rounded-xl cursor-pointer transition duration-200 font-medium"
          :class="
            favoritesStore.isFavorite(data.id)
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-700 hover:bg-gray-600'
          "
        >
          {{ favoritesStore.isFavorite(data.id) ? '♥ Saved' : '♡ Save' }}
        </button>
        <button
          class="px-5 py-2 cursor-pointer bg-orange-500 hover:bg-orange-600 rounded-xl transition duration-200 font-medium"
        >
          Order Now
        </button>
      </div>
    </div>
  </div>
</template>
