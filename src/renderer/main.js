import Vue from 'vue'

import './styles/index.scss'

import router from './router'
import store from './store'

import fetch from '@/utils/fetch'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$fetch = fetch
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store,
  template: '<div id="root"><router-view/></div>'
})
