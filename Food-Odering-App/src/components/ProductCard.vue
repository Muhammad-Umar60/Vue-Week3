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
  <div class="text-white border border-white m-2 p-2">
    <div>
      <RouterLink :to="`/food/${product.id}`">
        <div class="relative w-full h-48 bg-gray-700">
          <div v-if="!imageLoaded" class="absolute inset-0 rounded-t-xl overflow-hidden">
            <!--  shimmer  -->
            <div  class="w-full h-full animate-shimmer bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-[length:400px_100%]"/>
          </div>
          <img
            class="w-full h-48 object-cover transition-opacity duration-300"
            :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
            width="400"
            height="192"
            loading="lazy"
            :src="product.image"
            :alt="product.name"
            @load="imageLoaded = true"
          />
        </div>
      </RouterLink>
    </div>
    <div>
      <div>{{ product.category }}</div>
      <div>
        <RouterLink :to="`/food/${product.id}`">
          <h1 class="cursor-pointer">{{ product.name }}</h1>
        </RouterLink>
        <p>{{ product.description }}</p>
        <div>
          <p>{{ product.rating }} ⭐</p>
          <p>Rs. {{ product.price }}</p>
          <div class="flex gap-2">
            <button title="Add to favorites" @click="toggleFavorite">
              <span :class="isFav ? 'text-red-500' : 'text-gray-400'">
                {{ isFav ? '♥' : '♡' }}
              </span>
            </button>
            <button class="bg-amber-500 cursor-pointer" @click="emit('order', product)">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
