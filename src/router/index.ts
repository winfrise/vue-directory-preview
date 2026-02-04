import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AlbumList from '@/views/AlbumList.vue'
import Slideshow from '@/views/Slideshow.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/', redirect: '/albums' },
  {
    path: '/albums/:pathMatch(.*)*',
    name: 'AlbumList',
    component: AlbumList,
    meta: { requiresAuth: true },
    props: true // 将路由参数作为 props 传给组件
  },
  {
    path: '/slideshow/:id',
    name: 'Slideshow',
    component: Slideshow,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/albums')
  } else {
    next()
  }
})

export default router