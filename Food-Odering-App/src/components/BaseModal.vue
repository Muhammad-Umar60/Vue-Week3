<script setup>

defineProps({ 
  modelValue: Boolean 
})
defineEmits([
  'update:modelValue'
  ])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        @click.self="$emit('update:modelValue', false)"
      >
        <div class="bg-white text-black rounded-xl shadow-2xl w-[90%] max-w-md p-6">

          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <slot name="header" />
            <button
              class="text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
              @click="$emit('update:modelValue', false)"
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
