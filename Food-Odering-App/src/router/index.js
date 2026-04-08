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
      props:true,
       beforeEnter: async (to, from, next) => {
        const id = to.params.id

        try {
          const res = await fetch(`http://localhost:3000/products/${id}`)

          if (!res.ok) {
            return next('/') // redirect if invalid
          }

          next()
        } catch (err) {
          next('/')
        }
    }
  }


  ],
})

export default router
