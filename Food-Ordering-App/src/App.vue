<script setup>
import Navbar from './components/AppNavbar.vue'
import { useFavoritesStore } from './stores/favorites';

const store = useFavoritesStore()
store.loadFavorites()

</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
