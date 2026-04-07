<script setup>
import { useFetch } from '@/composables/useFetch';
import { useRoute } from 'vue-router';


const route = useRoute()
const productId = route.params.id

const { data, loading, error } = useFetch(`http://localhost:3000/products/${productId}`)
console.log(loading.value)
if(!data.value){
    loading.value = true
}

</script>
<template>
    <div class="text-white p-4">
        <p class="cursor-pointer"><RouterLink to="/"><--- Back to Menu</RouterLink></p>
    </div>
    <p class="text-white" v-if="loading">Loading...</p>
    <div v-if="data" class="text-white flex justify-center gap-6">
        <img class="h-105" :src="data.image" alt="">

        <div class="flex flex-col gap-6">
            <div class="flex gap-3">
                <p>{{ data.category }}</p>
                <p>{{ data.rating}}</p>
            </div>
            <p>{{ data.name }}</p>
            <p class="text-gray-400">{{ data.description}}</p>
            <div class="flex ">
                <p>{{ data.price}}</p> 
                <button class="bg-orange-200 rounded-2xl ">Save to Favorites</button>
                <button class="bg-orange-400 rounded-2xl ">Order Now</button>

            </div>
        </div>
    </div>
</template>