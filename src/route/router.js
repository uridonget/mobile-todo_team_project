import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoLogin from '../components/TodoLogin.vue'
 import firstpage from '../components/firstpage.vue'
import calendar from '../components/calendar.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: TodoLogin },
        { path: '/hello', component: firstpage },
        // { path: '*', component: TodoLogin }
        {path: '/cal', component : calendar }
    ]
})

export default router