<script setup>
import ProductCard from './ProductCard.vue'
import { useFetch } from '@/composables/useFetch'
import BaseModal from './BaseModal.vue'
import { computed, ref, watch } from 'vue'
import ProductPaginatoin from './ProductPagination.vue'
import { Button } from 'my-ui-components-umar'

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
  <div class="max-w-6xl mx-auto px-4 py-6">
    <p v-if="loading" class="text-center text-gray-400 text-lg">
      Loading meals...
    </p>
    <p v-if="error" class="text-center text-red-500 text-lg">
      Something went wrong!
    </p>

    <!-- 🛍 Products Grid -->
    <ul
      v-if="!loading && !error"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <li
        v-for="item in paginatedData"
        :key="item.id"
        class="transition-transform hover:scale-[1.02]"
      >
        <ProductCard
          @order="openModal"
          :product="item"
        />
      </li>
    </ul>

    <!-- 📭 Empty State -->
    <p
      v-if="!loading && !error && paginatedData.length === 0"
      class="text-center text-gray-500 mt-10"
    >
      No products available
    </p>
  </div>

  <BaseModal :isOpen="showModal" @close="showModal = false">
    <template #header>
      <h2 class="text-2xl font-semibold text-white">
        {{ selectedMeal?.name }}
      </h2>
    </template>

    <div v-if="selectedMeal" class="flex flex-col gap-4">
      <img
        loading="lazy"
        :src="selectedMeal.image"
        class="w-full h-52 object-cover rounded-xl shadow"
      />

      <p class="text-gray-400 leading-relaxed">
        {{ selectedMeal.description }}
      </p>

      <p class="text-xl font-bold text-orange-500">
        Rs. {{ selectedMeal.price }}
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3 mt-4">
        <Button size="sm" @click="confirmOrder">
          Confirm
        </Button>

        <button
          @click="showModal = false"
          class="px-4 cursor-pointer py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </template>
  </BaseModal>

  <!-- 📄 Pagination -->
  <div class="max-w-6xl mx-auto px-4 pb-6">
    <ProductPaginatoin
      :totalPages="totalPages"
      :currentPage="currentPage"
      @change-page="currentPage = $event"
    />
  </div>
</template>