import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {



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
watch(items, () => {
  localStorage.setItem('favorites', JSON.stringify(items.value))
}, { deep: true })

  // GETTERS
  const totalCount = computed(() => items.value.length)

  const isFavorite = (productId) => {
    //  return Array.isArray(items.value) &&
         return items.value.some(item => item.id === productId)
  }
const saveToLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(items.value))
}

const loadFavorites = () => {
  const saved = localStorage.getItem('favorites')
  if (saved) {
    items.value = JSON.parse(saved)
  } else {
    items.value = []
  }
}
  return { 
    items, 
    addItem, 
    removeItem,
    toggleItem,
    totalCount,
    isFavorite,
    loadFavorites
  }
})