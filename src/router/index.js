import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import OrderList from '../views/OrderList.vue'
import OrderNew from '../views/OrderNew.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderList
  },
  {
    path: '/order/new',
    name: 'new',
    component: OrderNew
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
