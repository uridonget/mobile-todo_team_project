import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import router from './route/router.js'
import './plugins/firebase'



Vue.config.productionTip = false

new Vue({
  
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
