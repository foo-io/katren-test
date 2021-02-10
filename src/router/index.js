import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../views/Weather.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/:city',
    props: { obj: null },
    component: Weather
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
