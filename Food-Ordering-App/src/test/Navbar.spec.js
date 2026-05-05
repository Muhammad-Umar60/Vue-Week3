import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AppNavbar from '@/components/AppNavbar.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFavoritesStore } from '@/stores/favorites'
import { nextTick } from 'vue'


vi.mock('vue-router', () => ({
  RouterLink: {
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  },
}))

describe('AppNavbar - Unit', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(AppNavbar, {
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

  it('renders navbar title and links', () => {
    expect(wrapper.text()).toContain('CAFE GRILL')
    expect(wrapper.text()).toContain('Menu')
    expect(wrapper.text()).toContain('Favorites')
  })

  it('renders correct router links', () => {
    const links = wrapper.findAll('a')

    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/')
    expect(links[2].attributes('href')).toBe('/favorites')
  })

  it('does not show favorites count when empty', () => {
    store.items = []
    expect(wrapper.find('[data-testid="fav-count"]').exists()).toBe(false)
  })

  it('shows favorites count when items exist', async () => {
    store.items = [{ id: 1 }, { id: 2 }]

    await nextTick()
    expect(wrapper.text()).toContain('2')
  })

  it('updates favorites count reactively', async () => {
    store.items = [{ id: 1 }]
    await nextTick()
    expect(wrapper.text()).toContain('1')

    store.items.push({ id: 2 })
    await nextTick()
    expect(wrapper.text()).toContain('2')
  })
})