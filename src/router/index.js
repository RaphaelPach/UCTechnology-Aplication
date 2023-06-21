import { createRouter, createWebHistory } from 'vue-router'
import EmployeeList from '../views/EmployeeList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EmployeeList
    },
  ]
})

export default router
