<script setup>
import { onMounted, ref, watch } from 'vue';
import fetchUser from './services/api';
import debounce from './utils/debounce';
import closureCount from './utils/closure';
import { saveSearch,getSearch } from './utils/storage';

const search = ref("")
const users = ref([])
const status = ref("")

const counter = closureCount() 
const count = ref("")

const debouncedFetch = debounce(async(query)=>{
  
  if (!query) {
    users.value = []
    status.value=""
    return
  }

  try{
    status.value = "loading..."
    const result = await fetchUser(query)
    users.value = result
    count.value = counter()
    status.value = ""
    saveSearch(query)
    }
  catch(error){
    status.value = "Error fetching data"
    }
}, 500)

  watch(search, (newValue) => {
  debouncedFetch(newValue)
})

onMounted(()=>{
    search.value = getSearch()
})

</script>

<template>
  <div class="m-18">

    <h1 class="mb-6 font-bold text-4xl">Github User Search</h1>
    
    <input class="w-70 p-2 border" type="text" placeholder="Search GitHub users..." v-model="search">
  
    <p v-if="count > 0" class="pt-5">
      Search count: {{ count }}
    </p>
    <p>{{ status }}</p>
    <div class="pt-8 flex gap-3 items-center" v-for="user in users" :key="user">
      <img class="w-12" :src="user.avatar_url" alt=""> 
      <a class="text-blue-800 underline" :href="user.html_url"> {{ user.login }}</a>
    </div>
  </div>
</template>

<style scoped></style>
