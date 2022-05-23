import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import first from '@/components/first'
import SignUp from '@/components/SignUp'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/hello',
    name: 'first',
    component: first
  },
  {path: '/signup',
  name: 'SignUp',
  component: SignUp},
  {path: '/idmake',
  name: 'SignUp',
  component: SignUp}]
})