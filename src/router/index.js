import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/try',
    name: 'TryIt',
    component: () => import('../views/TryIt.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
