<script setup>
import { onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
import { useFetch } from '@/composables/useFetch';

onMounted(()=>{
    useFetch()
})

</script>


<template>
    <ProductCard/>
</template>