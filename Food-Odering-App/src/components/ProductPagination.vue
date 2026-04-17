<script setup>
const emit = defineEmits(['change-page'])

defineProps({
    totalPages:Number,
    currentPage:Number
})
</script>

<template>
    <div class="text-white flex gap-2 justify-center">
    <button
        @click="emit('change-page',page)"
      :class="['py-3 px-5 rounded-4xl cursor-pointer',currentPage === page ? 'bg-orange-500' :'bg-black' ]"
      v-for="page in totalPages"
      :key="page"
    >
      {{ page }}
    </button>
  </div>
</template>