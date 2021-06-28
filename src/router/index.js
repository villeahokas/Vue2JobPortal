import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddPosition from '../views/AddPosition.vue'
import AddApplicant from '../views/AddApplicant.vue'
import ApplicantToPos from '../views/ApplicantToPos.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addPosition',
    name: 'AddPosition',
    component: AddPosition
  },
  {
    path: '/addApplicant',
    name: 'AddApplicant',
    component: AddApplicant
  },
  {
    path: '/ApplicantToPos',
    name: 'ApplicantToPos',
    component: ApplicantToPos
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
