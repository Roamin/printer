import Vue from 'vue'
import axios from 'axios'

import router from './router'
import store from './store'

import './styles/index.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store,
  template: '<div id="root"><router-view/></div>'
})
