import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
}

export const useFavoritesStore = defineStore('favorites', () => {

  const items = ref<Product[]>([])

  const addItem = (product: Product): void => {
    const exists = items.value.find(item => item.id === product.id)
    if (!exists) {
      items.value.push(product)
    }
  }

  const removeItem = (productId: number): void => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  const toggleItem = (product: Product): void => {
    const exists = items.value.find(item => item.id === product.id)
    if (exists) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  watch(items, (newItems: Product[]) => {
      localStorage.setItem('favorites', JSON.stringify(newItems))
    },
    { deep: true }
  )

  const totalCount = computed<number>(() => items.value.length)

  const isFavorite = (productId: number): boolean => {
    return items.value.some(item => item.id === productId)
  }

  const loadFavorites = (): void => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      try {
        items.value = JSON.parse(saved) as Product[]
      } catch {
        items.value = []
      }
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