<script setup>
defineProps({
  isOpen: Boolean,
})
const emit = defineEmits([
  'close'
])

const closeModal = () => {
  emit('close', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        @click.self="closeModal"
      >
        <div class="bg-white text-black rounded-xl shadow-2xl w-[90%] max-w-md p-6">
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <slot name="header" />
            <button
              class="text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
              @click="closeModal"
            >
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="mb-4">
            <slot />
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
