import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductPagination from '@/components/ProductPagination.vue'

describe('ProductPagination', () => {
  it('renders page no correctly', () => {
    const wrapper = mount(ProductPagination, {
      props: {
        totalPages: 3,
        currentPage: 1,
      },
    })

    const buttons = wrapper.findAll('button')
    buttons.forEach((btn, i) => {
      expect(btn.text()).toBe(String(i + 1))
    })
  })

  it('renders the correct active class of 1 and other buttons', () => {
    const wrapper = mount(ProductPagination, {
      props: {
        totalPages: 3,
        currentPage: 1,
      },
    })

    const buttons = wrapper.findAll('button')

    buttons.forEach((btn, index) => {
      if (index === 0) {
        expect(btn.classes()).toContain('bg-orange-500')
      } else {
        expect(btn.classes()).not.toContain('bg-orange-500')
      }
    })
  })

  it('emits change-page event when clicked', async () => {
    const wrapper = mount(ProductPagination, {
      props: {
        totalPages: 3,
        currentPage: 1,
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click') 

    expect(wrapper.emitted('change-page')).toBeTruthy()
    expect(wrapper.emitted('change-page')[0]).toEqual([2])
  })
})
