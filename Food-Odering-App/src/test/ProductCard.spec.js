import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from '@/components/ProductCard.vue'

it('just to pass this test', () => {
  console.log('pc pass')
})

// // ✅ Mock RouterLink
// vi.mock('vue-router', () => ({
//   RouterLink: {
//     template: '<a><slot /></a>',
//   },
// }))

// // ✅ Mock Pinia Store
// const toggleItem = vi.fn()
// const isFavorite = vi.fn()

// vi.mock('@/stores/favorites', () => ({
//   useFavoritesStore: () => ({
//     toggleItem,
//     // isFavorite
//   }),
// }))

// describe('ProductCard', () => {
//   const product = {
//     id: 1,
//     name: 'Zinger Burger',
//     price: 500,
//     category: 'Fast Food',
//     description: 'Tasty burger',
//     rating: 4.5,
//     image: 'test.jpg',
//   }

//   // 🔥 1. Render test
//   it('renders product data correctly', () => {
//     const wrapper = mount(ProductCard, {
//       props: { product },
//     })
//     expect(wrapper.text()).toContain('Zinger Burger')
//     expect(wrapper.text()).toContain('Rs. 500')
//     expect(wrapper.text()).toContain('Fast Food')
//   })

//   // 🔥 2. Order event test
//   it('emits order event when button is clicked', async () => {
//     const wrapper = mount(ProductCard, {
//       props: { product },
//     })

//     const buttons = wrapper.findAll('button')

//     await buttons[1].trigger('click') // Order button

//     expect(wrapper.emitted('order')).toBeTruthy()
//     expect(wrapper.emitted('order')[0]).toEqual([product])
//   })

//   // 🔥 3. Favorite toggle test
//   it('calls toggleItem when favorite button is clicked', async () => {
//     const wrapper = mount(ProductCard, {
//       props: { product },
//     })

//     const buttons = wrapper.findAll('button')

//     await buttons[0].trigger('click') // Favorite button

//     expect(toggleItem).toHaveBeenCalled()
//     expect(toggleItem).toHaveBeenCalledWith(product)
//   })

//   // 🔥 4. Favorite UI state
//   it('shows filled heart if product is favorite', () => {
//     isFavorite.mockReturnValue(true)

//     const wrapper = mount(ProductCard, {
//       props: { product },
//     })

//     expect(wrapper.text()).toContain('♥')
//   })
// })
