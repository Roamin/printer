import Vue from 'vue'

import './styles/index.scss'

import router from './router'
import store from './store'

import ajax from '@/plugins/ajax'
import electron from '@/plugins/electron'
import fetch from '@/plugins/fetch'

Vue.use(ajax)
Vue.use(electron)
Vue.use(fetch)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h('main', [
    h('router-view')
  ])
}).$mount('#root')
