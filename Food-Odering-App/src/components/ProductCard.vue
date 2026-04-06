<script setup>

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
// console.log(product)

defineEmits(['order'])
</script>

<template>
  <div class="text-white">
    <div>
      <img class="w-100 h-100 object-fill" :src="product.image" :alt="product.name" />
    </div>
    <div>
      <div>{{ product.category }}</div>
      <div>
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <div>
          <p>{{ product.rating }} ⭐</p>
          <p>Rs. {{ product.price }}</p>
          <div class="flex gap-2">
            <button>❤️</button>
            <!-- ✅ meal → product -->
            <button class="bg-amber-500 cursor-pointer" @click="$emit('order', product)">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>