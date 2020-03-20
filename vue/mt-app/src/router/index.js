import Vue from 'vue'
import DefaultPage from '../layout/default.vue'
import Index from '../views/index.vue'
import ChangeCity from '../views/changeCity.vue'
import GoodList from '../views/goodList.vue'
import Login from "../views/login.vue"
import Register from "../views/register.vue"
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DefaultPage',
    component: DefaultPage,
    redirect:"/index",
    children:[{
      path: '/index',
      name: 'Index',
      component: Index,
    },{
      path:'/changecity',
      name:'changeCity',
      component:ChangeCity,
    },{
      path:'/goodList',
      name:'goodList',
      component:GoodList
    }]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },{
    path:'/register',
    name:'register',
    component:Register
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
