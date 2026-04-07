import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {

  // STATE
  const items = ref([])

  // ACTIONS
  const addItem = (product) => {
    // prevent duplicates
    const exists = items.value.find(item => item.id === product.id)
    if (!exists) {
      items.value.push(product)
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  const toggleItem = (product) => {
    const exists = items.value.find(item => item.id === product.id)
    if (exists) {
      removeItem(product.id)  
    } else {
      addItem(product)
    }
  }

  // GETTERS
  const totalCount = computed(() => items.value.length)

  const isFavorite = (productId) => {
    return items.value.some(item => item.id === productId)
  }

  return { 
    items, 
    addItem, 
    removeItem,
    toggleItem,
    totalCount,
    isFavorite
  }
})