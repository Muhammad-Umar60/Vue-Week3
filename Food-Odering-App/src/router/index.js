import FavoritesView from '@/views/FavoritesView.vue'
import HomeView from '@/views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "home",
      component: HomeView
    },
     {
      path: '/favorites',
      name: "favorites",
      component: FavoritesView
    },
     {
      path: '/food/:id',
      name: "foodDetail",
      component: ProductDetailView,
      props:true
    }


  ],
})

export default router
