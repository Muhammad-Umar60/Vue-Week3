<script setup>
import ProductCard from './ProductCard.vue'
import { useFetch } from '@/composables/useFetch'
import BaseModal from './BaseModal.vue'
import { computed, ref, watch } from 'vue'
import ProductPaginatoin from './ProductPagination.vue'

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

const totalItems = computed(() => filteredData.value.length)

const itemsPerPage = 6
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage)
})

const currentPage = ref(1)

const props = defineProps({
  searchedFood: String,
})

const filteredData = computed(() => {
  if (!data.value) return []

  if (props.searchedFood.length === 0) {
    return data.value
  }

  return data.value.filter((item) =>
    item.name.toLowerCase().includes(props.searchedFood.toLowerCase()),
  )
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredData.value.slice(start, start + itemsPerPage)
})

watch(
  () => props.searchedFood,
  () => {
    currentPage.value = 1
  },
)
</script>

<template>
  <div class="p-4">
    <p class="text-white" v-if="loading">Loading...</p>
    <p v-if="error">Something went wrong!</p>
    <ul class="grid md:grid-cols-2 lg:grid-cols-3">
      <li v-for="item in paginatedData" :key="item.id">
        <ProductCard @order="openModal" :product="item" />
      </li>
    </ul>
  </div>

  <BaseModal :isOpen="showModal" @close="showModal = false">
    <template #header>
      <h2 class="text-xl font-bold mb-2">{{ selectedMeal?.name }}</h2>
    </template>

    <div v-if="selectedMeal">
      <img loading="lazy" :src="selectedMeal.image" class="w-full h-40 object-cover rounded mb-2" />
      <p>{{ selectedMeal.description }}</p>
      <p class="mt-2 font-semibold">Rs. {{ selectedMeal.price }}</p>
    </div>

    <template #footer>
      <button @click="confirmOrder">✅ Confirm Order</button>
      <button @click="showModal = false">Cancel</button>
    </template>
  </BaseModal>

  <ProductPaginatoin
    :totalPages="totalPages"
    :currentPage="currentPage"
    @change-page="currentPage = $event"
  />
</template>
