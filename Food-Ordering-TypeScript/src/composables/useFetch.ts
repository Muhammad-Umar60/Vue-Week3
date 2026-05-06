import { onMounted, ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    try {
      loading.value = true
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`)
      }
      data.value = await res.json()
    } catch (err) {
      error.value = err.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }
  onMounted(fetchData)

  return {
    data,
    loading,
    error,
  }
}