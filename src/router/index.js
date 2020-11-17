import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'
import Cats from '../views/Cats.vue'
import Cart from '../views/Cart.vue'
import My from '../views/My.vue'
import Product from '../views/Product.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/list',
    component:List
  },
    {
    path:'/product/:id',
    component:Product
  },
   {
    path:'/cart',
    component:Cart
  },
   {
    path:'/my',
    component:My
  },
  {
    path:'/cats',
    component:Cats
  },
  {
    path:'/reg',
    component:Reg
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
