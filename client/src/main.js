import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './components/index.js'
import './config/axios'

import './style'



Vue.config.productionTip = false

import './plugins/bootstrapvue'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
