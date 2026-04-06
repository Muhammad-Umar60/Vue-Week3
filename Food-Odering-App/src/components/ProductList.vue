<script setup>
import ProductCard from './ProductCard.vue'
import { useFetch } from '@/composables/useFetch'
import BaseModal from './BaseModal.vue'
import { ref } from 'vue'

const { data, loading, error } = useFetch('http://localhost:3000/products')

const showModal = ref(false)
const selectedMeal = ref(null)

const openModal = (meal) => {
  selectedMeal.value = meal
  showModal.value = true
}

const confirmOrder = () => {
  showModal.value = false
}
</script>

<template>
  <div class="p-4">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Something went wrong!</p>
    <ul class="grid md:grid-cols-2 lg:grid-cols-3">
      <li v-for="item in data" :key="item.id">
        <ProductCard @order="openModal" :product="item" />
      </li>
    </ul>
  </div>

  <BaseModal :isOpen="showModal" @close="showModal = false">
    <template #header>
      <h2 class="text-xl font-bold mb-2">{{ selectedMeal?.name }}</h2>
    </template>

    <div v-if="selectedMeal">
      <img :src="selectedMeal.image" class="w-full h-40 object-cover rounded mb-2" />
      <p>{{ selectedMeal.description }}</p>
      <p class="mt-2 font-semibold">Rs. {{ selectedMeal.price }}</p>
    </div>

    <template #footer>
      <button @click="confirmOrder">✅ Confirm Order</button>
      <button @click="showModal = false">Cancel</button>
    </template>
  </BaseModal>
</template>
