<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: []
}>()

defineSlots<{
  default: () => any;
  header?: () => any;
  footer?: () => any;
}>();


</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        @click.self="$emit('close')"
        data-testid="modal-base"
      >
        <div
          class="bg-gray-800 text-black rounded-xl shadow-2xl w-[90%] max-w-md p-6"
        >
          <div class="flex justify-between items-center mb-4">
            <slot name="header" />
            <button
              class="text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>
          <div class="mb-4">
            <slot />
          </div>
          <div class="flex justify-end gap-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
