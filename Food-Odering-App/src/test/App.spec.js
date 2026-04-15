import { mount } from "@vue/test-utils"
import { describe, expect, it, vi } from "vitest"
import { ref } from "vue"
import ProductList from "@/components/ProductList.vue"

// ✅ Proper mock
vi.mock('@/composables/useFetch', () => {
  return {
    useFetch: () => ({
      data: ref([
        {
          id: 1,
          name: "Zinger Burger",
        },
        {
          id: 2,
          name: "Pizza",
        }
      ]),
      loading: ref(false),
      error: ref(null)
    })
  }
})

describe('ProductList', () => {
  it('renders products correctly', async () => {
    const wrapper = mount(ProductList,{
      props: {
        searchedFood:""
      }
    })

    await wrapper.vm.$nextTick()

    console.log(wrapper.text())

    expect(wrapper.text()).toContain('Zinger Burger')
  })
})