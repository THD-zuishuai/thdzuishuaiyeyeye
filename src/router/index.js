import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Future from '../views/Future.vue'
import Mine from '../views/Mine.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/Future',
    component: Future
  },
   {
    path: '/Mine',
    component: Mine
  }
]

const router = createRouter({
  history: createWebHistory('/vueDemo/'),
  routes
})

export default router