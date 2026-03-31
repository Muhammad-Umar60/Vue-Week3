<script setup>
import { ref, watch } from 'vue';


const search = ref("")
console.log("serach",search,"btwn")
const users = ref([])
const counter = closureCount() 
const count = ref("")

function closureCount(){
  let count = 0
  function updateCount(){
    count ++
    return count
  }
  return updateCount
}

async function fetchUser(query) {
  
  const url = `https://api.github.com/search/users?q=${query}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("API Error");
  }
  console.log("delay")
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await response.json();
   console.log(data)
   console.log(data.items.slice(0,5))
  return data.items.slice(0, 5);
}
// fetchUser()

watch(search, async (newValue) => {
  if(!newValue){
    users.value = []
    return
  }

  const result = await fetchUser(newValue)
  users.value = result
  count.value = counter()
  // closureCount()
})


</script>

<template>
  <div class="m-18">

    <h1 class="mb-6 font-bold text-4xl">Github User Search</h1>
    
    <input class="w-70 p-2 border" type="text" placeholder="Search GitHub users..." v-model="search">
    
    <!-- <p>{{ counter() }}</p> -->
    <p>{{ count }}</p>
    
    <div class="pt-8 flex gap-3 items-center" v-for="user in users">
      
      <img class="w-12" :src="user.avatar_url" alt=""> 
      
      <a class="text-blue-800 underline" :href="user.html_url"> {{ user.login }}</a>
    
    </div>
  
  </div>
</template>

<style scoped></style>
