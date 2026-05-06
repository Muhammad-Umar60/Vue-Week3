// import { onMounted, ref } from 'vue'

// export function useFetch(url) {
//   const data = ref(null)
//   const loading = ref(false)
//   const error = ref(null)

//   const fetchData = async () => {
//     try {
//       loading.value = true
//       const res = await fetch(url)
//       if (!res.ok) {
//         throw new Error(`Error: ${res.status}`)
//       }
//       data.value = await res.json()
//     } catch (err) {
//       error.value = err.message || 'Something went wrong'
//     } finally {
//       loading.value = false
//     }
//   }
//   onMounted(fetchData)

//   return {
//     data,
//     loading,
//     error,
//   }
// }

import { onMounted, ref } from "vue";

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      loading.value = true;

      const res: Response = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      data.value = await res.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Something went wrong";
      }
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchData);

  return {
    data,
    loading,
    error,
  };
}
