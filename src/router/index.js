import { createRouter, createWebHistory } from 'vue-router'
import EmployeeList from '../views/EmployeeList.vue'
import AboutMe from '../views/AboutMe.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EmployeeList
    },
    {
      path: '/about',
      name: 'AboutMe',
      component: AboutMe
    }
  ]
})

export default router

