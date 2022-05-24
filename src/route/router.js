import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoLogin from '../components/TodoLogin.vue'
// import App from '../App.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: TodoLogin },
        // { path: '/todo', component: App },
        // { path: '*', component: TodoLogin }
    ]
})

export default router