import App from "@/App.vue"
import AppNavbar from "@/components/AppNavbar.vue"
import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(AppNavbar)
    expect(wrapper.text()).toContain('Menu')
  })
})