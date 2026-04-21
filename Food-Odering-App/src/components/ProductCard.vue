<script setup>
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import { ref, computed } from 'vue'

const favoritesStore = useFavoritesStore()
const imageLoaded = ref(false)

const props = defineProps({
  product: { type: Object, required: true },
})

const toggleFavorite = () => {
  favoritesStore.toggleItem(props.product)
}
const isFav = computed(() => favoritesStore.isFavorite(props.product.id))

const emit = defineEmits(['order'])
</script>

<template>
  <div
    class="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
  >
    <RouterLink :to="`/food/${product.id}`">
      <div class="relative w-full h-48 bg-gray-800">
        <div v-if="!imageLoaded" class="absolute inset-0 overflow-hidden">
          <div
            class="w-full h-full animate-shimmer bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-[length:400px_100%]"
          />
        </div>

        <img
          class="w-full h-48 object-cover transition duration-300"
          :class="imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
          loading="lazy"
          :src="product.image"
          :alt="product.name"
          @load="imageLoaded = true"
        />
      </div>
    </RouterLink>

    <div class="p-4 flex flex-col gap-3 flex-1">
      <span class="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full w-fit">
        {{ product.category }}
      </span>

      <RouterLink :to="`/food/${product.id}`">
        <h2 class="text-lg font-semibold hover:text-orange-400 transition">
          {{ product.name }}
        </h2>
      </RouterLink>
      <p class="text-sm text-gray-400 line-clamp-2">
        {{ product.description }}
      </p>
      <div class="flex justify-between items-center mt-auto">
        <span class="text-sm text-yellow-400"> ⭐ {{ product.rating }} </span>
        <span class="font-semibold text-orange-400"> Rs. {{ product.price }} </span>
      </div>
      <div class="flex justify-between items-center mt-2">
        <button
          title="Add to favorites"
          @click="toggleFavorite"
          class="text-xl transition cursor-pointer"
          data-testid="toggleFavBtn"
        >
          <span :class="isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400'">
            {{ isFav ? '♥' : '♡' }}
          </span>
        </button>
        <button
          class="px-4 py-1.5 bg-orange-500 cursor-pointer hover:bg-orange-600 rounded-lg text-sm font-medium transition"
          @click="emit('order', product)"
        >
          Order Now
        </button>
      </div>
    </div>
  </div>
</template>
