import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoLogin from '../components/TodoLogin.vue'
import firstpage from '../components/firstpage.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: TodoLogin },
        { path: '/Login', component: firstpage },
        { path: '/Logout', component: TodoLogin},        
        { path: '*', component: TodoLogin },

    ]
})

export default router