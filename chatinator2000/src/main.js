import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";
import store from './store'
const firebaseConfig = {
  apiKey: "AIzaSyCa3FoMv0oXxAesmWWd48nKq5TPc_ijxqg",
  authDomain: "makeabletestlasse.firebaseapp.com",
  projectId: "makeabletestlasse",
  storageBucket: "makeabletestlasse.appspot.com",
  messagingSenderId: "869313210952",
  appId: "1:869313210952:web:c97bb210d2194bf22f067d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
