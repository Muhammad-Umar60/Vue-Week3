import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from "vue-router"

/* ✅ Lazy loaded views */
const HomeView = () => import("@/views/HomeView.vue")
const FavoritesView = () => import("@/views/FavoritesView.vue")
const ProductDetailView = () => import("@/views/ProductDetailView.vue")

/* ✅ Typed routes */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesView,
  },
  {
    path: "/food/:id",
    name: "foodDetail",
    component: ProductDetailView,

    /* ⚠️ route params are string by default */
    props: (route) => ({
      id: Number(route.params.id),
    }),

    beforeEnter: async (to, from, next) => {
      const id = to.params.id as string

      try {
        const res = await fetch(
          `http://localhost:3000/products/${id}`
        )

        if (!res.ok) {
          return next("/")
        }

        next()
      } catch {
        next("/")
      }
    },
  },
]

/* ✅ Router instance */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router