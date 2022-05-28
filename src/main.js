import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import router from './route/router.js'
import './plugins/firebase'
import VueSplash from 'vue-splash'


Vue.config.productionTip = false
Vue.use(VueSplash);

new Vue({
  VueSplash,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
