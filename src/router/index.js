import Vue from 'vue'
import Router from 'vue-router'

import App from 'App'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'App',
      component: App
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('@/Login.vue'),

    },
    {
      path: '/signup',
      name: 'SignUp',
      component: ()=> import('@/SignUp.vue')
    }
  ]
})