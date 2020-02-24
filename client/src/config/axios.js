import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = ' http://192.168.1.93:3000/api/';