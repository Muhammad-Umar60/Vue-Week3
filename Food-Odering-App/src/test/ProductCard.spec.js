import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductCard from '@/components/ProductCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFavoritesStore } from '@/stores/favorites'
import { nextTick } from 'vue'

vi.mock('vue-router', () => ({
  RouterLink: {
    template: '<a><slot /></a>',
  },
}))

const product = {
  id: 1,
  name: 'Zinger Burger',
  price: 500,
  category: 'Fast Food',
  description: 'Tasty burger',
  rating: 4.5,
  image: 'test.jpg',
}

describe('ProductCard', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(ProductCard, {
      props: { product },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    store = useFavoritesStore()
    vi.clearAllMocks()
  })

  it('renders product data correctly', () => {
    expect(wrapper.text()).toContain('Zinger Burger')
    expect(wrapper.text()).toContain('Rs. 500')
    expect(wrapper.text()).toContain('Fast Food')
  })

  it('emits order event when Order Now is clicked', async () => {
    const buttons = wrapper.findAll('button')

    await buttons[1].trigger('click')

    expect(wrapper.emitted('order')).toBeTruthy()
    expect(wrapper.emitted('order')[0]).toEqual([product])
  })
  
  it('calls toggleItem when favorite button is clicked', async () => {
    const button = wrapper.find('[data-testid="toggleFavBtn"]')

    await button.trigger('click')

    expect(store.toggleItem).toHaveBeenCalled()
    expect(store.toggleItem).toHaveBeenCalledWith(product)
  })

  it('shows correct heart state based on favorite', async () => {
    const buttons = wrapper.findAll('button')

    store.isFavorite = vi.fn(() => false)

    await nextTick()
    expect(wrapper.text()).toContain('♡')

    await buttons[0].trigger('click')
    expect(store.toggleItem).toHaveBeenCalled()
    store.isFavorite = vi.fn(() => true)

    await nextTick()
    expect(wrapper.text()).toContain('♥')
  })
})
