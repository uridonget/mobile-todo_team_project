import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import router from './router'


import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIH8zAiPnJdj3l63jT2wRsW7tFBFIdRAo",
  authDomain: "phase2-39e45.firebaseapp.com",
  projectId: "phase2-39e45",
  storageBucket: "phase2-39e45.appspot.com",
  messagingSenderId: "607080683233",
  appId: "1:607080683233:web:371d3957ad10c90e4a89a0"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
