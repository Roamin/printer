import Vue from 'vue'
import Router from 'vue-router'

import workspace from './workspace'
import setting from './setting'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('@/views'),
      redirect: '/workspace/view',
      children: [workspace, setting]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
