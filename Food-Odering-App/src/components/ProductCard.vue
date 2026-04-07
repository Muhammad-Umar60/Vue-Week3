<script setup>
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()

const props = defineProps({
  product: { type: Object, required: true },
})

const toggleFavorite = () => {
  favoritesStore.toggleItem(props.product)
}

// defineProps({
//   product: {
//     type: Object,
//     required: true,
//   },
// })
// console.log(product)

defineEmits(['order'])
</script>

<template>
  <div class="text-white border border-white m-2 p-2">
    <div>
      <RouterLink :to="`/food/${product.id}`">
        <img class="w-100 h-100 object-fill" :src="product.image" :alt="product.name" />
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
            <button @click="toggleFavorite">
              <span :class="favoritesStore.isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'">
                ❤️
              </span>
            </button>
            <!-- wishlistStore.addItem(product) -->

            <!-- ✅ meal → product -->
            <button class="bg-amber-500 cursor-pointer" @click="$emit('order', product)">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
