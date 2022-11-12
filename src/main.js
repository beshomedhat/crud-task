/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import jquery
import '@/plugins/jquery.js'

// import toast style
import "toastr/build/toastr.css";

// import bootstrap js & css
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// import bootstap icons
import "bootstrap-icons/font/bootstrap-icons.css"

// import fortawesome
import "@fortawesome/fontawesome-free/css/all.min.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
