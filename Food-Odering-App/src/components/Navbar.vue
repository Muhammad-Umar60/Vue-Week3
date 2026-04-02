<script>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="p-4 flex bg-black items-center justify-between px-5 ">
        <h1 class="text-4xl text-white">
            Cafe Grill
        </h1>  
        <div>
            <ul class="flex gap-4 text-gray-400 font-semibold">
                <RouterLink= to="/">
                    <li class="cursor-pointer bg-orange-500/30 rounded-4xl p-2  hover:text-orange-500">Menu</li>
                </RouterLink=>
                <RouterLink= to="/favorites">
                    <li class="cursor-pointer hover:text-orange-500">Favorites</li>
                </RouterLink=>
            </ul>
        </div>
    </nav>
</template>