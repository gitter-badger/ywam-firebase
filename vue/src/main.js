// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueFire from 'vuefire'
import firebase from 'firebase'

import App from './App'
import router from './router'

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.config.productionTip = false

// Initialize Firebase
firebase.database.enableLogging(false) // toggle on for debug (it's noisy)
firebase.initializeApp({
  apiKey: 'AIzaSyBSBD_FNaMQZyd3h0mcv0ZMUt9QXY2m3f4',
  authDomain: 'staffapp-95f17.firebaseapp.com',
  databaseURL: 'https://staffapp-95f17.firebaseio.com',
  projectId: 'staffapp-95f17',
  storageBucket: 'staffapp-95f17.appspot.com',
  messagingSenderId: '1068994477621'
})

firebase.database().ref('location_public').once('value', (snap) => { console.log(snap.val()) })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
