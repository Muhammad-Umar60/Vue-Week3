<script setup lang="ts">
import ProductList from '@/components/ProductList.vue';

</script>

<template>
    <header class="text-orange-600 p-6">
        
        <div class="bg-amber-600/15 ">
            <p>
                Fresh & Hot, Delivered Fast
            </p>
           <h1>
               <span class="text-white">
                   Whar are you
                </span>
                <br> 
                craving
                <span class="text-white">
                    today?
                </span>
           </h1>
            <input class="p-2 w-80 rounded-2xl border border-gray-500" type="text" placeholder="Search burgers, sushi, pasta...">
        </div>
    </header>
<main class="p-5">
    <div class="text-white flex justify-evenly">
        <button class="bg-orange-500 px-6 py-2 rounded-4xl">All</button>
        <button>Pizza</button>
        <button>Roll</button>
        <button>Sandwitch</button>
        <button>Tikka</button>
    </div>
    <div>
        <ProductList/>
    </div>
    <div></div>
</main>
</template>