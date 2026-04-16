import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductPagination from '@/components/ProductPagination.vue'

describe('ProductPagination', () => {
  it('renders page numbers correctly', () => {
    const wrapper = mount(ProductPagination, {
      props: {
        totalPages: 3,
        currentPage: 1
      }
    })

    console.log("wrapper",wrapper.text())
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
  })

  it('emits change-page event when clicked', async () => {
  const wrapper = mount(ProductPagination, {
    props: {
      totalPages: 3,
      currentPage: 1
    }
  })

  const buttons = wrapper.findAll('button')
  buttons.forEach((btn) => {
  console.log("button",btn.text())
})
  await buttons[1].trigger('click') // click page 2

  expect(wrapper.emitted('change-page')).toBeTruthy()
  expect(wrapper.emitted('change-page')[0]).toEqual([2])
})

})