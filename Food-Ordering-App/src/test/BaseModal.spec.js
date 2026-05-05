import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Modal from '@/components/BaseModal.vue'

describe('Modal.vue', () => {
  it('renders modal when isOpen is true', () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      global: {
        stubs: {
          Teleport: true,
          Transition: false,
        },
      },
    })

    expect(wrapper.find('[data-testid="modal-base"]').exists()).toBe(true)
  })

  it('does not render modal when isOpen is false', () => {
    const wrapper = mount(Modal, {
      props: { isOpen: false },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    expect(wrapper.find('[data-testid="modal-base"]').exists()).toBe(false)
  })

  it('emits close when clicking outside (backdrop)', async () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })
    const backdrop = wrapper.find('[data-testid="modal-base"]')

    await backdrop.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')[0]).toEqual([false])
  })

  it('emits close when clicking close button', async () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    const button = wrapper.find('button')

    await button.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('renders header, default, and footer slots', () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      slots: {
        header: '<h1>Header</h1>',
        default: '<p>Body Content</p>',
        footer: '<button>Footer Btn</button>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Header')
    expect(wrapper.text()).toContain('Body Content')
    expect(wrapper.text()).toContain('Footer Btn')
  })
})
