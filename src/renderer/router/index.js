import Vue from 'vue'
import Router from 'vue-router'

import workspace from './workspace'
import setting from './setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views'),
      children: [
        {
          path: '',
          redirect: {
            name: 'workspace'
          }
        },
        workspace,
        setting
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
